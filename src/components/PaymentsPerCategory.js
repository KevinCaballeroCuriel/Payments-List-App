import React from "react";
import { Helmet } from "react-helmet";
import { CategoryIcon, ReturnButton } from "../elements";
import { Header, HeaderTitle } from "../elements/header";
import {
  CategoryList,
  CategoryListElement,
  Category,
  Value,
} from "../elements/list";
import { useGetPaymentsPerMonthPerCategory } from "../hooks/useGetPaymentsPerMonthPerCategory";
import { TotalPaymentsBar } from "./TotalPaymentsBar";
import { convertToMoney } from "../functions/convertToMoney";

export function PaymentsPerCategory() {
  const paymentsPerCategory = useGetPaymentsPerMonthPerCategory();

  return (
    <>
      <Helmet>
        <title>Gastos por Categoria</title>
      </Helmet>
      <Header>
        <ReturnButton />
        <HeaderTitle>Gasto por Categoria</HeaderTitle>
      </Header>

      <CategoryList>
        {paymentsPerCategory.map((payment, index) => {
          return (
            <CategoryListElement key={index}>
              <Category>
                <CategoryIcon id={payment.category} />
                {payment.category}
              </Category>
              <Value>{convertToMoney(payment.value)}</Value>
            </CategoryListElement>
          );
        })}
      </CategoryList>

      <TotalPaymentsBar />
    </>
  );
}
