import React, { useEffect, useState } from "react";
import FormPump from "../components/formPump.component.jsx";
import { usePump } from "../context/PumpContext.jsx";
import { useClosing } from "../context/ClosingContext.jsx";
import { useGrocerContext } from '../context/grocerContext.jsx';
import DatePickerValue from "../components/datePicker.jsx";
import SelectList from '../components/selectList.jsx';
import dayjs from "dayjs";
import { set } from "mongoose";
import { isValid } from "zod";

const DailyPage = () => {
  const pumpsContext = usePump();
  const closingContext = useClosing();
  const grocerContext = useGrocerContext();

  const [prevRecord, setPrevRecord] = useState(0);
  const [closeRecord, setCloseRecord] = useState(0);
  const [totalGallons, setTotalGallons] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [dateValue, setDateValue] = useState(dayjs());
  const [dataValidateForDate, setDataValidateForDate] = useState([]);
  const [totalGallonsDay, setTotalGallonsDay] = useState(0);
  const [totalSaleDay, setTotalSaleDay] = useState(0);
  const [closingData, setClosingData] = useState([]);
  const [valueGrocer, setValueGrocer] = useState('');
  const [dataGrocer, setDataGrocer] = useState([]);

  const [isToday, setIsToday] = useState(false);

  const [dataPumps, setDataPumps] = useState([]);

  const handlePumpDataChange = (id, newPumpData) => {
    setDataPumps((prevData) => ({
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

  const pruebaData = (data) => {
    console.log(data);
  };

  const saveRegisterPump = async (event) => {
    var counter = 0;
    var size = Object.keys(dataPumps).length;
    event.preventDefault();
    for (const [key, value] of Object.entries(dataPumps)) {
      //console.log(`${key}: ${value}`);
      const prueba = {
        type: key,
        date: dateValue.format("YYYY-MM-DD"),
        currentRecordGallon: value.currentRecordGallon,
        previousRecordGallon: value.previousRecordGallon,
        gallonsSold: value.gallonsSold,
        saleDay: value.saleDay,
        currentGallonCost: value.currentGallonCost,
      };
      pruebaData(prueba);
      await pumpsContext.addPump({
        type: key,
        date: dateValue.format("YYYY-MM-DD"),
        currentRecordGallon: value.currentRecordGallon,
        previousRecordGallon: value.previousRecordGallon,
        gallonsSold: value.gallonsSold,
        saleDay: value.saleDay,
        currentGallonCost: value.currentGallonCost,
      });
      counter++;
    }
  };

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

  // const resultPumpsYesterday = filterByDate(
  //   pumpsContext.pumps,
  //   dateValue.add(-1, "day").format("YYYY-MM-DD")
  // );

  // const resultPumpsToday = filterByDate(
  //   pumpsContext.pumps,
  //   dateValue.format("YYYY-MM-DD")
  // );

  const getClosingDataContext = async () => {
    const dataDate = await closingContext.getClosingsByDate(
      dateValue.format("2024-04-09")
    );
    console.log(dataDate);
    setClosingData(dataDate);
  };

  const validateDataClosingDate = (data) => {
    const dateToday = new Date(dateValue.format("YYYY-MM-DD"));
    const dateYesterday = new Date(
      dateValue.add(-1, "day").format("YYYY-MM-DD")
    );
    const isTodayData = filterByDate(data, dateToday);
    const isYesterdayData = filterByDate(data, dateYesterday);
    if (isTodayData.length > 0) {
      setIsToday(true);
      setDataValidateForDate(isTodayData);
    } else {
      setIsToday(false);
      setDataValidateForDate(isYesterdayData);
    }
  };

  useEffect(() => {
    validateDataClosingDate(closingContext.closings);
    //setDataGrocer(grocerContext);
  }, [closingContext, pumpsContext, dateValue, dataPumps, isToday]);

  return (
    <div>
      <DatePickerValue
        setDateValue={setDateValue}
        onChange={getClosingDataContext}
      />
      <SelectList
        listValue={grocerContext}
        value={valueGrocer}
        setValue={setValueGrocer}
      />
      {dataValidateForDate.map((closing, i) => {
        const getGas = closing.gas;
        return (
          <div key={i}>
            <form>
              <div className="space-y-12 p-10">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1 className="text-base font-semibold leading-8 text-white-900">
                    Cierre Diario
                  </h1>
                  <p className="mt-1 text-sm leading-6 text-white-600">
                    Surtidores Costo galon gasolina $14650
                  </p>
                  {getGas.Pumps.map((pump, i) => {
                    return (
                      <FormPump
                        key={i}
                        id={pump.type}
                        onChange={handlePumpDataChange}
                        prevRecord={
                          isToday
                            ? pump.previousRecordGallon
                            : pump.currentRecordGallon
                        }
                        setPrevRecord={setPrevRecord}
                        closeRecordValidate={
                          isToday ? pump.currentRecordGallon : 0
                        }
                        totalGallonsSale={setTotalGallonsDay}
                        totalSale={setTotalSaleDay}
                        onTotalSaleChange={handleTotalSaleChange}
                        onTotalGallonsChange={handleTotalGallonsChange}
                        dateValue={dateValue.format("YYYY-MM-DD")}
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
                  <button
                    disabled={isToday ? true : false}
                    onClick={saveRegisterPump}
                    className=""
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default DailyPage;
