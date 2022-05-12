import React, { useContext, useEffect, useState } from "react";
import { useGetPaymentsPerMonth } from "../hooks/useGetPaymentsPerMonth";

const TotalPaymentsContext = React.createContext();

const useTotalPayment = () => {
  return useContext(TotalPaymentsContext);
};

const TotalPaymentsProvider = (props) => {
  const { children } = props;
  const [total, setTotal] = useState(0);
  const payments = useGetPaymentsPerMonth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let totalAmount = 0;
    payments.forEach((payment) => {
      totalAmount += payment.value;
    });
    setTotal(totalAmount);
    setLoading(false);
  }, [payments, loading]);

  return (
    <TotalPaymentsContext.Provider value={{ total: total }}>
      {!loading && children}
    </TotalPaymentsContext.Provider>
  );
};

export { TotalPaymentsContext, TotalPaymentsProvider, useTotalPayment };
