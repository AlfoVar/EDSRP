import React, { useEffect } from 'react';
import { useProducts } from '../context/ProductContext';

const ProductsPage = () => {
  const productsContext = useProducts();
  
  useEffect(() => {
    console.log(productsContext);
  }, [productsContext]);
  return (
    <div>
    { productsContext.map((product) => {
        return (
          <div key={product.idProduct}>
            <h2>{product.nameProduct}</h2>
            <p>{product.description}</p>
          </div>
        );
      })
    }
    </div>
    // <div>
    //   <h1>Products Page</h1>
    //   {/* Add your code here */}
    // </div>
  );
};

export default ProductsPage;

