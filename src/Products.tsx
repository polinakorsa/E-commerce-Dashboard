import { useEffect, useState } from 'react';
import TableHeaderProducts from './TableHeaderProducts.tsx';
import ActionButtonsProducts from './ActionButtonsProducts.tsx';
import CreateEditProductsForm from './CreateEditProductsForm.tsx';
import Sidebar from './Sidebar.tsx';
import { useNavigate } from 'react-router';

const columns = ['Title', 'Category', 'Price', 'Rating', 'Availability'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showCreateEdit, setShowCreateEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=25')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const handleDelete = async (productId) => {
    const res = await fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } else {
      console.log('error');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleSave = async (updatedProductData) => {
    const res = await fetch(
      `https://dummyjson.com/products/${updatedProductData.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProductData),
      }
    );
    if (res.ok) {
      const savedProduct = await res.json();

      setProducts((prev) =>
        prev.map((product) =>
          product.id === savedProduct.id ? savedProduct : product
        )
      );

      setEditProduct(null);
    } else {
      console.log('error');
    }
  };

  const handleCreateProduct = async (newProduct) => {
    const res = await fetch(
      `https://dummyjson.com/products/add/${newProduct}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      }
    );
    if (res.ok) {
      const addedProduct = await res.json();
      setProducts((prev) => [{ ...addedProduct }, ...prev]);
      setShowCreateEdit(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto my-12  bg-white rounded-xl">
      <Sidebar />

      {(editProduct || showCreateEdit) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <CreateEditProductsForm
              product={editProduct ?? {}}
              onSave={handleSave}
              onCreate={handleCreateProduct}
              onCancel={() => {
                setEditProduct(null);
                setShowCreateEdit(false);
              }}
            />
          </div>
        </div>
      )}

      <TableHeaderProducts
        columns={columns}
        onOpenForm={() => {
          setEditProduct(null);
          setShowCreateEdit(true);
        }}
      />

      <ul className="text-xl">
        {products.map((product) => (
          <li
            key={product.id}
            className="grid grid-cols-[55px_250px_265px_230px_240px_150px_50px] items-center py-8 px-6.5 hover:bg-gray-50 transition"
          >
            <div className="flex justify-center">
              <input className=" w-6 h-6 cursor-pointer" type="checkbox" />
            </div>

            <div className="px-8 w-[250px] truncate">{product.title}</div>
            <div>{product.category}</div>
            <div>{product.price}</div>
            <div>{product.rating}</div>
            <div>{product.availabilityStatus}</div>

            <div className="flex justify-end">
              <ActionButtonsProducts
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
