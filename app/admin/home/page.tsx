"use server";

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const adminHome = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <UserButton showName />
    </div>
  );
};

export default adminHome;
