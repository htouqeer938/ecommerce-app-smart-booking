"use client";

import { useState } from "react";
import { addProduct } from "@/app/api/products";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({
      name,
      description,
      price: Number(price),
      category,
      image,
      stock
    });
    router.push("/admin/products");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Stock"
          fullWidth
          value={stock}
          type="number"
          onChange={(e) => setStock(Number(e.target.value))}
          margin="normal"
          required
        />
        <TextField
          label="Image URL"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          margin="normal"
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Save Product
        </Button>
      </form>
    </Container>
  );
}
