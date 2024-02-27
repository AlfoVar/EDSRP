import { set } from "mongoose";
import React, { useState } from "react";

const FormProduct = ({ setDataProducts, createNewProduct }) => {
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

  useState(() => {
  }, [formData, setDataProducts, createNewProduct]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5">
        <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-white-900">
              Nombre del Producto:
            </label>
            <input
              name="nameProduct"
              value={formData.nameProduct}
              onChange={handleChange}
              required={true}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white-900">
              Descripción:
            </label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required={true}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white-900">
              Id del Producto:
            </label>
            <input
              name="idProduct"
              value={formData.idProduct}
              onChange={handleChange}
              required={true}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white-900">
              Costo actual del Producto:
            </label>
            <input
              type="number"
              name="currentCost"
              value={formData.currentCost}
              onChange={handleChange}
              required={true}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white-900">
              Stock actual del producto:
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required={true}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <br />
          <button onClick={createNewProduct} type="submit">
            guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormProduct;
