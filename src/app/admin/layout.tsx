import Header from "@/components/admin/header/Header";
import "../globals.css";
import Wrapper from "@/lib/Wrapper";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          <Header />
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
