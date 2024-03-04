import React, { useEffect, useState } from "react";
import FormPump from "../components/formPump.component.jsx";
import { usePump } from "../context/PumpContext.jsx";
import { useClosing } from "../context/ClosingContext.jsx";
import { useGrocerContext } from "../context/grocerContext.jsx";
import { useClosingGasConstext } from "../context/ClosingGasContext.jsx";
import { useProducts } from "../context/ProductContext.jsx";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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
  const [isExpanded, setIsExpanded] = useState(false);

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
      setStockAfterGast(totalGallonsDay);
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
        if (!isToday) {
          setStockAfterGast(product.stock);
        } else {
          if (dataGas.length > 0) {
            for (let gas of dataGas) {
              setStockAfterGast(gas.stockBeforeGas);
            }
          }
        }
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
      <form className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out">
        <h1 className="text-base font-semibold leading-8 text-white-900">
          Cierre Diario
        </h1>
        <DatePickerValue
          setDateValue={setDateValue}
          onChange={getClosingDataContext}
        />
        {dataValidateForDate.map((closing, i) => {
          const getGas = closing.gas;
          return (
            <>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <h1 className="text-base font-semibold leading-8 text-white-900">
                    {closing.grocer.nameGrocer}
                  </h1>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <button
                onClick={(event) => {
                  event.preventDefault();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? "Contraer" : "Expandir"}
              </button> */}
                  <div
                    className={`border-2 border-gray-900 my-2 p-2 rounded-lg `}
                    key={i}
                  >
                    <SelectList
                      listValue={grocerContext}
                      value={valueGrocer}
                      setValue={setValueGrocer}
                    />
                    <div className="space-y-12 p-10">
                      <div className="border-b border-gray-900/10 pb-12">
                        <p className="mt-1 leading-6 text-white-600">
                          Costo actual del galon gasolina:{" "}
                          <span className="text-red-500 mb-1 font-bold">
                            ${costGas}
                          </span>
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
                        <div className="border-2 border-gray-900 my-2 p-2 rounded-lg">
                          <label className="w-1/2 mb-1 font-bold">
                            Galones vendidos
                          </label>
                          <div className="w-1/2 my-1 ">
                            {Intl.NumberFormat().format(
                              totalGallonsDay.toFixed(1)
                            )}
                          </div>
                          <label className="w-1/2 mb-1 font-bold ">
                            Arqueo
                          </label>
                          <div className="w-1/2 my-1">
                            {Intl.NumberFormat().format(
                              stockGasToday.toFixed(1)
                            )}
                          </div>
                          <label className="w-1/2 mb-1 font-bold ">
                            Venta total del dia
                          </label>
                          <div className="w-1/2 my-1">
                            {Intl.NumberFormat().format(totalSaleDay)}
                          </div>
                        </div>
                        <button
                          disabled={isToday ? true : false}
                          onClick={saveRegisterPump}
                          className="w-full my-1 p-2 bg-green-500 hover:bg-green-700 text-white border-none rounded cursor-pointer text-lg"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      </form>
    </div>
  );
};

export default DailyPage;
