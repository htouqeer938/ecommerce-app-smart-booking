import request from "supertest";
import app from "../server";

describe("Product API Tests", () => {
  let token: string;
  let productId: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "SecureAdminPass123"
    });

    token = res.body.token;
  });

  test("Should add a new product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        description: "This is a test product",
        price: 100,
        stockQuantity: 50,
        category: "Electronics"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    productId = res.body.id;
  });

  test("Should fetch all products", async () => {
    const res = await request(app).get("/api/products");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Should fetch a single product by ID", async () => {
    const res = await request(app).get(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Test Product");
  });
});
