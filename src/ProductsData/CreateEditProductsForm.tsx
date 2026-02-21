import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveProduct,
  toggleModalVisibilityProduct,
} from '../store/productsSlice.ts';
import {
  createProductThunk,
  editProductThunk,
} from '../store/thunkProducts.ts';

export default function CreateEditProductsForm() {
  const dispatch = useDispatch();
  const activeProduct = useSelector(
    (state) => state.productsSlice.activeProduct
  );
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (activeProduct) {
      setProduct(activeProduct);
    } else {
      setProduct({
        title: '',
        category: '',
        price: 0,
        rating: 0,
      });
    }
  }, [dispatch, activeProduct]);

  const handleCreateProduct = () => {
    dispatch(createProductThunk(product));
  };

  const handleEditProduct = () => {
    dispatch(editProductThunk(product));
  };

  const handleProductChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.name === 'price' || event.target.name === 'rating'
          ? Number(event.target.value)
          : event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (product.id) {
      handleEditProduct();
    } else {
      handleCreateProduct();
    }
    onCancel();
  };

  const onCancel = () => {
    dispatch(toggleModalVisibilityProduct());
    dispatch(setActiveProduct(null));
  };

  return (
    <div>
      <div className="p-10 md:p-16 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={product?.title}
              onChange={handleProductChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product?.category}
              onChange={handleProductChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product?.price}
              onChange={handleProductChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={product?.rating}
              onChange={handleProductChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-4 bg-purple-600 hover:bg-purple-700
                                       text-white font-semibold rounded-xl shadow-md
                                       transition transform hover:scale-105"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 border border-gray-300
                                       text-gray-700 font-semibold rounded-xl
                                       hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
