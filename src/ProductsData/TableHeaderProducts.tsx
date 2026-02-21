import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllProducts,
  toggleModalVisibilityProduct,
} from '../store/productsSlice.ts';
import { deleteAllProductsThunk } from '../store/thunkProducts.ts';

export default function TableHeaderProducts({ columns }) {
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    dispatch(toggleModalVisibilityProduct());
  };

  const products = useSelector((state) => state.productsSlice.dataProducts);
  const selectedProducts = useSelector(
    (state) => state.productsSlice.selectedProducts
  );

  const bulkDelete = () => {
    dispatch(deleteAllProductsThunk(selectedProducts));
  };

  const handleSelectAll = () => {
    dispatch(selectAllProducts());
  };

  return (
    <div className="bg-gray-100 rounded-t-xl border-b border-gray-600 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-11 px-3.5">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-7 h-7 accent-indigo-600 rounded cursor-pointer focus:ring-indigo-500"
            id="select-all"
            onChange={handleSelectAll}
            checked={
              selectedProducts.length === products.length && products.length > 1
            }
          />
        </div>

        <div className="flex gap-45 items-center text-xl text-gray-700 font-semibold">
          {columns.map((column, index) => (
            <span key={index}>{column}</span>
          ))}
        </div>
        <div>
          {selectedProducts.length > 1 && (
            <button
              onClick={bulkDelete}
              className="absolute right-95 top-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-600  text-white font-medium text-2xl rounded-xl transition transform hover:scale-105 shadow-md"
            >
              Delete selected
            </button>
          )}
        </div>
        <button
          onClick={handleModalOpen}
          className="absolute right-50 top-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-600  text-white font-medium text-2xl rounded-xl transition transform hover:scale-105 shadow-md"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
