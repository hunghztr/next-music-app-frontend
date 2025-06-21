import "./globals.css";
import {Metadata} from "next";
import Wrapper from "@/lib/Wrapper";
import LoadingWrapper from "@/lib/LoadingWrapper";

export const metadata: Metadata = {
    title: 'Sound Cloud',
    description: 'Trang chủ',
}

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Wrapper>
            <LoadingWrapper>
            {children}
            </LoadingWrapper>
        </Wrapper>
        </body>
        </html>
    );
}
