import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Header from "./Header";

function App() {
  const [VSI, setVSI] = useState(0);
  const [NCM, setNCM] = useState("");
  const [IPI, setIPI] = useState(0);
  const [ICMS, setICMS] = useState(0);
  const [PIS, setPIS] = useState(0);
  const [COFINS, setCOFINS] = useState(0);
  const [MVA, setMVA] = useState(0);
  const [AlqInt, setAlqInt] = useState(0);

  const [Form, setForm] = useState(true);
  const [UsoConsumo, setUsoConsumo] = useState(false);

  const [ValorTemp, SetValorTemp] = useState(true);

  const [ListInfo, setListInfo] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setListInfo(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      valor: VSI,
      ncm: NCM,
      Ipirate: IPI,
      ICMSrate: ICMS,
      PISrate: PIS,
      COFINSrate: COFINS,
      MVArate: MVA,
      InternalStateRate: AlqInt,
    });
    return setForm(false);
  };

  const DeleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
    setForm(true);
    SetValorTemp(true);
  };

  const DeleteItem1 = () => {
    setForm(true);
    SetValorTemp(true);
  };

  const Tipodavenda = () => {
    if (UsoConsumo === false) {
      setUsoConsumo(true);
    } else {
      setUsoConsumo(false);
    }
  };

  const LookData = () => {
    setForm(false);
    SetValorTemp(false);
  };

  return (
    <div className='App'>
      <Header />
      {Form ? (
        <div className='container'>
          <div className='card'>
            <div className='itemForm'>
              <h1 className='dados' onClick={LookData}>
                <u>
                  <i>Cálculos anteriores</i>
                </u>
              </h1>
              <h2>
                <b> Insira os dados</b>
              </h2>
              <h3 className='Tipodavenda' onClick={Tipodavenda}>
                {UsoConsumo ? (
                  <u>
                    <i>Venda Uso e consumo</i>
                  </u>
                ) : (
                  <u>
                    <i>Venda Ind/Revenda</i>
                  </u>
                )}
              </h3>

              <label htmlFor='Vsi'>Valor sem impostos</label>
              <input
                type='text'
                id='Vsi'
                onChange={(event) => {
                  setVSI(event.target.value);
                }}
              />
              <label htmlFor='codeNumber'>NCM do Produto</label>
              <input
                type='text'
                id='codeNumber'
                onChange={(event) => {
                  setNCM(event.target.value);
                }}
              />
              <label htmlFor='Ipirate'>Alíquota IPI</label>
              <input
                type='text'
                id='Ipirate'
                onChange={(event) => {
                  setIPI(event.target.value);
                }}
              />
              <label htmlFor='ICMSrate'>Alíquota ICMS</label>
              <input
                type='text'
                id='ICMSrate'
                onChange={(event) => {
                  setICMS(event.target.value);
                }}
              />
              <label htmlFor='Pisrate'>Alíquota PIS</label>
              <input
                type='text'
                id='Pisrate'
                onChange={(event) => {
                  setPIS(event.target.value);
                }}
              />
              <label htmlFor='Cofinsrate'>Alíquota COFINS</label>
              <input
                type='text'
                id='Cofinsrate'
                onChange={(event) => {
                  setCOFINS(event.target.value);
                }}
              />
              <label htmlFor='MVA'>MVA</label>
              <input
                type='text'
                id='MVA'
                onChange={(event) => {
                  setMVA(event.target.value);
                }}
              />
              <label htmlFor='Int'>Alíq. interna destino</label>
              <input
                type='text'
                id='Int'
                onChange={(event) => {
                  setAlqInt(event.target.value);
                }}
              />
              <div>
                <button className='BTButton' onClick={addToList}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : UsoConsumo ? (
        <div className='container-items'>
          <div className='calculo-item'>
            {ValorTemp ? (
              <div className='item'>
                <div>
                  <h2>NCM: {NCM}</h2>
                  <h3>Valor net: {parseFloat(VSI).toFixed(2)}</h3>
                  <h3>
                    Base Pis/Cofins 90.75%:{" "}
                    {(parseFloat(VSI) / 0.9075).toFixed(2)}
                  </h3>
                  <h3>
                    PIS/Cofins 9.65%:{" "}
                    {(
                      (parseFloat(VSI) / 0.9075) *
                      ((parseFloat(PIS) + parseFloat(COFINS)) / 100)
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    Base ICMS {((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)).toFixed(2)}%:{" "}
                    {(
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    ICMS {ICMS}%:{" "}
                    {(
                      (parseFloat(ICMS) / 100) *
                      (
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)
                    )
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    IPI {IPI}%:{" "}
                    {(
                      (parseFloat(IPI) / 100) *
                      (
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)
                    )
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    Valor total:{" "}
                    {((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)).toFixed(2)}%:{" "}
                    {(
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)+(
                      (parseFloat(IPI) / 100) *
                      (
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)
                    )
                    )
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    IVA-ST {MVA}%:{" "}
                    {(
                      (parseFloat(MVA) / 100) *
                      (parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100) +
                        (parseFloat(IPI) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100)))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    Base ICMS-ST:{" "}
                    {MVA > 0
                      ? (
                          parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                          (parseFloat(IPI) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100)) +
                          (parseFloat(MVA) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)))
                        ).toFixed(2)
                      : 0.0}
                  </h3>
                  <h3>
                    Aliq.interna Dest. {AlqInt > 0 ? AlqInt : 0}%:{" "}
                    {(
                      (parseFloat(AlqInt) / 100) *
                      (parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100) +
                        (parseFloat(IPI) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100)) +
                        (parseFloat(MVA) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                            (parseFloat(IPI) / 100) *
                              (parseFloat(VSI) /
                                0.9075 /
                                ((100 - parseFloat(ICMS)) / 100))))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    ICMS Próprio {AlqInt > 0 ? ICMS : 0}%:{" "}
                    {AlqInt > 0
                      ? (
                          (parseFloat(ICMS) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)
                      : 0}
                  </h3>
                  <h3>
                    ICMS ST:{" "}
                    {AlqInt > 0
                      ? (
                          (parseFloat(AlqInt) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)) +
                              (parseFloat(MVA) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100) +
                                  (parseFloat(IPI) / 100) *
                                    (parseFloat(VSI) /
                                      0.9075 /
                                      ((100 - parseFloat(ICMS)) / 100)))) -
                          (parseFloat(ICMS) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)
                      : 0.0}
                  </h3>
                  <h3>
                    Valor da Nota fiscal:{" "}
                    {AlqInt > 0
                      ? (
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)+(
                      (parseFloat(IPI) / 100) *
                      (
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)
                    )
                    )
                    ).toFixed(2)
                      : (
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)+(
                      (parseFloat(IPI) / 100) *
                      (
                      parseFloat(VSI) /
                      0.9075 /
                      (((100 - parseFloat(ICMS))+(parseFloat(IPI)*((parseFloat(ICMS))) / 100)) / 100)
                    )
                    )
                    ).toFixed(2)}
                  </h3>
                  <button className='BTButton' onClick={DeleteItem1}>
                  Novo cálculo
                  </button>
                </div>
              </div>
            ) : (
              <div className='item'>
                <div>
                  <h2>NCM: 39199090</h2>
                  <h3>Valor net: 123.20</h3>
                  <h3>Base Pis/Cofins 90.75%: 135.76</h3>
                  <h3>PIS/Cofins 9.65%: 12.56</h3>
                  <h3>Base ICMS 82%: 165.56</h3>
                  <h3>ICMS 18%: 29.80</h3>
                  <h3>IPI 11.25%: 18.63</h3>
                  <h3>Valor total: 184.18</h3>
                  <h3>IVA-ST: 0.00</h3>
                  <h3>
                    Base ICMS-ST:{" "}
                    {MVA > 0
                      ? (
                          parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                          (parseFloat(IPI) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100)) +
                          (parseFloat(MVA) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)))
                        ).toFixed(2)
                      : 0.0}
                  </h3>
                  <h3>
                    Aliq.interna Dest. {AlqInt > 0 ? AlqInt : 0}%:{" "}
                    {(
                      (parseFloat(AlqInt) / 100) *
                      (parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100) +
                        (parseFloat(IPI) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100)) +
                        (parseFloat(MVA) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                            (parseFloat(IPI) / 100) *
                              (parseFloat(VSI) /
                                0.9075 /
                                ((100 - parseFloat(ICMS)) / 100))))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    ICMS Próprio {AlqInt > 0 ? ICMS : 0}%:{" "}
                    {AlqInt > 0
                      ? (
                          (parseFloat(ICMS) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)
                      : 0}
                  </h3>
                  <h3>
                    ICMS ST:{" "}
                    {AlqInt > 0
                      ? (
                          (parseFloat(AlqInt) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)) +
                              (parseFloat(MVA) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100) +
                                  (parseFloat(IPI) / 100) *
                                    (parseFloat(VSI) /
                                      0.9075 /
                                      ((100 - parseFloat(ICMS)) / 100)))) -
                          (parseFloat(ICMS) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)
                      : 0.0}
                  </h3>
                  <h3>Valor da Nota fiscal: 184.18</h3>
                  <button className='BTButton' onClick={DeleteItem1}>
                    Novo cálculo
                  </button>
                </div>
              </div>
            )}
          </div>
          {ListInfo.map((val, key) => {
            return (
              <div className='calculo-item' key={val._id}>
                <div className='item'>
                  <div>
                    <h2>NCM: {val.ncm}</h2>
                    <h3>Valor net: {parseFloat(val.valor).toFixed(2)}</h3>
                    <h3>
                      Base PIS/COFINS 90.75%:{" "}
                      {(parseFloat(val.valor) / 0.9075).toFixed(2)}
                    </h3>
                    <h3>
                      PIS/COFINS 9.65%:{" "}
                      {(
                        (parseFloat(val.valor) / 0.9075) *
                        ((parseFloat(val.PISrate) +
                          parseFloat(val.COFINSrate)) /
                          100)
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      Base ICMS {100 - parseFloat(val.ICMSrate)}%:{" "}
                      {(
                        parseFloat(val.valor) /
                        0.9075 /
                        ((100 - parseFloat(val.ICMSrate)) / 100)
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      ICMS {val.ICMSrate}%:{" "}
                      {(
                        (parseFloat(val.ICMSrate) / 100) *
                        (parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      IPI {val.Ipirate}%:{" "}
                      {(
                        (parseFloat(val.Ipirate) / 100) *
                        (parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      Valor total:{" "}
                      {(
                        parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100) +
                        (parseFloat(val.Ipirate) / 100) *
                          (parseFloat(val.valor) /
                            0.9075 /
                            ((100 - parseFloat(val.ICMSrate)) / 100))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      IVA-ST {val.MVArate}%:{" "}
                      {(
                        (parseFloat(val.MVArate) / 100) *
                        (parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100) +
                          (parseFloat(val.Ipirate) / 100) *
                            (parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100)))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      Base ICMS-ST:{" "}
                      {val.MVArate > 0
                        ? (
                            parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100) +
                            (parseFloat(val.Ipirate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100)) +
                            (parseFloat(val.MVArate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100) +
                                (parseFloat(val.Ipirate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100)))
                          ).toFixed(2)
                        : 0.0}
                    </h3>
                    <h3>
                      Aliq.interna Dest.{" "}
                      {val.InternalStateRate > 0 ? val.InternalStateRate : 0}%:{" "}
                      {(
                        (parseFloat(val.InternalStateRate) / 100) *
                        (parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100) +
                          (parseFloat(val.Ipirate) / 100) *
                            (parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100)) +
                          (parseFloat(val.MVArate) / 100) *
                            (parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100) +
                              (parseFloat(val.Ipirate) / 100) *
                                (parseFloat(val.valor) /
                                  0.9075 /
                                  ((100 - parseFloat(val.ICMSrate)) / 100))))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      ICMS Próprio{" "}
                      {val.InternalStateRate > 0 ? val.ICMSrate : 0}%:{" "}
                      {val.InternalStateRate > 0
                        ? (
                            (parseFloat(val.ICMSrate) / 100) *
                            (parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100))
                          ).toFixed(2)
                        : 0}
                    </h3>
                    <h3>
                      ICMS ST:{" "}
                      {val.InternalStateRate > 0
                        ? (
                            (parseFloat(val.InternalStateRate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100) +
                                (parseFloat(val.Ipirate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100)) +
                                (parseFloat(val.MVArate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100) +
                                    (parseFloat(val.Ipirate) / 100) *
                                      (parseFloat(val.valor) /
                                        0.9075 /
                                        ((100 - parseFloat(val.ICMSrate)) /
                                          100)))) -
                            (parseFloat(val.ICMSrate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100))
                          ).toFixed(2)
                        : 0.0}
                    </h3>
                    <h3>
                      Valor da Nota fiscal:{" "}
                      {val.InternalStateRate > 0
                        ? (
                            parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100) +
                            (parseFloat(val.Ipirate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100)) +
                            ((parseFloat(val.InternalStateRate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100) +
                                (parseFloat(val.Ipirate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100)) +
                                (parseFloat(val.MVArate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100) +
                                    (parseFloat(val.Ipirate) / 100) *
                                      (parseFloat(val.valor) /
                                        0.9075 /
                                        ((100 - parseFloat(val.ICMSrate)) /
                                          100)))) -
                              (parseFloat(val.ICMSrate) / 100) *
                                (parseFloat(val.valor) /
                                  0.9075 /
                                  ((100 - parseFloat(val.ICMSrate)) / 100)))
                          ).toFixed(2)
                        : (
                            parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100) +
                            (parseFloat(val.Ipirate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100))
                          ).toFixed(2)}
                    </h3>
                    <button
                      className='BTButton'
                      onClick={() => DeleteItem(val._id)}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='container-items'>
          <div className='calculo-item'>
            {ValorTemp ? (
              <div className='item'>
                <div>
                  <h2>NCM: {NCM}</h2>
                  <h3>Valor net: {parseFloat(VSI).toFixed(2)}</h3>
                  <h3>
                    Base Pis/Cofins 90.75%:{" "}
                    {(parseFloat(VSI) / 0.9075).toFixed(2)}
                  </h3>
                  <h3>
                    PIS/Cofins 9.65%:{" "}
                    {(
                      (parseFloat(VSI) / 0.9075) *
                      ((parseFloat(PIS) + parseFloat(COFINS)) / 100)
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    Base ICMS {100 - parseFloat(ICMS)}%:{" "}
                    {(
                      parseFloat(VSI) /
                      0.9075 /
                      ((100 - parseFloat(ICMS)) / 100)
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    ICMS {ICMS}%:{" "}
                    {(
                      (parseFloat(ICMS) / 100) *
                      (parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    IPI {IPI}%:{" "}
                    {(
                      (parseFloat(IPI) / 100) *
                      (parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    Valor total:{" "}
                    {(
                      parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100) +
                      (parseFloat(IPI) / 100) *
                        (parseFloat(VSI) /
                          0.9075 /
                          ((100 - parseFloat(ICMS)) / 100))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    IVA-ST {MVA}%:{" "}
                    {(
                      (parseFloat(MVA) / 100) *
                      (parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100) +
                        (parseFloat(IPI) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100)))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    Base ICMS-ST:{" "}
                    {MVA > 0
                      ? (
                          parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                          (parseFloat(IPI) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100)) +
                          (parseFloat(MVA) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)))
                        ).toFixed(2)
                      : 0.0}
                  </h3>
                  <h3>
                    Aliq.interna Dest. {AlqInt > 0 ? AlqInt : 0}%:{" "}
                    {(
                      (parseFloat(AlqInt) / 100) *
                      (parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100) +
                        (parseFloat(IPI) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100)) +
                        (parseFloat(MVA) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                            (parseFloat(IPI) / 100) *
                              (parseFloat(VSI) /
                                0.9075 /
                                ((100 - parseFloat(ICMS)) / 100))))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    ICMS Próprio {AlqInt > 0 ? ICMS : 0}%:{" "}
                    {AlqInt > 0
                      ? (
                          (parseFloat(ICMS) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)
                      : 0}
                  </h3>
                  <h3>
                    ICMS ST:{" "}
                    {AlqInt > 0
                      ? (
                          (parseFloat(AlqInt) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)) +
                              (parseFloat(MVA) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100) +
                                  (parseFloat(IPI) / 100) *
                                    (parseFloat(VSI) /
                                      0.9075 /
                                      ((100 - parseFloat(ICMS)) / 100)))) -
                          (parseFloat(ICMS) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)
                      : 0.0}
                  </h3>
                  <h3>
                    Valor da Nota fiscal:{" "}
                    {AlqInt > 0
                      ? (
                          parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                          (parseFloat(IPI) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100)) +
                          ((parseFloat(AlqInt) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)) +
                              (parseFloat(MVA) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100) +
                                  (parseFloat(IPI) / 100) *
                                    (parseFloat(VSI) /
                                      0.9075 /
                                      ((100 - parseFloat(ICMS)) / 100)))) -
                            (parseFloat(ICMS) / 100) *
                              (parseFloat(VSI) /
                                0.9075 /
                                ((100 - parseFloat(ICMS)) / 100)))
                        ).toFixed(2)
                      : (
                          parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                          (parseFloat(IPI) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)}
                  </h3>
                  <button className='BTButton' onClick={DeleteItem1}>
                  Novo cálculo
                  </button>
                </div>
              </div>
            ) : (
              <div className='item'>
                <div>
                  <h2>NCM: 39199090</h2>
                  <h3>Valor net: 123.20</h3>
                  <h3>Base Pis/Cofins 90.75%: 135.76</h3>
                  <h3>PIS/Cofins 9.65%: 12.56</h3>
                  <h3>Base ICMS 82%: 165.56</h3>
                  <h3>ICMS 18%: 29.80</h3>
                  <h3>IPI 11.25%: 18.63</h3>
                  <h3>Valor total: 184.18</h3>
                  <h3>IVA-ST: 0.00</h3>
                  <h3>
                    Base ICMS-ST:{" "}
                    {MVA > 0
                      ? (
                          parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                          (parseFloat(IPI) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100)) +
                          (parseFloat(MVA) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)))
                        ).toFixed(2)
                      : 0.0}
                  </h3>
                  <h3>
                    Aliq.interna Dest. {AlqInt > 0 ? AlqInt : 0}%:{" "}
                    {(
                      (parseFloat(AlqInt) / 100) *
                      (parseFloat(VSI) /
                        0.9075 /
                        ((100 - parseFloat(ICMS)) / 100) +
                        (parseFloat(IPI) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100)) +
                        (parseFloat(MVA) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100) +
                            (parseFloat(IPI) / 100) *
                              (parseFloat(VSI) /
                                0.9075 /
                                ((100 - parseFloat(ICMS)) / 100))))
                    ).toFixed(2)}
                  </h3>
                  <h3>
                    ICMS Próprio {AlqInt > 0 ? ICMS : 0}%:{" "}
                    {AlqInt > 0
                      ? (
                          (parseFloat(ICMS) / 100) *
                          (parseFloat(VSI) /
                            0.9075 /
                            ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)
                      : 0}
                  </h3>
                  <h3>
                    ICMS ST:{" "}
                    {AlqInt > 0
                      ? (
                          (parseFloat(AlqInt) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100) +
                              (parseFloat(IPI) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100)) +
                              (parseFloat(MVA) / 100) *
                                (parseFloat(VSI) /
                                  0.9075 /
                                  ((100 - parseFloat(ICMS)) / 100) +
                                  (parseFloat(IPI) / 100) *
                                    (parseFloat(VSI) /
                                      0.9075 /
                                      ((100 - parseFloat(ICMS)) / 100)))) -
                          (parseFloat(ICMS) / 100) *
                            (parseFloat(VSI) /
                              0.9075 /
                              ((100 - parseFloat(ICMS)) / 100))
                        ).toFixed(2)
                      : 0.0}
                  </h3>
                  <h3>Valor da Nota fiscal: 184.18</h3>
                  <button className='BTButton' onClick={DeleteItem1}>
                  Novo cálculo
                  </button>
                </div>
              </div>
            )}
          </div>
          {ListInfo.map((val, key) => {
            return (
              <div className='calculo-item' key={val._id}>
                <div className='item'>
                  <div>
                    <h2>NCM: {val.ncm}</h2>
                    <h3>Valor net: {parseFloat(val.valor).toFixed(2)}</h3>
                    <h3>
                      Base PIS/COFINS 90.75%:{" "}
                      {(parseFloat(val.valor) / 0.9075).toFixed(2)}
                    </h3>
                    <h3>
                      PIS/COFINS 9.65%:{" "}
                      {(
                        (parseFloat(val.valor) / 0.9075) *
                        ((parseFloat(val.PISrate) +
                          parseFloat(val.COFINSrate)) /
                          100)
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      Base ICMS {100 - parseFloat(val.ICMSrate)}%:{" "}
                      {(
                        parseFloat(val.valor) /
                        0.9075 /
                        ((100 - parseFloat(val.ICMSrate)) / 100)
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      ICMS {val.ICMSrate}%:{" "}
                      {(
                        (parseFloat(val.ICMSrate) / 100) *
                        (parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      IPI {val.Ipirate}%:{" "}
                      {(
                        (parseFloat(val.Ipirate) / 100) *
                        (parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      Valor total:{" "}
                      {(
                        parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100) +
                        (parseFloat(val.Ipirate) / 100) *
                          (parseFloat(val.valor) /
                            0.9075 /
                            ((100 - parseFloat(val.ICMSrate)) / 100))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      IVA-ST {val.MVArate}%:{" "}
                      {(
                        (parseFloat(val.MVArate) / 100) *
                        (parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100) +
                          (parseFloat(val.Ipirate) / 100) *
                            (parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100)))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      Base ICMS-ST:{" "}
                      {val.MVArate > 0
                        ? (
                            parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100) +
                            (parseFloat(val.Ipirate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100)) +
                            (parseFloat(val.MVArate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100) +
                                (parseFloat(val.Ipirate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100)))
                          ).toFixed(2)
                        : 0.0}
                    </h3>
                    <h3>
                      Aliq.interna Dest.{" "}
                      {val.InternalStateRate > 0 ? val.InternalStateRate : 0}%:{" "}
                      {(
                        (parseFloat(val.InternalStateRate) / 100) *
                        (parseFloat(val.valor) /
                          0.9075 /
                          ((100 - parseFloat(val.ICMSrate)) / 100) +
                          (parseFloat(val.Ipirate) / 100) *
                            (parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100)) +
                          (parseFloat(val.MVArate) / 100) *
                            (parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100) +
                              (parseFloat(val.Ipirate) / 100) *
                                (parseFloat(val.valor) /
                                  0.9075 /
                                  ((100 - parseFloat(val.ICMSrate)) / 100))))
                      ).toFixed(2)}
                    </h3>
                    <h3>
                      ICMS Próprio{" "}
                      {val.InternalStateRate > 0 ? val.ICMSrate : 0}%:{" "}
                      {val.InternalStateRate > 0
                        ? (
                            (parseFloat(val.ICMSrate) / 100) *
                            (parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100))
                          ).toFixed(2)
                        : 0}
                    </h3>
                    <h3>
                      ICMS ST:{" "}
                      {val.InternalStateRate > 0
                        ? (
                            (parseFloat(val.InternalStateRate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100) +
                                (parseFloat(val.Ipirate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100)) +
                                (parseFloat(val.MVArate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100) +
                                    (parseFloat(val.Ipirate) / 100) *
                                      (parseFloat(val.valor) /
                                        0.9075 /
                                        ((100 - parseFloat(val.ICMSrate)) /
                                          100)))) -
                            (parseFloat(val.ICMSrate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100))
                          ).toFixed(2)
                        : 0.0}
                    </h3>
                    <h3>
                      Valor da Nota fiscal:{" "}
                      {val.InternalStateRate > 0
                        ? (
                            parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100) +
                            (parseFloat(val.Ipirate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100)) +
                            ((parseFloat(val.InternalStateRate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100) +
                                (parseFloat(val.Ipirate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100)) +
                                (parseFloat(val.MVArate) / 100) *
                                  (parseFloat(val.valor) /
                                    0.9075 /
                                    ((100 - parseFloat(val.ICMSrate)) / 100) +
                                    (parseFloat(val.Ipirate) / 100) *
                                      (parseFloat(val.valor) /
                                        0.9075 /
                                        ((100 - parseFloat(val.ICMSrate)) /
                                          100)))) -
                              (parseFloat(val.ICMSrate) / 100) *
                                (parseFloat(val.valor) /
                                  0.9075 /
                                  ((100 - parseFloat(val.ICMSrate)) / 100)))
                          ).toFixed(2)
                        : (
                            parseFloat(val.valor) /
                              0.9075 /
                              ((100 - parseFloat(val.ICMSrate)) / 100) +
                            (parseFloat(val.Ipirate) / 100) *
                              (parseFloat(val.valor) /
                                0.9075 /
                                ((100 - parseFloat(val.ICMSrate)) / 100))
                          ).toFixed(2)}
                    </h3>
                    <button
                      className='BTButton'
                      onClick={() => DeleteItem(val._id)}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
