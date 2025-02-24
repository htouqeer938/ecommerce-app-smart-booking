import request from "supertest";
import app from "../server";

describe("Order API Tests", () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123"
    });

    token = res.body.token;
  });

  test("Should checkout cart and create an order", async () => {
    const res = await request(app)
      .post("/api/orders/checkout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("orderId");
  });

  test("Should retrieve user's order history", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
