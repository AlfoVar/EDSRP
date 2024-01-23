import Products from "../models/products.js"

export const getProducts = async (req, res) => {
    const products = await Products.find();
    console.log(req.user)
    res.json(products);
};

export const getProductById =  async (req, res) => {
    const product = await Products.findById(req.params.id);
    res.json(product);
};

export const addProduct =  async (req, res) => {
    const {title, description} = req.body;
    const product = new Products ({ title, description });
    await product.save();
    res.json({status:'Producto guardado'});
};

export const updateProductById =  async (req, res) => {
    const { title, description } = req.body;
    const productUpdate = { title, description };
    await Products.findByIdAndUpdate(req.params.id, productUpdate);
    res.json({status:'Producto Actualizado'});
};

export const deleteProduct =  async (req, res) => {
    await Products.findByIdAndDelete(req.params.id)
    res.json({status: 'Producto eliminado'})
};