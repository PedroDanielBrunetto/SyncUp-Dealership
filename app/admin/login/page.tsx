"use client";

import { SignIn } from "@clerk/nextjs";

const adminLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <form className="flex flex-col">
        <SignIn routing="hash" afterSignInUrl="/admin/home" />
      </form>
    </div>
  );
};

export default adminLogin;
