import React, { useEffect, useState } from "react"; 
import FormPump from '../components/formPump.component.jsx';
const DailyPage = () => {
  //const soldPumpOne = Intl.NumberFormat().format(3293320);
  //const soldPumpTwo = Intl.NumberFormat().format(1595385);
  //let totalSale = 0;

  const costGas = 14650;

  const [prevRecordOne, setPrevRecordOne] = useState(0);
  const [closeRecordOne, setCloseRecordOne] = useState(0);
  const [soldGallonsOne, setSoldGallonsOne] = useState(0);
  const [totalGallonSaleOne, setTotalGallonSaleOne] = useState(0);
  //surtidos 2
  const [prevRecordTwo, setPrevRecordTwo] = useState(0);
  const [closeRecordTwo, setCloseRecordTwo] = useState(0);
  const [soldGallonsTwo, setSoldGallonsTwo] = useState(0);
  const [totalGallonSaleTwo, setTotalGallonSaleTwo] = useState(0);
  //surtuidor manual
  const [prevRecordManual, setPrevRecordManual] = useState(0);
  const [closeRecordManual, setCloseRecordManual] = useState(0);
  const [soldGallonsManual, setSoldGallonsManual] = useState(0);
  const [totalGallonSaleManual, setTotalGallonSaleManual] = useState(0);

  const pumpOneLogics = (prev, closed) => {
    console.log(prev, closed)
    setTotalGallonSaleOne(Number.parseFloat(closed-prev).toFixed(1));
    const totalSale = (totalGallonSaleOne * costGas )
    setSoldGallonsOne(totalSale);
  };

  const pumpTwoLogics = (prev, closed) => {
    setTotalGallonSaleTwo(Number.parseFloat(closed-prev).toFixed(1));
    const totalSale = (totalGallonSaleTwo * costGas )
    setSoldGallonsTwo(totalSale);
  };

  const pumpManualLogics = (prev, closed) => {
    setTotalGallonSaleManual(Number.parseFloat(closed-prev).toFixed(1));
    const totalSale = (totalGallonSaleManual * costGas )
    setSoldGallonsManual(totalSale);
  };

  // useEffect(() => {
  //   pumpLogics(prevRecordOne, closeRecordOne);
  // }, [prevRecordOne, closeRecordOne, totalGallonSaleOne]);
 
  return (
    <div>
      <form>
        <div className="space-y-12 p-10">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-8 text-white-900">
              Cierre Diario
            </h1>
            <p className="mt-1 text-sm leading-6 text-white-600">
              Surtidores Costo galon gasolina $14650
            </p>
             <FormPump
            prevRecord={prevRecordOne}
            setPrevRecord={setPrevRecordOne}
            closeRecord={closeRecordOne}
            setCloseRecord={setCloseRecordOne}
            pumpLogics={pumpOneLogics}
            totalGallonSale={totalGallonSaleOne}
            soldGallons={soldGallonsOne}
            /> 
            <FormPump
            prevRecord={prevRecordTwo}
            setPrevRecord={setPrevRecordTwo}
            closeRecord={closeRecordTwo}
            setCloseRecord={setCloseRecordTwo}
            pumpLogics={pumpTwoLogics}
            totalGallonSale={totalGallonSaleTwo}
            soldGallons={soldGallonsTwo}
            /> 
            <FormPump
            prevRecord={prevRecordManual}
            setPrevRecord={setPrevRecordManual}
            closeRecord={closeRecordManual}
            setCloseRecord={setCloseRecordManual}
            pumpLogics={pumpManualLogics}
            totalGallonSale={totalGallonSaleManual}
            soldGallons={soldGallonsManual}
            /> 
            {/* <div className="p-5">
              <p className="mt-2 text-sm leading-6 text-white-600">
                Surtidor 1 = {`$${Intl.NumberFormat().format(soldGallonsOne)}`}
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
                      onChange={(e) => {
                        setPrevRecordOne(Number(e.target.value));
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
                      onChange={(e) => setCloseRecordOne(Number(e.target.value))}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-white-900">
                    Venta Galones
                  </label>
                  <div className="mt-2">
                    {totalGallonSaleOne}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-white-900">
                    Venta
                  </label>
                  <div className="mt-2">{`$${Intl.NumberFormat().format(soldGallonsOne)}`}</div>
                </div>
              </div>
            </div> */}
            {/* <div className="p-5">
              <p className="mt-2 text-sm leading-6 text-white-600">
                Surtidor 2 = $xxxxxxx
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-white-900">
                    Venta Galones
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-white-900">
                    Venta
                  </label>
                  <div className="mt-2">{`$${soldPumpTwo}`}</div>
                </div>
              </div>
            </div> */}
            {/* <div className="p-5">
              <p className="mt-2 text-sm leading-6 text-white-600">
                Surtidor Manual = $xxxxxxx
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-white-900">
                    Venta Galones
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-white-900">
                    Venta
                  </label>
                  <div className="mt-2">= $3.293.320</div>
                </div>
              </div>
            </div> */}
            <div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-white-900">
                  Galones vendidos
                </label>
                <div className="mt-2">= $3.293.320</div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-white-900">
                  Arqueo
                </label>
                <div className="mt-2">= $3.293.320</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DailyPage;
