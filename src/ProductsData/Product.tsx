import ActionButtonsProducts from './ActionButtonsProducts.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../store/productsSlice.ts';

export default function Product({ product }) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state) => state.productsSlice.selectedProducts
  );

  const handleToggle = () => {
    dispatch(selectProduct(product.id));
  };

  return (
    <li className="grid grid-cols-[55px_250px_265px_230px_30px_150px] items-center py-8 px-6.5 hover:bg-gray-50 transition">
      <div className="flex justify-center">
        <input
          className=" w-6 h-6 cursor-pointer"
          type="checkbox"
          onChange={handleToggle}
          checked={selectedProducts.includes(product.id)}
        />
      </div>

      <div className="px-8 w-[250px] truncate">{product.title}</div>
      <div>{product.category}</div>
      <div>{product.price}</div>
      <div>{product.rating}</div>

      <div className="flex justify-end">
        <ActionButtonsProducts product={product} />
      </div>
    </li>
  );
}
