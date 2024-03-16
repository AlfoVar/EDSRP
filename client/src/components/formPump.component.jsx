import React, { useEffect, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";

const FormPump = ({
  id,
  prevRecord,
  costGas,
  setPrevRecord,
  closeRecordValidate,
  dateValue,
  onChange,
  onTotalGallonsChange,
  onTotalSaleChange,
  validatePumpsFields
}) => {
  const [soldGallons, setSoldGallons] = useState(0);
  const [gallonSale, setGallonSale] = useState(0);
  const [closeRecord, setCloseRecord] = useState(0);
  const [hasClearedInput, setHasClearedInput] = useState(false);
  const [hasError, setHasError] = useState(false);

  const pumpLogics = (prev, closed) => {
    if (closed === 0 || closed === "") {
      setGallonSale(0);
      setSoldGallons(0);
    } else {
      setGallonSale(Number.parseFloat(closed - prev).toFixed(1));
      const totalSale = gallonSale * costGas;
      setSoldGallons(totalSale);
    }
  };

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    console.log(value);
    if (value === "" || value === null || value === undefined || value === 0 || value.length < 6) {
      setHasError(true);
    } else {
      setHasError(false);
    }
    if (/^\d*\.?\d*$/.test(value)) {
      setState(value);
    }
  };

  useEffect(() => {
    // console.log(validatePumpsFields == id)
    const totalGallons = Number(gallonSale);
    onTotalGallonsChange(id, totalGallons);
    const totalSale = Number(soldGallons);
    onTotalSaleChange(id, totalSale);
    if (closeRecordValidate === 0 && !hasClearedInput) {
      setCloseRecord("");
      setHasClearedInput(true);
    } else if (closeRecordValidate !== 0) {
      setCloseRecord(closeRecordValidate);
      setHasClearedInput(false);
    }
    pumpLogics(prevRecord, closeRecord);
    const bodyPump = {
      type: id,
      currentGallonCost: costGas,
      previousRecordGallon: prevRecord,
      currentRecordGallon: closeRecord,
      gallonsSold: gallonSale,
      saleDay: soldGallons,
      date: dateValue,
    };
    onChange(id, bodyPump);
  }, [
    prevRecord,
    gallonSale,
    soldGallons,
    closeRecord,
    handleInputChange,
    costGas,
    dateValue,
    id,
    onChange,
    closeRecordValidate,
  ]);

  return (
    <form className="border-2 border-gray-900 my-2 p-2 rounded-lg">
      <p className="mt-0 text-sm leading-6 text-white-600">
        Mangera {id} = {`$${Intl.NumberFormat().format(soldGallons)}`}
      </p>
      <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <label className="block mb-1 font-bold">Registro Anterior</label>
          <div className="w-1/2 my-6 mx-4">
            {Intl.NumberFormat().format(prevRecord)}
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block mb-1 font-bold">Registro Cierre</label>
          <div className="mt-2">
            <Input
              type="text"
              name="last-name"
              id="last-name"
              value={closeRecord}
              onChange={(e) => {
                handleInputChange(e, setCloseRecord);
              }}
              className="w-full p-2 border border-gray-300 rounded box-border"
              error={hasError}
              required
            />
          </div>
          {
            validatePumpsFields[id] && <FormHelperText>Este campo es requerido</FormHelperText>
          }
          {hasError && <FormHelperText>Revisa este campo</FormHelperText>}
        </div>

        <div className="sm:col-span-1">
          <label className="block mb-1 font-bold">Venta Galones</label>
          <div className="w-1/2 my-6 mx-4 font">
            {Intl.NumberFormat().format(gallonSale)}
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block mb-1 font-bold">Venta</label>
          <div className="w-1/2 my-6 mx-4">
            {`$${Intl.NumberFormat().format(soldGallons)}`}
          </div>
        </div>
      </div>
    </form>
  );
};
export default FormPump;
