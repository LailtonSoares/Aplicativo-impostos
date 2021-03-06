const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());



mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const Info = require("./models/Dados");

app.post("/insert", async (req, res) => {
  const valor = req.body.valor;
  const ncm = req.body.ncm;
  const Ipirate = req.body.Ipirate;
  const ICMSrate = req.body.ICMSrate;
  const PISrate = req.body.PISrate;
  const COFINSrate = req.body.COFINSrate;
  const MVArate = req.body.MVArate;
  const InternalStateRate = req.body.InternalStateRate;

  const dados = new Info({
    valor: valor,
    ncm: ncm,
    Ipirate: Ipirate,
    ICMSrate: ICMSrate,
    PISrate: PISrate,
    COFINSrate: COFINSrate,
    MVArate: MVArate,
    InternalStateRate: InternalStateRate,
  });

  try {
    await dados.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  Info.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const result = await Info.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.listen(3001, () => console.log("server started on port 3001"));
