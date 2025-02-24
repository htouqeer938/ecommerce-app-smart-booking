# 🛒 E-commerce Admin Panel

## 🚀 Clone the Repository


git clone https://github.com/your-repo/ecommerce-admin.git
cd ecommerce-admin

#📦 Install Dependencies

npm install

#▶️ Run the Development Server
npm run dev
The app will be available at http://localhost:3000.

# 📂 Project Structure
## 📂 Project Structure

```plaintext
ecommerce-admin/
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   │   ├── .env
│   │   ├── package.json
│── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/orders/  # Orders Page
│   │   ├── components/
│   │   │   ├── AdminGuard.tsx  # Protects routes for admins
│   │   ├── utils/
│   │   │   ├── fetchOrders.ts  # API call for fetching orders
│   ├── package.json
│   ├── README.md
```


#📡 API Routes
Method	Endpoint	Description
GET	/api/orders	Fetch all orders

#🌍 Environment Variables
Create a .env.local file and add:

DATABASE_URL=mongodb+srv://your-db-url
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
🔧 How to Use
Log in as Admin to access the dashboard.
View Orders in the collapsible table.
Expand an order to see its product details.
