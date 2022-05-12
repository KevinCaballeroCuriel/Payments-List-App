import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export function addPayment({ category, description, value, date, uidUser }) {
  return addDoc(collection(db, "payments"), {
    category: category,
    description: description,
    value: Number(value),
    date: date,
    uidUser: uidUser,
  });
}
