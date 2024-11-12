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
            async authorize(credentials, req) {
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
                    }

            },
        }),
    ],
    callbacks:{
        jwt(params: any){
            if(params.user?.role){
                params.token.role = params.user.role;
                params.token.id = params.user.id;
            }

            return params.token;

        },
        session({session, token}) {

            if (session.user){
                (session.user as {id: string}).id = token.id as string;
                (session.user as {role: string}).role = token.role as string;
            }

            return session

        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    }
};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}