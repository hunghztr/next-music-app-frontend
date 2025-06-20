import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {sendRequest} from "@/utils/fetchApi";
import {JWT} from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import {IUser} from "@/types/next-auth";
 const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Hùng',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Email or Phone"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                    method: "POST",
                    body: {...credentials},
                });
                if (res && res.data) {
                    return res.data as any;
                }
                return null
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({token, user, account, trigger}) {
            const getUser = user as any as {
                accessToken: string;
                refreshToken: string;
                user: IUser;
            }
            if (trigger === 'signIn' && account?.provider !== 'credentials') {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social-media`,
                    method: "POST",
                    body: {type: account?.provider.toLocaleUpperCase(), username: token.email},
                });
                if (res.data) {
                    token.accessToken = res.data.accessToken;
                    token.refreshToken = res.data.refreshToken;
                    token.user = res.data.user;
                }
            }
            if (trigger === 'signIn' && account?.provider === 'credentials') {
                token.accessToken = getUser.accessToken;
                token.refreshToken = getUser.refreshToken;
                token.user = getUser.user;
            }
            return token
        },
        async session({session, token}) {
            if (token) {
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                session.user = token.user;
            }
            return session
        },
    }
}
export default authOptions