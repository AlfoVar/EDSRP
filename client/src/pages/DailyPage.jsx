import React, { useContext, useEffect, useState } from "react";
import FormPump from "../components/formPump.component.jsx";
import { usePump, PumpContextProvider } from '../context/PumpContext.jsx';
import DatePickerValue from "../components/datePicker.jsx";    
import dayjs from "dayjs";
import { set } from "mongoose";

const DailyPage = () => {
  const pumpsContext = usePump();
 
  // console.log(
  //   pumpsData
  // )
  const costGas = 14650;

  const [prevRecord, setPrevRecord] = useState(0);
  const [totalGallons, setTotalGallons] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [dateValue, setDateValue] = useState(dayjs());
  const [pumpsYesterday, setPumpsYesterday] = useState([]); 
  const [totalGallonsDay, setTotalGallonsDay] = useState(0);
  const [totalSaleDay, setTotalSaleDay] = useState(0);  

  const handleTotalGallonsChange = (id, newTotal) => {
    setTotalGallons((prevTotalGallons) => ({
      ...prevTotalGallons,
      [id]: newTotal,
    }));
    setTotalGallonsDay(totalGallons[1]+totalGallons[2]+totalGallons[3]);
  };

  const handleTotalSaleChange = (id, newSaleTotal) => {
    setTotalSale((prevTotalSale) => ({
      ...prevTotalSale,
      [id]: newSaleTotal,
    }));
    setTotalSaleDay(totalSale[1]+totalSale[2]+totalSale[3]);//TODO validar sumatoria global de ventas del dia
  };

  

  useEffect(() => {
    const filterByDate = (data, date) => {
      // Convertir la fecha de entrada a un objeto Date
      const inputDate = new Date(date);
      // Filtrar los datos
      const filteredData = data.filter(item => {
        // Convertir la fecha del item a un objeto Date
        const itemDate = new Date(item.date);
        // Comparar las fechas
        return itemDate.getFullYear() === inputDate.getFullYear()
          && itemDate.getMonth() === inputDate.getMonth()
          && itemDate.getDate() === inputDate.getDate();
      });

      return filteredData;
    };
    const resultPumpsYesterday = filterByDate(pumpsContext.pumps, dateValue.format('YYYY-MM-DD'));  
    setPumpsYesterday(resultPumpsYesterday);
    //setPrevRecordOne(resultPumpsYesterday[0]?.previousRecordGallon);
  }, [pumpsContext, dateValue ]);

  return (
    <div>
      <DatePickerValue
        setDateValue={setDateValue}
      />
      <form>
        <div className="space-y-12 p-10">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-8 text-white-900">
              Cierre Diario
            </h1>
            <p className="mt-1 text-sm leading-6 text-white-600">
              Surtidores Costo galon gasolina $14650
            </p>
            {
              pumpsYesterday.map((pump, i) => {
                return (
                  <FormPump 
                    key={i}
                    id={pump.type}
                    prevRecord={pump.currentRecordGallon}
                    setPrevRecord={setPrevRecord}
                    totalGallonsSale={setTotalGallonsDay}
                    totalSale={setTotalSaleDay}
                    onTotalSaleChange={handleTotalSaleChange}
                    onTotalGallonsChange={handleTotalGallonsChange}
                   // soldGallons={setTotalSale}
                  />
                )
              })
            }
            
           
            <div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-white-900">
                  Galones vendidos
                </label>
                <div className="mt-2">
                  {totalGallonsDay}
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-white-900">
                  Arqueo
                </label>
                <div className="mt-2">{totalSaleDay}</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DailyPage;
