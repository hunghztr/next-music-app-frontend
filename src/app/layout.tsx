import "./globals.css";
import {Metadata} from "next";
import Wrapper from "@/lib/Wrapper";

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
            {children}
        </Wrapper>
        </body>
        </html>
    );
}
