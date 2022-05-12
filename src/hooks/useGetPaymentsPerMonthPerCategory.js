import { useEffect, useState } from "react";
import { useGetPaymentsPerMonth } from "./useGetPaymentsPerMonth";

export function useGetPaymentsPerMonthPerCategory() {
  const [paymentsPerCategory, setPaymentsPerCategory] = useState([]);
  const payments = useGetPaymentsPerMonth();

  useEffect(() => {
    const sumPayments = payments.reduce(
      (resultObject, actualObject) => {
        const actualCategory = actualObject.category;
        const actualValue = actualObject.value;

        resultObject[actualCategory] += actualValue;

        return resultObject;
      },
      {
        Comida: 0,
        "Cuentas y pagos": 0,
        Hogar: 0,
        Transporte: 0,
        Ropa: 0,
        "Salud e Higiene": 0,
        Compras: 0,
        Diversion: 0,
      }
    );

    setPaymentsPerCategory(
      Object.keys(sumPayments).map((element) => {
        return { category: element, value: sumPayments[element] };
      })
    );
  }, [payments, setPaymentsPerCategory]);

  return paymentsPerCategory;
}
