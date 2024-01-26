import modelPump from "../models/pump.model.js";

export const getPump = async (req, res) => {
  const pump = await modelPump.find();
  console.log(pump);
  res.json(pump);
};

export const getPumpById = async (req, res) => {
  const pump = await modelPump.findById(req.params.id);
  res.json(pump);
};

export const addPump = async (req, res) => {
    console.log(req.body)
  const {
    type,
    currentGallonCost,
    previousRecordGallon,
    currentRecordGallon,
    gallonsSold,
    saleDay,
  } = req.body;
  const pump = new modelPump({
    type,
    currentGallonCost,
    previousRecordGallon,
    currentRecordGallon,
    gallonsSold,
    saleDay,
  });
  await pump.save();
  res.json({ status: "Surtidor Guardado" });
};

export const updatePumpById = async (req, res) => {
  const {
    type,
    currentGallonCost,
    previousRecordGallon,
    currentRecordGallon,
    gallonsSold,
    saleDay,
  } = req.body;
  const pumpUpdate = {
    type,
    currentGallonCost,
    previousRecordGallon,
    currentRecordGallon,
    gallonsSold,
    saleDay,
  };
  await modelPump.findByIdAndUpdate(req.params.id, pumpUpdate);
  res.json({ status: "Surtidor Actualizado" });
};

export const deletePump = async (req, res) => {
  await modelPump.findByIdAndDelete(req.params.id);
  res.json({ status: "Surtidor Eliminado" });
};
