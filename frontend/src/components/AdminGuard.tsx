"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth()!;
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user]);

  return <>{user?.role === "admin" ? children : null}</>;
}
