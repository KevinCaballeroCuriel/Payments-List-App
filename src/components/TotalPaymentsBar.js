import React from "react";
import styled from "styled-components";
import theme from "../constants/theme";
import { convertToMoney } from "../functions/convertToMoney";
import { useTotalPayment } from "../contexts/TotalPaymentsPerMonthContext";

const TotalBar = styled.div`
  background: ${theme.green};
  font-size: 1.25rem; /* 20px */
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 0.62rem 2.25rem; /* 10px 40px */
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 31.25rem) {
    /* 500px */
    flex-direction: column;
    font-size: 14px;
  }
`;

export function TotalPaymentsBar() {
  const { total } = useTotalPayment();

  return (
    <TotalBar>
      <p>Total Gastado en el Mes:</p>
      <p>{convertToMoney(total > 0 ? total : 0)}</p>
    </TotalBar>
  );
}
