import { Metadata } from "next";
import Wrapper from "@/lib/Wrapper";
import { Suspense } from "react";
import "../globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
export const metadata: Metadata = {
  title: "Sonix",
  description: "Trang chủ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Suspense fallback={null}>
            <Header />
            {children}
            <Footer />
          </Suspense>
        </Wrapper>
      </body>
    </html>
  );
}
