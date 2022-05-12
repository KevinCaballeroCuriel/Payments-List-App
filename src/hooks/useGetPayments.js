import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebaseConfig";

export function useGetPayments() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [lastPayment, setLastPayment] = useState(null);
  const [loadingMorePayments, setLoadingMorePayments] = useState(false);

  const getMorePayments = () => {
    const firebaseQuery = query(
      collection(db, "payments"),
      where("uidUser", "==", user.uid),
      orderBy("date", "desc"),
      limit(10),
      startAfter(lastPayment)
    );

    onSnapshot(
      firebaseQuery,
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          setLastPayment(snapshot.docs[snapshot.docs.length - 1]);

          setPayments(
            payments.concat(
              snapshot.docs.map((payment) => {
                return { ...payment.data(), id: payment.id };
              })
            )
          );
        } else {
          setLoadingMorePayments(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    const firebaseQuery = query(
      collection(db, "payments"),
      where("uidUser", "==", user.uid),
      orderBy("date", "desc"),
      limit(10)
    );

    const unsuscribe = onSnapshot(firebaseQuery, (snapshot) => {
      if (snapshot.docs.length > 0) {
        setLastPayment(snapshot.docs[snapshot.docs.length - 1]);
        setLoadingMorePayments(true);
      } else {
        setLoadingMorePayments(false);
      }

      setPayments(
        snapshot.docs.map((payment) => {
          return { ...payment.data(), id: payment.id };
        })
      );
    });

    return unsuscribe;
  }, [user]);

  return [payments, getMorePayments, loadingMorePayments];
}
