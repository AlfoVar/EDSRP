import React, { useEffect, useState } from "react";
import FormPump from "../components/formPump.component.jsx";
import { usePump } from "../context/PumpContext.jsx";
import { useClosing } from "../context/ClosingContext.jsx";
import { useGrocerContext } from "../context/grocerContext.jsx";
import { useClosingGasConstext } from "../context/ClosingGasContext.jsx";
import { useProducts } from "../context/ProductContext.jsx";

import DatePickerValue from "../components/datePicker.jsx";
import SelectList from "../components/selectList.jsx";
import dayjs from "dayjs";

const DailyPage = () => {
  const pumpsContext = usePump();
  const closingContext = useClosing();
  const grocerContext = useGrocerContext();
  const closingGasContext = useClosingGasConstext();
  const productsContext = useProducts();

  const [prevRecord, setPrevRecord] = useState(0);
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
  const [productData, setProductData] = useState([{}]);
  const [gasProduct, setGasProduct] = useState({});
  const [idGasProduct, setIdGasProduct] = useState(0);
  const [costGas, setCostGas] = useState(0);	

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
    // console.log(stockAfterGast);
    const totalGasAfter = stockAfterGast - totalGallonsDay;
    setStockGasToday(totalGasAfter);
  };

  const saveRegisterPump = async (event) => {
    var listPumpsIds = [];
    var counter = 0;
    event.preventDefault();
    for (const [key, value] of Object.entries(dataPumps)) {
      const res = await pumpsContext
        .addPump({
          type: key,
          currentRecordGallon: value.currentRecordGallon,
          previousRecordGallon: value.previousRecordGallon,
          gallonsSold: value.gallonsSold,
          saleDay: value.saleDay,
          currentGallonCost: value.currentGallonCost,
        })
        .then(async (res) => {
          const resId = await res.pump;
          listPumpsIds.push(resId._id);
        })
        .catch(async (error) => {
          console.log(
            error,
            "Se genero un problema guardando uno de los surtidores porfavor intente de nuevo."
          );
          if (listPumpsIds.length > 0) {
            await deleteData(listPumpsIds);
          }
        });
      counter++;
    }
    saveClosingGas(listPumpsIds);
  };

  const deleteData = async (listPump, closingGasID, closingID) => {
    if (closingID) {
      await closingGasContext.deleteGas(closingGasID);
      console.log("Se elimino el cierre");
    }
    if (closingGasID) {
      await closingGasContext.deleteGas(closingGasID);
      console.log("Se elimino el cierre de gasolina");
    }
    if (listPump.length > 0) {
      for (let pumpId of listPump) {
        await pumpsContext.deletePump(pumpId);
        console.log("Se eliminaron las mangeras");
      }
    }
    return;
  };

  const updateGasProduct = async () => {
    console.log(stockGasToday, "stockGasToday");
    await productsContext
      .updateProduct(idGasProduct, { stock: stockGasToday })
      .then((res) => {
        console.log("Se actualizo el stock de gasolina");
        return true;
      })
      .catch(async (error) => {
        console.log("Se genero un error actualizando el stock de gasolina");
        return false;
      });
  };

  const saveClosingGas = async (listPump) => {
    await closingGasContext
      .addClosingGasData({
        Pumps: listPump,
        stockBeforeGas: stockAfterGast,
        totalGallonsSoldDay: totalGallonsDay,
        stockAfterGas: stockGasToday,
        cashInBoxGas: totalSaleDay,
      })
      .then(async (res) => {
        console.log("Se guardo el cierre de gasolina");
        await saveClosingDay(listPump, res._id);
        return res;
      })
      .catch(async (err) => {
        await deleteData(listPump);
        console.log(" Se genero un error guardando el cierre de gasolina");
        return;
      });
  };

  const saveClosingDay = async (listPump, gasId) => {
    await closingContext
      .addClosing({
        grocer: valueGrocer,
        date: dateValue.format("YYYY-MM-DD"),
        gas: gasId,
        closingProducts: [],
        closingTotalDay: 7315660,
        cashValueToday: 7213000,
        surplusOfDay: 102340,
      })
      .then((res) => {
        console.log(res);
        updateGasProduct();
      })
      .catch(async (error) => {
        await deleteData(listPump, gasId);
        console.log(" Se genero un error guardando el cierre");
        return;
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

  const getClosingDataContext = async () => {
    const dataDate = await closingContext.getClosingsByDate(
      dateValue.format("2024-04-09")
    );
    console.log(dataDate);
    setClosingData(dataDate);
  };

  const filterGasProduct = () => {
    const prueba = productData.filter((product) => {
      return product.idProduct === "GAS";
    });
    return prueba;
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
    setProductData(productsContext.products);
    setGasProduct(filterGasProduct());
    setGasClosingData();
    gasStoreGallonsLogic();
    if (gasProduct && gasProduct.length > 0) {
      for (let product of gasProduct) {
        setStockAfterGast(product.stock);
        setIdGasProduct(product._id);
        setCostGas(product.currentCost);
      }
    }
  }, [
    listPumpsIdsSaved,
    dataGas,
    closingGasContext,
    closingContext,
    pumpsContext,
    productsContext,
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
                    Surtidores Costo galon gasolina ${costGas}
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
                        costGas={costGas}
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
