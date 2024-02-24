import Products from "../models/products.model.js";

export const getProducts = async (req, res) => {
  const products = await Products.find();
  console.log(req.user);
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Products.findById(req.params.id);
  res.json(product);
};

export const addProduct = async (req, res) => {
  console.log(req.body)
  const { nameProduct, idProduct, currentCost, description, stock } = req.body;
  const product = new Products({
    nameProduct,
    idProduct,
    currentCost,
    description,
    stock,
  });
  const resProduct = await product.save();
 const productId = resProduct._id;
  res.json({ resProduct, productId });
};

export const updateProductById = async (req, res) => {
  const { nameProduct, idProduct, currentCost, description, stock } = req.body;
  const productUpdate = {
    nameProduct,
    idProduct,
    currentCost,
    description,
    stock,
  };
  await Products.findByIdAndUpdate(req.params.id, productUpdate);
  res.json({ status: "Producto Actualizado" });
};

export const deleteProduct = async (req, res) => {
  await Products.findByIdAndDelete(req.params.id);
  res.json({ status: "Producto eliminado" });
};
