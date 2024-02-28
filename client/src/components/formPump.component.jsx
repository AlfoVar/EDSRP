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
    <form>
      <div className="p-5">
        <p className="mt-2 text-sm leading-6 text-white-600">
          Mangera {id} = {`$${Intl.NumberFormat().format(soldGallons)}`}
        </p>
        <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-white-900">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-white-900">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-white-900">
              Venta Galones
            </label>
            <div className="mt-2">{Intl.NumberFormat().format(gallonSale)}</div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-white-900">
              Venta
            </label>
            <div className="mt-2">
              {`$${Intl.NumberFormat().format(soldGallons)}`}
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={saveRegisterPump} className=''>Guardar</button> */}
    </form>
  );
};
export default FormPump;
