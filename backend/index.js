import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import path from "path";
// import cors from "cors";
dotenv.config();

const app = express();
connectDB(process.env.MONGODB_URI);
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());

// API Routes
app.use("/api/v1/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT}`);
});
