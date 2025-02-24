"use client";

import AdminGuard from "@/components/AdminGuard";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <Container>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Link href="/admin/products">
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
              Products
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
              Orders
            </Button>
          </Link>
        </Box>
      </Container>
    </AdminGuard>
  );
}
