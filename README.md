# E-Commerce Admin Dashboard

This project is an **Admin Dashboard** for managing orders in an e-commerce system. It is built using **Next.js (App Router)**, **MUI (Material-UI)**, and **Tailwind CSS**.

## Features

- 📦 **Order Management** – View all customer orders in a **collapsible table**.
- 🛒 **Product Details** – Each order displays the ordered products with **name, category, price, quantity, and total**.
- 👨‍💼 **Admin Guard** – Only admins can access this panel.
- 🔄 **API Integration** – Fetches real data from the database.

## Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Material-UI (MUI)**
- **Tailwind CSS**
- **REST API (for fetching orders)**

## Installation & Setup

### 1️⃣ Clone the Repository


git clone https://github.com/your-repo/ecommerce-admin.git
cd ecommerce-admin
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Run the Development Server
sh
Copy
Edit
npm run dev
The app will be available at http://localhost:3000.

Project Structure
bash
Copy
Edit
📂 frontend/
 ┣ 📂 src/
 ┃ ┣ 📂 app/
 ┃ ┃ ┣ 📂 admin/orders/  # Orders Page
 ┃ ┃ ┣ 📂 components/
 ┃ ┃ ┃ ┣ 🛡️ AdminGuard.tsx  # Protects routes for admins
 ┃ ┃ ┣ 📂 utils/
 ┃ ┃ ┃ ┣ 📜 fetchOrders.ts  # API call for fetching orders
 ┣ 📜 package.json
 ┣ 📜 README.md
API Routes
Method	Endpoint	Description
GET	/api/orders	Fetch all orders
Environment Variables
Create a .env.local file and add:

sh
Copy
Edit
DATABASE_URL=mongodb+srv://your-db-url
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
How to Use
Log in as Admin to access the dashboard.
View Orders in the collapsible table.
Expand an order to see its product details.

vbnet
Copy
Edit

This **README.md** file provides a **complete guide** to your project. Let me know if you need any m
