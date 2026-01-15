import DeletePopUpProducts from '../Deletion/DeletePopUpProducts.tsx';
import EditProductButton from '../assets/EditProductButton.tsx';
import DeleteProductButton from '../assets/DeleteProductButton.tsx';
import {
  setActiveProduct,
  toggleModalVisibilityProduct,
} from '../store/actions.ts';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ActionButtonsProducts({ product }) {
  const [showDeletePopUpProducts, setShowDeletePopUpProducts] = useState(false);
  const dispatch = useDispatch();

  const openDeletePopUpProducts = () => {
    dispatch(setActiveProduct(product));
    setShowDeletePopUpProducts(true);
  };

  const closeDeletePopUpProducts = () => {
    dispatch(setActiveProduct(null));
    setShowDeletePopUpProducts(false);
  };

  const handleModalOpen = () => {
    dispatch(setActiveProduct(product));
    dispatch(toggleModalVisibilityProduct());
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleModalOpen}
        className="rounded-md hover:bg-indigo-100 transition"
      >
        <EditProductButton />
      </button>

      <button
        onClick={openDeletePopUpProducts}
        className=" rounded-md hover:bg-red-100 transition"
      >
        <DeleteProductButton />
      </button>

      {showDeletePopUpProducts && (
        <DeletePopUpProducts onCancel={closeDeletePopUpProducts} />
      )}
    </div>
  );
}
