import { set } from "mongoose";
import React, { useState } from "react";

const FormProduct = ({
  setDataProducts,
  createNewProduct,
  isCreateNewProduct,
}) => {
  const [formData, setFormData] = useState({
    nameProduct: "",
    description: "",
    idProduct: "",
    currentCost: "",
    stock: "",
  });

  const handleChange = (e) => {
    setDataProducts({ ...formData, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setDataProducts(formData);
    e.preventDefault();
  };

  useState(() => {}, [formData, setDataProducts, createNewProduct]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg p-5 border border-gray-300 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="flex items-center">
            <label className="font-bold flex-1">
              Nombre del Producto:
            </label>
            <input
              name="nameProduct"
              value={formData.nameProduct}
              onChange={handleChange}
              required={true}
              className="flex-2 p-2 border border-gray-300 rounded box-border"
            />
          </div>
          <div className="flex items-center">
            <label className="font-bold flex-1">
              Descripción:
            </label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required={true}
              className="flex-2 p-4 border border-gray-300 rounded box-border"
            />
          </div>
          <div className="flex items-center">
            <label className="font-bold flex-1">
              Id del Producto:
            </label>
            <input
              name="idProduct"
              value={formData.idProduct}
              onChange={handleChange}
              required={true}
              className="flex-2 p-2 border border-gray-300 rounded box-border"
            />
          </div>
          <div className="flex items-center">
            <label className="font-bold flex-1">
              Costo actual del Producto:
            </label>
            <input
              type="number"
              name="currentCost"
              value={formData.currentCost}
              onChange={handleChange}
              required={true}
              className="flex-2 p-2 border border-gray-300 rounded box-border"
            />
          </div>
          <div className="flex items-center">
            <label className="font-bold flex-1">
              Stock actual del producto:
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required={true}
              className="flex-2 p-2 border border-gray-300 rounded box-border"
            />
          </div>
          <br />
          <button onClick={createNewProduct} type="submit" className="w-full p-2 bg-blue-500 text-white border-none rounded cursor-pointer transition-colors duration-300 ease-in-out">
            guardar
          </button>
          <button onClick={() => isCreateNewProduct(false)} type="submit" className="w-full p-2 bg-blue-500 text-white border-none rounded cursor-pointer transition-colors duration-300 ease-in-out">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormProduct;
