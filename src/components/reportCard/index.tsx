import { LoaderComp } from "ui/loader";
import { usePetData, useSendPetReport } from "hooks/hooks";
import React, { useState } from "react";
import { MainButton } from "ui/buttons";
import { MyText } from "ui/text";
import { MyTextArea } from "ui/text-area";
import { MyTextInput } from "ui/text-field";
import css from "./index.css";
import closeButtonImg from "images/closeButton.svg";

export function ReportCard(props) {
  //flag que sirve para mostrar el componente loader
  const [loader, setLoader] = useState(false);
  const petData = usePetData();
  const { sendReport } = useSendPetReport();

  async function handleSubmit(e) {
    setLoader(true);
    e.preventDefault();
    const target = e.target;
    const report = {
      petId: petData?.id,
      name: target.name.value,
      phone: target.phone.value,
      message: target.message.value,
    };
    //mapeo la data del objeto
    const mappedData = Object.keys(report).map((key) => {
      return report[key];
    });
    //checkeo que cada key tenga un valor
    const checked = mappedData.every((value) => value);

    //si todas las key tienen valores puedo enviar el reporte
    //si no mando la alerta de "todos los campos son obligatorios"
    if (checked) {
      const res = await sendReport(report);
      if (res) {
        alert("reporte enviado");
        props.setTrigger(false);
      } else {
        alert("algo salio mal, intenta mas tarde");
      }
      setLoader(false);
    } else {
      alert("todos los campos son obligatorios");
      setLoader(false);
    }
  }
  //trigger es un flag para ocultar o mostrar la tarjeta de reporte
  return props.trigger ? (
    <div className={css.root}>
      {
        //loader es un flag para mostrar el componente de carga
        loader ? (
          <LoaderComp></LoaderComp>
        ) : (
          <div>
            <div
              className={css.containerCloseButton}
              onClick={() => props.setTrigger(false)}
            >
              <img src={closeButtonImg} alt="" />
            </div>
            <div>
              <MyText type="title"> Reportar info de {petData.name}</MyText>
            </div>

            <form className={css.reportForm} onSubmit={handleSubmit}>
              <MyTextInput
                label="Tu nombre"
                type="text"
                name="name"
              ></MyTextInput>
              <MyTextInput
                label="Tu teléfono"
                type="text"
                name="phone"
              ></MyTextInput>
              <div className={css.textArea}>
                <MyTextArea
                  label="¿Dónde lo viste?"
                  name="message"
                ></MyTextArea>
              </div>
              <MainButton color="accept">Enviar</MainButton>
            </form>
          </div>
        )
      }
    </div>
  ) : null;
}
