import { useEffect } from 'react';
import TableHeaderProducts from './TableHeaderProducts.tsx';
import CreateEditProductsForm from './CreateEditProductsForm.tsx';
import Sidebar from '../Layout/Sidebar.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsError,
  getProductsLoading,
  getProductsSuccess,
} from '../store/productsSlice.ts';

import Loading from '../Loading/Loading.tsx';
import Product from './Product.tsx';

const columns = ['Title', 'Category', 'Price', 'Rating'];

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsSlice.dataProducts);
  const loading = useSelector((state) => state.productsSlice.loading);
  const error = useSelector((state) => state.productsSlice.error);
  const isModalOpen = useSelector((state) => state.productsSlice.isModalOpen);

  useEffect(() => {
    const getProducts = async () => {
      dispatch(getProductsLoading());
      try {
        const res = await fetch('https://dummyjson.com/products?limit=25');
        const dataProducts = await res.json();
        dispatch(getProductsSuccess(dataProducts.products));
      } catch (error) {
        dispatch(getProductsError(error));
      }
    };
    getProducts();
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto my-12  bg-white rounded-xl">
      {error && <p>Failed to load products</p>}
      <Sidebar />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <CreateEditProductsForm />
          </div>
        </div>
      )}

      <TableHeaderProducts columns={columns} />

      <ul className="text-xl">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
        <div className="flex items-center justify-center">
          {loading && <Loading />}
        </div>
      </ul>
    </div>
  );
}
