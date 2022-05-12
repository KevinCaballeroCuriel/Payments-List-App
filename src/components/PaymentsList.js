import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ReturnButton, Button, Alert } from "../elements";
import { Header, HeaderTitle } from "../elements/header";
import { useGetPayments } from "../hooks";
import { TotalPaymentsBar } from "./TotalPaymentsBar";
import {
  List,
  ListElement,
  Category,
  Description,
  Value,
  Date,
  ContainerButtons,
  ActionButton,
  ButtonLoadMore,
  ContainerCentralButton,
  ContainerSubtitle,
  Subtitle,
} from "../elements/list";
import { CategoryIcon } from "../elements/CategoryIcon";
import { convertToMoney } from "../functions/convertToMoney";
import { ReactComponent as EditIcon } from "../images/edit.svg";
import { ReactComponent as DeleteIcon } from "../images/delete.svg";
import { Link } from "react-router-dom";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import { deletePayment } from "../firebase/deletePayment";

export function PaymentsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [payments, getMorePayments, loadingMorePayments] = useGetPayments();
  const error = searchParams.get("e");
  const [alertState, setAlertState] = useState(false);

  const showAlert = () => setAlertState(true);

  useEffect(() => {
    if (error) {
      showAlert();
      setSearchParams({});
    }
  }, [error, setSearchParams]);

  const dateFormat = (date) => {
    return format(fromUnixTime(date), "dd 'de' MMMM 'de' yyyy", {
      locale: es,
    }).toUpperCase();
  };

  const dateIsEqual = (payments, index, payment) => {
    if (index !== 0) {
      const actualDate = dateFormat(payment.date);
      const previousDate = dateFormat(payments[index - 1].date);

      if (actualDate === previousDate) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <ReturnButton />
        <HeaderTitle>Lista de Gastos</HeaderTitle>
      </Header>

      <List>
        {payments.map((payment, index) => {
          return (
            <div key={payment.id}>
              {!dateIsEqual(payments, index, payment) && (
                <Date>{dateFormat(payment.date)}</Date>
              )}
              <ListElement key={payment.id}>
                <Category>
                  <CategoryIcon id={payment.category} />
                  {payment.category}
                </Category>

                <Description>{payment.description}</Description>
                <Value>{convertToMoney(payment.value)}</Value>

                <ContainerButtons>
                  <ActionButton as={Link} to={`/payment-edit/${payment.id}`}>
                    <EditIcon />
                  </ActionButton>
                  <ActionButton onClick={() => deletePayment(payment.id)}>
                    <DeleteIcon />
                  </ActionButton>
                </ContainerButtons>
              </ListElement>
            </div>
          );
        })}

        {loadingMorePayments && payments.length % 10 === 0 && (
          <ContainerCentralButton>
            <ButtonLoadMore onClick={() => getMorePayments()}>
              Cargar Más
            </ButtonLoadMore>
          </ContainerCentralButton>
        )}

        {payments.length === 0 && (
          <ContainerSubtitle>
            <Subtitle>No hay gastos por mostrar</Subtitle>
            <Button as={Link} to="/">
              Agregar Gasto
            </Button>
          </ContainerSubtitle>
        )}
      </List>

      <TotalPaymentsBar />

      <Alert
        type="error"
        msg={"No tienes permiso para acceder a ese gasto"}
        alertState={alertState}
        setAlertState={setAlertState}
      />
    </>
  );
}
