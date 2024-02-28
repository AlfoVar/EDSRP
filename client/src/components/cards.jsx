import React, { createContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ActionAreaCard = ({
  image,
  id,
  nameProduct,
  desciption,
  price,
  stock,
  formData,
  setFormData,
  editProduct,
  isEdited,
  isEditProduct,
  isIncome,
  isIncomeProduct,
  localFormData,
  setLocalFormData,
}) => {
  const productImage = image;

  const [stockProduct, setStockProduct] = useState(0);
  const [editedProducts, setEditedProducts] = useState(0);
  const [isIncomeValidate, setIsIncomeValidate] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setLocalFormData({
      ...localFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    const stockProduct = parseFloat(stock);
    const stockEdit = parseFloat(e.target.value);
    setStockProduct(stockEdit + stockProduct);
    setLocalFormData({
      ...localFormData,
      currentCost: price,
      stock: stockProduct + stockEdit,
    });
    setEditedProducts(e.target.value);
    setIsIncomeValidate(true);
  }

  console.log(isIncomeValidate, "isIncomeValidate");
  useEffect(() => {
    setStockProduct(stock);

    // setFormData({
    //   ...formData,
    //   stock: stockProduct,
    //   currentCost: price,
    // });
  }, [nameProduct, formData, price, stock]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ height: 140, width: 368 }}
          image={productImage}
          alt={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nameProduct}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1.5 }}
            color="text.secondary"
            className="h-8"
          >
            {desciption}
          </Typography>
          <Typography variant="h7">Precio Actual:</Typography>
          {isEdited ? (
            <input
              type="number"
              name="currentCost"
              value={formData.currentCost}
              onChange={handleChange}
              required={true}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          ) : (
            <Typography variant="body2" sx={{ mb: 0.5 }} color="text.secondary">
              {`$${price}`}
            </Typography>
          )}
          <Typography variant="h7">Stock:</Typography>
          {isEdited ? (
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required={true}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          ) : (
            <Typography variant="body2" sx={{ mb: 0.5 }} color="text.secondary">
              {Intl.NumberFormat().format(stockProduct.toFixed(1))}
            </Typography>
          )}
          {isIncome ? (
            <input
              type="number"
              name="incomeStock"
              value={editedProducts}
              onChange={handleInputChange}
              required={true}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          ) : null}
        </CardContent>
        <CardActions>
          {isEdited || isIncome ? (
            <Button onClick={() => editProduct(id, isIncomeValidate)} size="small">
              Guardar
            </Button>
          ) : (
            <Button
              onClick={() => isEditProduct(id, true, stock, price)}
              size="small"
            >
              Editar
            </Button>
          )}
          {isEdited || isIncome ? null : (<Button size="small">Eliminar</Button>) }
          <Button onClick={() => isIncomeProduct(id, true)} size="small">
            Ingreso
          </Button>
          {isEdited || isIncome ? (
            <Button
              onClick={() => isEditProduct(id, false, stock, price, "income")}
              size="small"
            >
              Cancelar
            </Button>
          ) : null}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
export default ActionAreaCard;
