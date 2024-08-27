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

const Header = () => {
  const { user } = useUser();
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
