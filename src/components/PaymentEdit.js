import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Header, HeaderTitle } from "../elements/header";
import { ReturnButton } from "../elements";
import { PaymentForm } from "./PaymentForm";
import { useGetPayment } from "../hooks";
import { TotalPaymentsBar } from "./TotalPaymentsBar";

export function PaymentEdit() {
  const { id } = useParams();
  const [payment] = useGetPayment(id);

  if (!payment) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>

      <Header>
        <ReturnButton route="/payments-list" />
        <HeaderTitle>Editar Gasto</HeaderTitle>
      </Header>

      <PaymentForm payment={payment} />

      <TotalPaymentsBar />
    </>
  );
}
