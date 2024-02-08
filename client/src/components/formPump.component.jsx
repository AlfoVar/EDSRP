import React, { useEffect, useState } from "react";

const FormPump = ({
  id,
  prevRecord,
  setPrevRecord,
  //closeRecord,
  //setCloseRecord,
  //pumpLogics,
  totalGallonSale,
  soldGallonsDay,
  onTotalGallonsChange,
  onTotalSaleChange,
}) => {
  const [totalGallons, setTotalGallons] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [soldGallons, setSoldGallons] = useState(0);
  const [gallonSale, setGallonSale] = useState(0);
  const [closeRecord, setCloseRecord] = useState(0);
  const costGas = 14650;

  
  const pumpLogics = (prev, closed) => {
    setGallonSale(Number.parseFloat(closed - prev).toFixed(1));
    const totalSale = gallonSale * costGas;
    setSoldGallons(totalSale);
  };

  // const handleTotalGallonsChange = (id, newTotal) => {
  //   setTotalGallons((prevTotalGallons) => ({
  //     ...prevTotalGallons,
  //     [id]: newTotal,
  //   }));
  // };

  // const handleTotalSaleChange = (id, newSaleTotal) => {
  //   console.log(id, "id")
  //   setTotalSale((prevTotalSale) => ({
  //     ...prevTotalSale,
  //     [id]: newSaleTotal,
  //   }));
  // };

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // regex to validate decimal numbers
      setState(value);
    }
  };

  useEffect(() => {
    const totalGallons = Number(gallonSale);
    //console.log(totalGallons, "totalGallons")
    onTotalGallonsChange(id, totalGallons)
    const totalSale = Number(soldGallons);
    onTotalSaleChange(id, totalSale)
    pumpLogics(prevRecord, closeRecord);
  }, [prevRecord, gallonSale, soldGallons, closeRecord]);

  return (
    <form>
      <div className="p-5">
        <p className="mt-2 text-sm leading-6 text-white-600">
          Surtidor 1 = {`$${Intl.NumberFormat().format(soldGallons)}`}
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
                value={prevRecord}
                onChange={(e) => {
                  //setPrevRecord(Number(e.target.value));
                  handleInputChange(e, setPrevRecord);
                  //pumpLogics();
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
                  //setCloseRecord(Number(e.target.value));
                  //pumpLogics();
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium leading-6 text-white-900">
              Venta Galones
            </label>
            <div className="mt-2">{gallonSale}</div>
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
      {/* <div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-white-900">
            Galones vendidos
          </label>
          <div className="mt-2">{`$${totalGallons}`}</div>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-white-900">
            Arqueo
          </label>
          <div className="mt-2">= $3.293.320</div>
        </div>
      </div> */}
    </form>
  );
};
export default FormPump;
