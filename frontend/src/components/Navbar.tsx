"use client";
import { useAuth } from "@/context/AuthContext";
import { ArrowBack } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { user, logout } = useAuth()!;
  const router = useRouter();

  return (
    <Toolbar>
      <Typography
        variant="h6"
        sx={{ flexGrow: 1, display: "flex", gap: 2, alignItems: "center" }}
      >
        <ArrowBack onClick={() => router.back()} sx={{ cursor: "pointer" }} />
        <Link href="/">MyShop</Link>
      </Typography>
      {user?.role === "admin" ? (
        <Link href="/admin/dashboard">
          <Button color="inherit">Admin Panel</Button>
        </Link>
      ) : (
        <>
          <Button color="inherit">
            <Link href="/products">Products</Link>
          </Button>
          <Button color="inherit">
            <Link href="/orders">Orders</Link>
          </Button>
          <Button color="inherit">
            <Link href="/cart">
              <ShoppingCartIcon /> ({cartCount})
            </Link>
          </Button>
        </>
      )}
      {user ? (
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      ) : (
        <>
          <Link href="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link href="/register">
            <Button color="inherit">Register</Button>
          </Link>
        </>
      )}
    </Toolbar>
  );
}
