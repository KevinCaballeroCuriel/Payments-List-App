import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

export function useGetPaymentsPerMonth() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const startMonth = getUnixTime(startOfMonth(new Date()));
  const endMonth = getUnixTime(endOfMonth(new Date()));

  useEffect(() => {
    if (user) {
      const firebaseQuery = query(
        collection(db, "payments"),
        where("uidUser", "==", user.uid),
        where("date", ">=", startMonth),
        where("date", "<=", endMonth),
        orderBy("date", "desc")
      );

      const unsuscribe = onSnapshot(
        firebaseQuery,
        (snapshot) => {
          setPayments(
            snapshot.docs.map((payment) => {
              return { ...payment.data(), id: payment.id };
            })
          );
        },
        (error) => {
          console.log(error);
        }
      );

      return unsuscribe;
    }
  }, [user, startMonth, endMonth]);

  return payments;
}
