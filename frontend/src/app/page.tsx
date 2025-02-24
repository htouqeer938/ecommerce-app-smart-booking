"use client";
import ProductList from "@/components/ProductList";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-5xl font-bold text-blue-600">Welcome to Our Store</h1>
      <p className="text-lg text-gray-700 mt-4">
        Shop the best products online.
      </p>
      <ProductList />
    </div>
  );
}
