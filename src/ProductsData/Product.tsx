import ActionButtonsProducts from './ActionButtonsProducts.tsx';
import ProductCheckbox from '../Checkboxes/ProductCheckbox.tsx';

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

export default function Product({ product }: ProductCheckboxProps) {
  return (
    <li className="grid grid-cols-[55px_250px_265px_230px_30px_150px] items-center py-8 px-6.5 hover:bg-gray-50 transition">
      <div className="flex justify-center">
        <ProductCheckbox product={product} />
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
