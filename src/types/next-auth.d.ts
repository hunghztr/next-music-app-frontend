// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, {} from "next-auth"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {JWT} from "next-auth/jwt"

interface IUser{
    id: string;
    username: string;
    email: string;
    isVerify: boolean;
    avatar: string;
    type: string;
    role: string;
}
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string;
        accessExpir:number;
        refreshToken: string;
        user: IUser
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken: string;
        accessExpir: number;
        refreshToken: string;
        user: IUser;
    }
}

