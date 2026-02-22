import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from './productsSlice.ts';
import type { RootState } from './store.ts';

type NewProduct = Omit<Product, 'id'>;

export const createProductThunk = createAsyncThunk<
  Product,
  NewProduct,
  { rejectValue: string }
>('products/createProduct', async (product, { rejectWithValue }) => {
  try {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    return await res.json();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown network error';
    return rejectWithValue(message);
  }
});

export const editProductThunk = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>('products/editProduct', async (product: Product, { rejectWithValue }) => {
  try {
    const res = await fetch(`'https://dummyjson.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    return await res.json();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown network error';
    return rejectWithValue(message);
  }
});

export const deleteProductThunk = createAsyncThunk<
  number,
  { id: number },
  { rejectValue: string }
>('products/deleteProduct', async ({ id }, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return data.id ?? id;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown network error';
    return rejectWithValue(message);
  }
});

export const deleteAllProductsThunk = createAsyncThunk<
  number[],
  number[],
  { rejectValue: string; state: RootState }
>(
  'products/deleteAllProduct',

  async (selectedProductsIds: number[], { rejectWithValue }) => {
    if (selectedProductsIds.length === 0) {
      return [];
    }

    try {
      await Promise.all(
        selectedProductsIds.map((id) =>
          fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
          }).then((res) => {
            return res.json();
          })
        )
      );
      return selectedProductsIds;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unknown network error';
      return rejectWithValue(message);
    }
  }
);
