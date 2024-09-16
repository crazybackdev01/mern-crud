import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    const response = await fetch("/api/v1/products/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }
    set((state) => ({
      products: [...state.products, data.product],
    }));
    return { success: true, message: "Product created successfully" };
  },
  getProducts: async () => {
    console.log("getting products...");
    const response = await fetch("/api/v1/products");
    const data = await response.json();
    console.log(data);
    // data.products database me already existing products ki array hogiii........
    set({ products: data.products });
    return {
      success: true,
      products: data.products,
    };
  },
  getProduct: async (id) => {
    const response = await fetch(`/api/v1/products/${id}`);
    const data = await response.json();
    // set((state) => ({
    //   products: [...state.products, data.products],
    // }));
    set((state) => ({
      products: [...state.products, data.product],
    }));
    return {
      success: true,
      product: data.product,
    };
  },
  updateProduct: async (id, product) => {
    const response = await fetch(`/api/v1/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.product : product
      ),
    }));
    return {
      success: true,
      message: data.message,
      product: data.product,
    };
  },
  deleteProduct: async (id) => {
    const response = await fetch(`/api/v1/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    // update the ui immediately, without needing a refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return {
      success: true,
      product: data.product,
      message: data.message,
    };
  },
}));
