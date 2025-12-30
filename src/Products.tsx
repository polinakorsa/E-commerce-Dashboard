import { useEffect, useState } from 'react';
import TableHeader from './TableHeader.tsx';
import ActionButtons from './ActionButtons.tsx';
import CreateEditProductsForm from './CreateEditProductsForm.tsx';


const columns = ['Title', 'Category', 'Price', 'Rating', 'Availability'];

export default function Products() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
            });
    }, []);

    const handleDelete = async (productId) => {
        const res = await fetch (`https://dummyjson.com/products/${productId}`, {
            method: 'DELETE',
        })

        if (res.status === 200) {
            setProducts(prev => prev.filter(product => product.id !== productId));
        } else {
            console.log("error")
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
    };

    const handleSave = (updatedProductData) => {
        setProducts((prev) =>
            prev.map((product) => {
                if(updatedProductData) {
                product.id === updatedProductData.id
            } else {
                product
            }
            })
        );
        setEditProduct(null);
    };

    const handleCancel = () => {
        setEditProduct(null);
    };

    return (
        <div className='bg-stone-50 absolute left-80 top-40 w-[1420px] h-[2180px] rounded-xl'>
            {editProduct ? (
                <CreateEditProductsForm
                    product={editProduct}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <>
            <TableHeader columns={columns} />

            <ul className='relative top-30 space-y-10 text-xl'>
                {products.map((product) => (
                    <li key={product.id}>
                        <input className='absolute left-10 w-6 h-6 cursor-pointer' type='checkbox' />

                            <>
                        <span className='absolute left-30 w-50'>{product.title}</span>
                        <span className='absolute left-63 w-100'>{product.category}</span>
                        <span className='absolute left-169'>{product.price}</span>
                        <span className='absolute left-228'>{product.rating}</span>
                        <span className='absolute left-284'>
              {product.availabilityStatus}
            </span>

                        <ActionButtons
                            item={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}

                        />
                            </>

                    </li>
                ))}
            </ul>
    </>
)}
        </div>
    );
}
