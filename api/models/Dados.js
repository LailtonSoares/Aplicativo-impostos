const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CalculoSchema = new Schema({
  valor: {
    type: String,
    required: true,
  },
  ncm: {
    type: String,
    required: true,
  },
  Ipirate: {
    type: String,
    required: true,
  },
  ICMSrate: {
    type: String,
    required: true,
  },
  PISrate: {
    type: String,
    required: true,
  },
  COFINSrate: {
    type: String,
    required: true,
  },
  MVArate: {
    type: String,
    required: false,
  },
  InternalStateRate: {
    type: String,
    required: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const valores = mongoose.model("valores", CalculoSchema);

module.exports = valores;
