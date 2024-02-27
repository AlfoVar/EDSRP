import React, { createContext, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import mobil2 from "../images/mobil2-t-card.jpg";

const ActionAreaCard = ({
  id,
  nameProduct,
  desciption,
  price,
  stock,
  formData,
  setFormData,
  editProduct,
  isEdited,
  setIsEdited,
}) => {
console.log("render Card")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isEditProduct = async (e) => {
    setIsEdited(true);
    formData.currentCost = price;
    formData.stock = stock;
  };

  useEffect(() => {
  }, [nameProduct, formData, price, stock]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={mobil2}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nameProduct}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
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
              {stock}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {
            isEdited ? (
              <Button onClick={()=>editProduct(id)} size="small">Guardar</Button>
            ) : (
              <Button onClick={isEditProduct} size="small">
                Editar
              </Button>)
          }
          <Button size="small">Eliminar</Button>
          {
            isEdited ? (
              <Button onClick={() => setIsEdited(false)} size="small">Cancelar</Button>
            ) : null
          }
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
export default ActionAreaCard;
