import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useGetPayment(id) {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");

  useEffect(() => {
    const getPayment = async () => {
      await getDoc(doc(db, "payments", id))
        .then((d) => setPayment(d))
        .catch(() => navigate("/payments-list?e=true"));
    };
    getPayment();
  }, [navigate, id]);

  return [payment];
}
