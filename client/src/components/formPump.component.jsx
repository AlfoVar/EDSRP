import React, { useEffect, useState } from "react";

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
}) => {
  const [soldGallons, setSoldGallons] = useState(0);
  const [gallonSale, setGallonSale] = useState(0);
  const [closeRecord, setCloseRecord] = useState(0);

  const pumpLogics = (prev, closed) => {
    setGallonSale(Number.parseFloat(closed - prev).toFixed(1));
    const totalSale = gallonSale * costGas;
    setSoldGallons(totalSale);
  };

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setState(value);
    }
  };
  
  useEffect(() => {
    const totalGallons = Number(gallonSale);
    onTotalGallonsChange(id, totalGallons);
    const totalSale = Number(soldGallons);
    onTotalSaleChange(id, totalSale);
    if(closeRecordValidate != 0 ){
      setCloseRecord(closeRecordValidate);
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
  ]);

  return (
      <div className="border-2 border-gray-900 my-2 p-2 rounded-lg">
        <p className="mt-0 text-sm leading-6 text-white-600">
          Mangera {id} = {`$${Intl.NumberFormat().format(soldGallons)}`}
        </p>
        <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
          <div className="sm:col-span-1">
            <label className="block mb-1 font-bold">
              Registro Anterior
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={Intl.NumberFormat().format(prevRecord)}
                onChange={(e) => {
                  handleInputChange(e, setPrevRecord);
                }}
                className="w-full p-2 border border-gray-300 rounded box-border"
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block mb-1 font-bold">
              Registro Cierre
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                value={closeRecord}
                onChange={(e) => {
                  handleInputChange(e, setCloseRecord);
                }}
                className="w-full p-2 border border-gray-300 rounded box-border"
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block mb-1 font-bold">
              Venta Galones
            </label>
            <div className="w-full p-2 border border-gray-300 rounded box-border">{Intl.NumberFormat().format(gallonSale)}</div>
          </div>

          <div className="sm:col-span-1">
            <label className="block mb-1 font-bold">
              Venta
            </label>
            <div className="w-full p-2 border border-gray-300 rounded box-border">
              {`$${Intl.NumberFormat().format(soldGallons)}`}
            </div>
          </div>
        </div>
      </div>
  );
};
export default FormPump;
