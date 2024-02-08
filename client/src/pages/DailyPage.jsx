import React, { useEffect, useState } from "react";
import FormPump from "../components/formPump.component.jsx";
import { usePump, PumpContextProvider } from "../context/PumpContext.jsx";
import DatePickerValue from "../components/datePicker.jsx";
import dayjs from "dayjs";
import { set } from "mongoose";

const DailyPage = () => {
  const pumpsContext = usePump();

  const [prevRecord, setPrevRecord] = useState(0);
  const [totalGallons, setTotalGallons] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [dateValue, setDateValue] = useState(dayjs());
  const [pumpsYesterday, setPumpsYesterday] = useState([]);
  const [totalGallonsDay, setTotalGallonsDay] = useState(0);
  const [totalSaleDay, setTotalSaleDay] = useState(0);

  const [dataEjemplo, setDataEjemplo] = useState({});

  const handlePumpDataChange = (id, newPumpData) => {
    setDataEjemplo((prevData) => ({
      ...prevData,
      [id]: newPumpData,
    }));
  };

  const handleTotalGallonsChange = (id, newTotal) => {
    setTotalGallons((prevTotalGallons) => ({
      ...prevTotalGallons,
      [id]: newTotal,
    }));
    setTotalGallonsDay(totalGallons[1] + totalGallons[2] + totalGallons[3]);
  };

  const handleTotalSaleChange = (id, newSaleTotal) => {
    setTotalSale((prevTotalSale) => ({
      ...prevTotalSale,
      [id]: newSaleTotal,
    }));
    setTotalSaleDay(totalSale[1] + totalSale[2] + totalSale[3]);
  };

  const saveRegisterPump = (event) => {
    event.preventDefault();
    console.log(dataEjemplo);
  };

  useEffect(() => {
    const filterByDate = (data, date) => {
      const inputDate = new Date(date);
      const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getFullYear() === inputDate.getFullYear() &&
          itemDate.getMonth() === inputDate.getMonth() &&
          itemDate.getDate() === inputDate.getDate()
        );
      });

      return filteredData;
    };
    const resultPumpsYesterday = filterByDate(
      pumpsContext.pumps,
      dateValue.add(-1, "day").format("YYYY-MM-DD")
    );
    setPumpsYesterday(resultPumpsYesterday);
  }, [pumpsContext, dateValue, dataEjemplo]);

  return (
    <div>
      <DatePickerValue setDateValue={setDateValue} />
      <form>
        <div className="space-y-12 p-10">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-8 text-white-900">
              Cierre Diario
            </h1>
            <p className="mt-1 text-sm leading-6 text-white-600">
              Surtidores Costo galon gasolina $14650
            </p>
            {pumpsYesterday.map((pump, i) => {
              return (
                <FormPump
                  key={i}
                  id={pump.type}
                  onChange={handlePumpDataChange}
                  prevRecord={pump.currentRecordGallon}
                  setPrevRecord={setPrevRecord}
                  totalGallonsSale={setTotalGallonsDay}
                  totalSale={setTotalSaleDay}
                  onTotalSaleChange={handleTotalSaleChange}
                  onTotalGallonsChange={handleTotalGallonsChange}
                  dateValue={dateValue.format("YYYY-MM-DD")} // Fix: Added the assignment operator (=) between dateValue and setDateValue
                  // soldGallons={setTotalSale}
                />
              );
            })}

            <div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-white-900">
                  Galones vendidos
                </label>
                <div className="mt-2">
                  {Intl.NumberFormat().format(totalGallonsDay.toFixed(1))}
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-white-900">
                  Arqueo
                </label>
                <div className="mt-2">
                  {Intl.NumberFormat().format(totalSaleDay)}
                </div>
              </div>
            </div>
            <button onClick={saveRegisterPump} className="">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DailyPage;
