"use client";
import "./globals.css";
import {SessionProvider} from "next-auth/react";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import {TrackProvier} from "@/lib/TrackContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <TrackProvier>
            <SessionProvider>
                <ThemeRegistry>
                    <Header/>
                    {children}
                    <Footer/>
                </ThemeRegistry>
            </SessionProvider>
        </TrackProvier>
        </body>
        </html>
    );
}
