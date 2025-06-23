import "./globals.css";
import { Metadata } from "next";
import Wrapper from "@/lib/Wrapper";
import LoadingWrapper from "@/lib/LoadingWrapper";
import { Suspense } from "react";

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
            <LoadingWrapper>{children}</LoadingWrapper>
          </Suspense>
        </Wrapper>
      </body>
    </html>
  );
}
