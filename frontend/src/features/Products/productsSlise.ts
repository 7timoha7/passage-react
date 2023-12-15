import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types';
import { RootState } from '../../app/store';
import { productFetch, productsFetch, productsFromApi } from './productsThunks';

interface ProductsState {
  products: ProductType[];
  product: ProductType | null;
  productsFromApi: ProductType[];
  productsLoading: boolean;
  productLoading: boolean;
  productBasket: boolean;
  error: boolean;
}

const initialState: ProductsState = {
  products: [],
  product: null,
  productsFromApi: [],
  productsLoading: false,
  productLoading: false,
  productBasket: false,
  error: false,
};

export const productsSLice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductBasket: (state) => {
      state.productBasket = !state.productBasket;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(productsFetch.fulfilled, (state, action) => {
      state.products = action.payload;
      state.productsLoading = false;
    });
    builder.addCase(productsFetch.rejected, (state) => {
      state.productsLoading = false;
      state.error = true;
    });

    builder.addCase(productFetch.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.product = action.payload;
      state.productLoading = false;
    });
    builder.addCase(productFetch.rejected, (state) => {
      state.productLoading = false;
      state.error = true;
    });

    builder.addCase(productsFromApi.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(productsFromApi.fulfilled, (state, action) => {
      state.productsFromApi = action.payload;
      state.productsLoading = false;
    });
    builder.addCase(productsFromApi.rejected, (state) => {
      state.productsLoading = false;
      state.error = true;
    });
  },
});

export const productsReducer = productsSLice.reducer;

export const { setProductBasket } = productsSLice.actions;

export const selectProductsState = (state: RootState) => state.products.products;
export const selectProductOne = (state: RootState) => state.products.product;
export const selectProductBasket = (state: RootState) => state.products.productBasket;
export const selectProductsFromApi = (state: RootState) => state.products.productsFromApi;

export const selectProductsLoading = (state: RootState) => state.products.productsLoading;
export const selectProductLoading = (state: RootState) => state.products.productLoading;
