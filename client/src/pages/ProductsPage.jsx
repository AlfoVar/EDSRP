import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import Card from "../components/cards.jsx";
import FormProduct from "../components/formProduct.component.jsx";

const ProductsPage = () => {
  const productsContext = useProducts();

  const [isCreateProduct, setIsCreateProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [formData, setFormData] = useState({
    currentCost: "",
    stock: "",
  });
  const [isEdited, setIsEdited] = useState(false);

  console.log("render ProductsPage")

  const isCreateNewProduct = () => {
    setIsCreateProduct(true);
  };

  const createNewProduct = async () => {
    const newProductCreated = await productsContext.addProduct(newProduct);
    if (newProductCreated) {
      console.log(newProductCreated);
      setIsCreateProduct(false);
    }
  };

  const editProduct = async (id) => {
    const editProductData = await productsContext.updateProduct(id, formData);
    if (editProductData) {
      setIsEdited(false);
      console.log(editProductData);
    }
  };

  useEffect(() => {
  }, [productsContext, newProduct, formData]);
  return (
    <div>
      <div>
        <h1>Products</h1>
        <button onClick={isCreateNewProduct}>Crear nuevo Producto</button>
        <div />
        {isCreateProduct ? (
          <FormProduct
            setDataProducts={setNewProduct}
            createNewProduct={createNewProduct}
          />
        ) : null}
      </div>
      {productsContext.products.map((product) => {
        return (
          <div className="p-5">
            <Card
              key={product.id}
              id={product._id}
              nameProduct={product.nameProduct}
              desciption={product.description}
              price={product.currentCost}
              formData={formData}
              setFormData={setFormData}
              stock={product.stock}
              editProduct={editProduct}
              setProducts={productsContext}
              isEdited={isEdited}
              setIsEdited={setIsEdited}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
