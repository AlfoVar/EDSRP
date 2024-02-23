import React, { useEffect, useState } from "react";
import FormPump from "../components/formPump.component.jsx";
import { usePump } from "../context/PumpContext.jsx";
import { useClosing } from "../context/ClosingContext.jsx";
import { useGrocerContext } from "../context/grocerContext.jsx";
import { useClosingGasConstext } from "../context/ClosingGasContext.jsx";

import DatePickerValue from "../components/datePicker.jsx";
import SelectList from "../components/selectList.jsx";
import dayjs from "dayjs";
import { get } from "mongoose";
import { Await } from "react-router-dom";

const DailyPage = () => {
  const pumpsContext = usePump();
  const closingContext = useClosing();
  const grocerContext = useGrocerContext();
  const closingGasContext = useClosingGasConstext();

  const [prevRecord, setPrevRecord] = useState(0);
  const [closeRecord, setCloseRecord] = useState(0);
  const [totalGallons, setTotalGallons] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [dateValue, setDateValue] = useState(dayjs());
  const [dataValidateForDate, setDataValidateForDate] = useState([]);
  const [totalGallonsDay, setTotalGallonsDay] = useState(0);
  const [totalSaleDay, setTotalSaleDay] = useState(0);
  const [closingData, setClosingData] = useState([]);
  const [valueGrocer, setValueGrocer] = useState("");
  const [dataGas, setDataGas] = useState([{}]);
  const [dataGasId, setDataGasId] = useState(0);
  const [stockGasToday, setStockGasToday] = useState(0);
  const [stockAfterGast, setStockAfterGast] = useState(0);
  const [listPumpsIdsSaved, setListPumpsIdsSaved] = useState([{}]);
  const [idClogingGas, setIdClogingGas] = useState(0);

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

  const gasStoreGallonsLogic = () => {
    const totalGasAfter = stockAfterGast - totalGallonsDay;
    setStockGasToday(totalGasAfter);
  };

  const getStockAfterGast = async () => {};

  const saveRegisterPump = async (event) => {
    var listPumpsIds = [];
    var counter = 0;
    event.preventDefault();
    for (const [key, value] of Object.entries(dataPumps)) {
      const res = await pumpsContext.addPump({
        type: key,
        currentRecordGallon: value.currentRecordGallon,
        previousRecordGallon: value.previousRecordGallon,
        gallonsSold: value.gallonsSold,
        saleDay: value.saleDay,
        currentGallonCost: value.currentGallonCost,
      });
      const resId = await res.pump;
      listPumpsIds.push(resId._id);
      counter++;
    }
    setListPumpsIdsSaved(listPumpsIds);
    saveClosingGas(listPumpsIds);
  };

  const saveClosingGas = async (listPump) => {
    const res = await closingGasContext.addClosingGasData({
      Pumps: listPump,
      stockBeforeGas: stockAfterGast,
      totalGallonsSoldDay: totalGallonsDay,
      stockAfterGas: stockGasToday,
      cashInBoxGas: totalSaleDay,
    });
    saveClosingDay(res._id);
  };

  const saveClosingDay = async (gasId) => {
    const res = await closingContext.addClosing({
      grocer: valueGrocer,
      date: dateValue.format("YYYY-MM-DD"),
      gas: gasId,
      closingProducts:[],
      closingTotalDay: 7315660,
      cashValueToday:  7213000 , 
      surplusOfDay: 102340 
    });
    console.log(res);
  };

  const functPruebaReturnClosingGas = async (event) => {
    event.preventDefault();
    console.log(dataGas);
    const closignGasData = await setGasClosingData();
    console.log("1. ", closignGasData);

    setDataClosingGas(closignGasData);
    // const

    //   const getClosingGasByID = getGasClosing(IdGas)
    // .then(dataGas => {
    //   console.log(dataGas);
    //   return dataGas;// haz algo con dataGas
    // })
    // .catch(error => {
    //   console.error(error); // maneja cualquier error
    // });

    console.log("2. ", dataGas, dataGasId);

    // getClosingGasByID.map((gas, i) => {
    //   setDataGas(gas);
    //   setDataGasId(gas._id);
    // });

    // console.log(dataGasId, dataGas)

    const valueGasbeforeGallons = gasStoreGallonsLogic();

    console.log("3. ", valueGasbeforeGallons);
  };

  const setDataClosingGas = (Data) => {
    console.log(Data);
    Data.map((gas, i) => {
      setDataGas(gas);
      setDataGasId(gas._id);
    });
  };

  const getPumpsCreated = async () => {
    const dataPumps = await pumpsContext.getPumps();
    setDataPumps(dataPumps);
    const dataPumpsNow = filterByDate(dataPumps, dateToday);
    if (dataPumpsNow.length > 0) {
      return dataPumpsNow;
    } else {
      getPumpsCreated();
    }
  };

  const getGasClosing = async (Id) => {
    const dataGas = await dataGas.filterById(Id);
    return dataGas;
  };

  const setGasClosingData = async () => {
    const gasData = dataValidateForDate.map((closing, i) => {
      const getGas = closing.gas;
      return getGas;
    });
    setDataGas(gasData);
    return gasData;
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
    setGasClosingData();
    gasStoreGallonsLogic();
    if (dataGas && dataGas.length > 0) {
      //  console.log(dataGas)
      for (let gas of dataGas) {
        setStockAfterGast(gas.stockAfterGas);
      }
    }
    // getGasClosing();
    //setDataGrocer(grocerContext);
  }, [
    listPumpsIdsSaved,
    dataGas,
    closingGasContext,
    closingContext,
    pumpsContext,
    dateValue,
    dataPumps,
    isToday,
  ]);

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
                        {Intl.NumberFormat().format(stockGasToday.toFixed(1))}
                      </div>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium leading-6 text-white-900">
                        Venta total del dia
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
                  <button
                    disabled={isToday ? true : false}
                    onClick={functPruebaReturnClosingGas}
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
