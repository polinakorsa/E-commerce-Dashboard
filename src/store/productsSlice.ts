import { createSlice } from '@reduxjs/toolkit';

import {
  createProductThunk,
  editProductThunk,
  deleteProductThunk,
  deleteAllProductsThunk,
} from './thunkProducts';

const initialState = {
  dataProducts: [],
  activeProduct: null,
  loading: false,
  error: null,
  isModalOpen: false,
  selectedProducts: [],
};

export const productsSlice = createSlice({
  name: 'productsSliceName',
  initialState,
  reducers: {
    getProductsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    getProductsSuccess: (state, action) => {
      state.dataProducts = action.payload;
      state.loading = false;
    },

    getProductsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    toggleModalVisibilityProduct: (state) => {
      state.isModalOpen = !state.isModalOpen;
      state.loading = false;
    },

    setActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },

    selectProduct: (state, action) => {
      const id = action.payload;
      if (state.selectedProducts.includes(id)) {
        state.selectedProducts = state.selectedProducts.filter(
          (selectedId) => selectedId !== id
        );
      } else {
        state.selectedProducts = [...state.selectedProducts, id];
      }
    },

    selectAllProducts: (state) => {
      if (state.selectedProducts.length === state.dataProducts.length) {
        state.selectedProducts = [];
      } else {
        state.selectedProducts = state.dataProducts.map(
          (product) => product.id
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.dataProducts.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        state.dataProducts = state.dataProducts.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        state.loading = false;
      })
      .addCase(editProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.dataProducts = state.dataProducts.filter(
          (product) => product.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAllProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllProductsThunk.fulfilled, (state, action) => {
        const ids = action.payload;
        state.dataProducts = state.dataProducts.filter(
          (product) => !ids.includes(product.id)
        );
        state.selectedProducts = [];
        state.loading = false;
      })
      .addCase(deleteAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  getProductsLoading,
  getProductsSuccess,
  getProductsError,
  toggleModalVisibilityProduct,
  setActiveProduct,
  selectProduct,
  selectAllProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
