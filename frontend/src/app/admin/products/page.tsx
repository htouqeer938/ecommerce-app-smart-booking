"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { fetchProducts, deleteProduct } from "@/app/api/products";
import AdminGuard from "@/components/AdminGuard";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@mui/material";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data.body.products);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <AdminGuard>
      <Container>
        <Typography variant="h4" gutterBottom>
          Product Management
        </Typography>
        <Link href="/admin/products/new">
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            Add New Product
          </Button>
        </Link>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </AdminGuard>
  );
}
