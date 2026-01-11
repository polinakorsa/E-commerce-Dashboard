import { useState, useEffect } from 'react';

export default function CreateEditProductsForm({
  product,
  onSave,
  onCancel,
  onCreate,
}) {
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (product.id) {
      setEditingProduct(product);
    } else {
      setEditingProduct({
        title: '',
        category: '',
        price: '',
        rating: '',
        availabilityStatus: '',
      });
    }
  }, [product]);

  const handleProductChange = (event) => {
    setEditingProduct((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitEditProductData = (event) => {
    event.preventDefault();

    if (product.id) {
      onSave(editingProduct);
    } else {
      onCreate(editingProduct);
    }
  };

  return (
    <div>
      <div className="p-10 md:p-16 flex flex-col justify-center">
        <form onSubmit={submitEditProductData} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editingProduct?.title}
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
              value={editingProduct?.category}
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
              value={editingProduct?.price}
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
              value={editingProduct?.rating}
              onChange={handleProductChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <input
              type="text"
              name="availabilityStatus"
              value={editingProduct?.availabilityStatus || ''}
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
