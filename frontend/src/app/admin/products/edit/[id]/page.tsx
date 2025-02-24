"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchProducts, updateProduct } from "@/app/api/products";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await fetchProducts();
    const foundProduct = data.body.products.find((p: any) => p.id === id);
    setProduct(foundProduct);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(id as string, product as any);
    router.push("/admin/products");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          fullWidth
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          fullWidth
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          margin="normal"
          required
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          label="Category"
          fullWidth
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          margin="normal"
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Update Product
        </Button>
      </form>
    </Container>
  );
}
