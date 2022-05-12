import React from "react";
import { Helmet } from "react-helmet";
import { Button, LogOutButton } from "./elements";
import {
  ContainerButtons,
  ContainerHeader,
  Header,
  HeaderTitle,
} from "./elements/header";
import { PaymentForm, TotalPaymentsBar } from "./components";

function App() {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
      <Header>
        <ContainerHeader>
          <HeaderTitle>Agregar Gasto</HeaderTitle>
          <ContainerButtons>
            <Button to="/payments-per-category">Categorias</Button>
            <Button to="/payments-list">Lista de gastos</Button>
            <LogOutButton />
          </ContainerButtons>
        </ContainerHeader>
      </Header>
      <PaymentForm />
      <TotalPaymentsBar />
    </>
  );
}

export default App;
