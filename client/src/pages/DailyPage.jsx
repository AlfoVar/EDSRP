import React, { useEffect, useState } from "react";
import FormPump from "../components/formPump.component.jsx";
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
  //globales
  const [totalGallons, setTotalGallons] = useState(0);
  const [totalSale, setTotalSale] = useState(0);

  const pumpOneLogics = (prev, closed) => {
    console.log(prev, closed);
    setTotalGallonSaleOne(Number.parseFloat(closed - prev).toFixed(1));
    const totalSale = totalGallonSaleOne * costGas;
    setSoldGallonsOne(totalSale);
    // totalGallonsLogics();
  };

  const pumpTwoLogics = (prev, closed) => {
    setTotalGallonSaleTwo(Number.parseFloat(closed - prev).toFixed(1));
    const totalSale = totalGallonSaleTwo * costGas;
    setSoldGallonsTwo(totalSale);
    //totalGallonsLogics();
  };

  const pumpManualLogics = (prev, closed) => {
    setTotalGallonSaleManual(Number.parseFloat(closed - prev).toFixed(1));
    const totalSale = totalGallonSaleManual * costGas;
    setSoldGallonsManual(totalSale);
    //totalGallonsLogics();
  };

  const handleTotalGallonsChange = (id, newTotal) => {
    setTotalGallons((prevTotalGallons) => ({
      ...prevTotalGallons,
      [id]: newTotal,
    }));
  };

  const handleTotalSaleChange = (id, newSaleTotal) => {
    setTotalSale((prevTotalSale) => ({
      ...prevTotalSale,
      [id]: newSaleTotal,
    }));
  };

  // const totalGallonsLogics = () => {
  //   const totalGallons = [
  //     totalGallonSaleManual,
  //     totalGallonSaleOne,
  //     totalGallonSaleTwo,
  //   ].reduce((a, b) => a + b, 0);
  //   setTotalGallons(totalGallons);
  // };
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
              id="form1"
              onTotalGallonsChange={handleTotalGallonsChange}
              onTotalSaleChange={handleTotalSaleChange}
              prevRecord={prevRecordOne}
              setPrevRecord={setPrevRecordOne}
              closeRecord={closeRecordOne}
              setCloseRecord={setCloseRecordOne}
              pumpLogics={pumpOneLogics}
              totalGallonSale={totalGallonSaleOne}
              soldGallons={soldGallonsOne}
            />
            <FormPump
              id="form2"
              onTotalGallonsChange={handleTotalGallonsChange}
              onTotalSaleChange={handleTotalSaleChange}
              prevRecord={prevRecordTwo}
              setPrevRecord={setPrevRecordTwo}
              closeRecord={closeRecordTwo}
              setCloseRecord={setCloseRecordTwo}
              pumpLogics={pumpTwoLogics}
              totalGallonSale={totalGallonSaleTwo}
              soldGallons={soldGallonsTwo}
            />
            <FormPump
              id="form3"
              onTotalGallonsChange={handleTotalGallonsChange}
              onTotalSaleChange={handleTotalSaleChange}
              prevRecord={prevRecordManual}
              setPrevRecord={setPrevRecordManual}
              closeRecord={closeRecordManual}
              setCloseRecord={setCloseRecordManual}
              pumpLogics={pumpManualLogics}
              totalGallonSale={totalGallonSaleManual}
              soldGallons={soldGallonsManual}
            />
            <div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-white-900">
                  Galones vendidos
                </label>
                <div className="mt-2">
                  {`= ${Intl.NumberFormat().format(
                    totalGallons.form1 + totalGallons.form2 + totalGallons.form3
                  )}`}
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-white-900">
                  Arqueo
                </label>
                <div className="mt-2">{`$${Intl.NumberFormat().format(totalSale.form1+totalSale.form2)}`}</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DailyPage;
