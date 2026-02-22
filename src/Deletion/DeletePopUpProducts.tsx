import { useAppDispatch } from '../store/store';
import { deleteProductThunk } from '../store/thunkProducts.ts';
import type { Product } from '../store/productsSlice.ts';

interface DeletionProductsProps {
  onCancel: () => void;
  product: Product;
}

export default function DeletePopUpProducts({
  onCancel,
  product,
}: DeletionProductsProps) {
  const dispatch = useAppDispatch();

  const handleProductDeleteById = () => {
    dispatch(deleteProductThunk(product));
    onCancel();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-black/90 flex items-center justify-center z-50">
        <div className="w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-10 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Delete Item?</h1>
              <p className="text-gray-600 mt-4">
                Are you sure you want to permanently delete this?
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onCancel}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl shadow-md transition transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleProductDeleteById}
                className="px-8 py-3 bg-indigo-500 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
