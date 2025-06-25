"use client";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();

  const linkClass = (href: string) =>
    `text-[1.3vw] px-2 py-1 font-semibold border-b-2 transition-all duration-300
   ${
     path === href
       ? "text-blue-500 border-blue-500"
       : "text-white border-transparent hover:text-blue-300 hover:border-blue-300"
   }`;

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between shadow-lg">
      <div className="flex gap-6 items-center">
        <Link href="/admin" className={linkClass("/admin")}>
          Admin Dashboard
        </Link>
        <Link href="/admin/user" className={linkClass("/admin/user")}>
          Users
        </Link>
        <Link href="/admin/track" className={linkClass("/admin/track")}>
          Tracks
        </Link>
      </div>
      <Button variant="outlined" color="error" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
