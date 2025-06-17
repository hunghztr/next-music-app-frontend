import NextAuth, {AuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {sendRequest} from "@/utils/fetchApi";
import {JWT} from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    // pages: {
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/verify-request', // (used for check email message)
    //     newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // },
    // Configure one or more authentication providers
    secret: process.env.NO_SECRET,
    providers: [
        CredentialsProvider({

            name: 'Hùng',

            credentials: {
                username: {label: "Username", type: "text", placeholder: "Email or Phone"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {

                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                    method: "POST",
                    body: {...credentials},
                });
                const user = await res.data;
                if (res && user) {
                    return user as any;
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        // ...add more providers here
    ],
    callbacks: {
        async jwt({token, user, account, trigger}) {
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
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.user = user.user;
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
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}