import React, {useEffect} from "react";


const FormPump = ({prevRecord, setPrevRecord, closeRecord, setCloseRecord, pumpLogics, totalGallonSale, soldGallons
}) => {

  const handleInputChange = (e, setState) => {
    const value =Number.parseFloat(e.target.value).toFixed(2);
    if (/^\d*\.?\d*$/.test(value)) { // regex to validate decimal numbers
      setState(Number(e.target.value));
    }
  };
//   [prevRecord, setPrevRecord] = useState(0);
//   [closeRecord, setCloseRecord] = useState(0);
//   [soldGallons, setSoldGallons] = useState(0);
//   [totalGallonSale, setTotalGallonSale] = useState(0);
useEffect(() => {
  pumpLogics(prevRecord, closeRecord);
}, [prevRecord, closeRecord, totalGallonSale]);

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
                setCloseRecord(Number(e.target.value));
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
          <div className="mt-2">{totalGallonSale}</div>
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6 text-white-900">
            Venta
          </label>
          <div className="mt-2">{`$${Intl.NumberFormat().format(
            soldGallons
          )}`}</div>
        </div>
      </div>
    </div>
    </form>
  );
};
 export default FormPump;