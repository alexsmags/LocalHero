import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../../app/model/user"


export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", placeholder: "Enter Email"},
                password: {label: "Password", placeholder: "Password"},
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };
                    try {
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null; 
                    }

                    if (password != user.password) {
                        return null;
                    }

                    return user;
                    } catch (error) {
                    console.log("Error: ", error);
                    return null;
                    }

            },
        }),
    ],
    callbacks:{
        async jwt({token, user, session, trigger}){

            if (trigger === "update") {
                token.name = session.name;
                token.email = session.email;
                token.location = session.location;
                token.role = session.role;
            }

            if (user){

                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    location: user.location,
                    role: user.role,
                };
            }
            
            return token;
        },
        async session({session, token, user}) {
            console.log("session callback", {session, token})
            return {
                ...session,
                user: {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    location: token.location,
                    role: token.role,
                }
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    }
};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}