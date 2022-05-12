import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "../elements";
import {
  ContainerFilters,
  Form,
  Input,
  BigInput,
  ContainerButton,
} from "../elements/form";
import { ReactComponent as PlusIcon } from "../images/plus.svg";
import { DatePicker, SelectCategory } from "../components";
import fromUnixTime from "date-fns/fromUnixTime";
import getUnixTime from "date-fns/getUnixTime";
import { addPayment } from "../firebase/addPayment";
import { editPayment } from "../firebase/editPayment";
import { useAuth } from "../contexts/AuthContext";

export function PaymentForm({ payment }) {
  const navigate = useNavigate();
  const initialFormDataValues = { description: "", value: "" };
  const [formData, setFormData] = useState(initialFormDataValues);
  const [category, setCategory] = useState("Hogar");
  const [date, setDate] = useState(new Date());
  const [alertState, setAlertState] = useState(false);
  const [alertProps, setAlertProps] = useState({ type: "", msg: "" });
  const { user } = useAuth();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "value") {
      setFormData({ ...formData, [name]: value.replace(/[^0-9.]/g, "") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (payment) {
      if (payment.data().uidUser === user.uid) {
        let paymentDescription = payment.data().description;
        let paymentValue = payment.data().value.toString();

        if (paymentValue.indexOf(".") === -1) {
          paymentValue = paymentValue + ".00";
        }
        if (
          paymentValue.length - paymentValue.indexOf(".") === 2 &&
          paymentValue.indexOf(".") !== -1
        ) {
          paymentValue = paymentValue + "0";
        }

        setFormData({
          description: paymentDescription,
          value: paymentValue,
        });
        setCategory(payment.data().category);
        setDate(fromUnixTime(payment.data().date));
      } else {
        navigate("/");
      }
    }
  }, [payment, user, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let ammount = parseFloat(formData.value).toFixed(2);

    if (formData.description !== "" && formData.value !== "") {
      if (ammount) {
        if (payment) {
          editPayment({
            id: payment.id,
            category: category,
            description: formData.description,
            value: ammount,
            date: getUnixTime(date),
          })
            .then(() => {
              setAlertState(true);
              setAlertProps({
                type: "success",
                msg: "Gasto modificado con exito",
              });
              setTimeout(() => {
                navigate("/payments-list");
              }, 2000);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setAlertState(true);
              setAlertProps({
                type: "error",
                msg: errorCode + " - " + errorMessage,
              });
            });
        } else {
          addPayment({
            category: category,
            description: formData.description,
            value: ammount,
            date: getUnixTime(date),
            uidUser: user.uid,
          })
            .then(() => {
              setFormData(initialFormDataValues);
              setCategory("Hogar");
              setDate(new Date());
              setAlertState(true);
              setAlertProps({
                type: "success",
                msg: "Gasto agregado con exito",
              });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setAlertState(true);
              setAlertProps({
                type: "error",
                msg: errorCode + " - " + errorMessage,
              });
            });
        }
      } else {
        setAlertState(true);
        setAlertProps({
          type: "error",
          msg: "Favor de ingresar una cantidad valida (maximo 2 decimales)",
        });
      }
    } else {
      setAlertState(true);
      setAlertProps({
        type: "error",
        msg: "Favor de completar los 2 campos con valores validos",
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <ContainerFilters>
          <SelectCategory category={category} setCategory={setCategory} />
          <DatePicker date={date} setDate={setDate} />
        </ContainerFilters>
        <div>
          <Input
            type="text"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleOnChange}
          />
          <BigInput
            type="text"
            name="value"
            placeholder="$0.00"
            value={formData.value}
            onChange={handleOnChange}
            onBlur={(e) => {
              if (
                e.target.value.length - e.target.value.indexOf(".") === 2 &&
                e.target.value.indexOf(".") !== -1
              ) {
                e.target.value = e.target.value + "0";
              }
              if (e.target.value.length === 0) {
                e.target.value = e.target.value + "0.00";
              }
              if (e.target.value.indexOf(".") === -1) {
                e.target.value = e.target.value + ".00";
              }
              handleOnChange(e);
            }}
            onInput={(e) => {
              let dec = e.target.value.indexOf(".");
              let tooLong = e.target.value.length > dec + 3;
              let invalidNum = isNaN(parseFloat(e.target.value));
              if ((dec >= 0 && tooLong) || invalidNum) {
                e.target.value = e.target.value.slice(0, -1);
              }
            }}
          />
        </div>
        <ContainerButton>
          <Button as="button" primary withIcon type="submit">
            {payment ? "Editar Gasto" : "Agregar Gasto"}
            <PlusIcon />
          </Button>
        </ContainerButton>
      </Form>
      <Alert
        type={alertProps.type}
        msg={alertProps.msg}
        alertState={alertState}
        setAlertState={setAlertState}
      />
    </>
  );
}
