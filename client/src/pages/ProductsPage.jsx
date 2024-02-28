import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import Card from "../components/cards.jsx";
import FormProduct from "../components/formProduct.component.jsx";
import M2T from "../images/M2T.jpg";
import GAS from "../images/GAS.jpeg";
import E2TP from "../images/E2TP.jpg";
import { set } from "mongoose";

const ProductsPage = () => {
  const productsContext = useProducts();

  const [isCreateProduct, setIsCreateProduct] = useState(false);
  const [products, setProducts] = useState([{}]);
  const [newProduct, setNewProduct] = useState({});
  const [formData, setFormData] = useState({
    currentCost: "",
    stock: "",
  });
  const [localFormData, setLocalFormData] = useState(formData);
  const [isEdited, setIsEdited] = useState(false);
  const [editedProducts, setEditedProducts] = useState({});
  const [incomeData, setIncomeData] = useState({});

  const productImages = {
    GAS: GAS,
    M2T: M2T,
    E2TP: E2TP,
    // Añade más productos e imágenes aquí
  };

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

  const isIncomeProduct = (id, condition) => {
    setIncomeData({
      ...incomeData,
      [id]: condition,
    });
  };

  const isEditProduct = async (id, condition, stock, price, type) => {
    if (type === "income") {
      isIncomeProduct(id, condition);
    }
    setEditedProducts({
      ...editedProducts,
      [id]: condition,
    });
    setFormData({
      ...formData,
      currentCost: price,
      stock: stock,
    });
  };

  const editProduct = async (id, isIncome) => {
    if (isIncome) {
      const editProductData = await productsContext.updateProduct(id, localFormData);
      if (editProductData) {
        isEditProduct(id, false);
      }
    } else {
      const editProductData = await productsContext.updateProduct(id, formData);
      if (editProductData) {
        isEditProduct(id, false);
      }
    }
  };

  useEffect(() => {
    setProducts(productsContext.products);
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
      {products.map((product) => {
        const image = productImages[product.idProduct];
        const isIncome = incomeData[product._id];
        const isEdited = editedProducts[product._id];
        return (
          <div id={product._id} className="p-5 inline-block">
            <Card
              key={product.id}
              image={image}
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
              isEditProduct={isEditProduct}
              isIncome={isIncome}
              isIncomeProduct={isIncomeProduct}
              localFormData={localFormData}
              setLocalFormData={setLocalFormData}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
