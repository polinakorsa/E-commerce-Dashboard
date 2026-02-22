import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../store/productsSlice.ts';
import type { RootState } from '../store/store.tsx';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
}

interface ProductCheckboxProps {
  product: Product;
}

export default function ProductCheckbox({ product }: ProductCheckboxProps) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state: RootState) => state.productsSlice.selectedProducts
  );

  const handleToggle = () => {
    dispatch(selectProduct(product.id));
  };

  return (
    <input
      className=" w-6 h-6 cursor-pointer"
      type="checkbox"
      onChange={handleToggle}
      checked={selectedProducts.includes(product.id)}
    />
  );
}
