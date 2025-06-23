import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function UserLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <>
        <Header/>
        {children}
        <Footer/>
        </>

    );
}