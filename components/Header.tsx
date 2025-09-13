"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <Link
          href={"/"}
          className="text-2xl"
        >
          {user?.firstName}
          {`'s`} Space
        </Link>
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs />

      <div className="">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default Header;
