import { createAsyncThunk } from '@reduxjs/toolkit';

export const createProductThunk = createAsyncThunk(
  'products/createProduct',
  async (product, { rejectWithValue }) => {
    try {
      const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProductThunk = createAsyncThunk(
  'products/editProduct',
  async (product, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const updatedProduct = await res.json();
      return { ...product, ...updatedProduct };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (product, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${product.id}`, {
        method: 'DELETE',
      });

      const deletedProduct = await res.json();
      return deletedProduct.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAllProductsThunk = createAsyncThunk(
  'products/deleteAllProduct',
  async (_, { getState, rejectWithValue }) => {
    const { selectedProducts } = getState().productsSlice;

    if (selectedProducts.length === 0) {
      return [];
    }

    try {
      await Promise.all(
        selectedProducts.map((id) =>
          fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
          })
        )
      );
      return selectedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
