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

  const isCreateNewProduct = (validation) => {
    setIsCreateProduct(validation);
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
      const editProductData = await productsContext.updateProduct(
        id,
        localFormData
      );
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

  const deleteProduct = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar el producto?")) {
      const deleteProductData = await productsContext.deleteProductData(id);
      if (deleteProductData) {
        console.log(deleteProductData);
      }
    }
  };

  useEffect(() => {
    setProducts(productsContext.products);
  }, [productsContext, newProduct, formData]);
  return (
    <div className="font-sans m-0 p-0">
      <div>
        <header className=" py-5 uppercase text-center font-bold text-4xl" >
          <h1 className="m-0">Productos</h1>
        </header>
        {isCreateProduct ? null : (
          <div className="flex justify-center outline-2">
            <button
              onClick={() => isCreateNewProduct(true)}
              className="p-2 bg-blue-500 text-white border-2 rounded cursor-pointer transition-colors duration-300 ease-in-out"
            >
              Crear nuevo Producto
            </button>
          </div>
        )}
        {isCreateProduct ? (
          <div className="p-2 mt-2">
            <FormProduct
              setDataProducts={setNewProduct}
              createNewProduct={createNewProduct}
              isCreateNewProduct={isCreateNewProduct}
            />
          </div>
        ) : null}
        <div className="p-5">
          <div className="flex flex-wrap justify-around">
            {products.map((product) => {
              const image = productImages[product.idProduct];
              const isIncome = incomeData[product._id];
              const isEdited = editedProducts[product._id];
              return (
                <div id={product._id} key={product._id}>
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
                    deleteProduct={deleteProduct}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
