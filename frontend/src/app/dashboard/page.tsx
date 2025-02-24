"use client";
import { useAuth } from "@/context/AuthContext";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuth()!;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <Container>
      <Typography variant="h4">Welcome, {user?.name}</Typography>
    </Container>
  );
}
