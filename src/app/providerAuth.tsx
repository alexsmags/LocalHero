'use client'
import {SessionProvider} from "next-auth/react"

export const Authprovider = ({children} : {children: React.ReactNode}) => {
    return <SessionProvider>{children}</SessionProvider>
}