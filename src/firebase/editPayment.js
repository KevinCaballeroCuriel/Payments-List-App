import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export async function editPayment({ id, category, description, value, date }) {
  const document = doc(db, "payments", id);

  return await updateDoc(document, {
    category: category,
    description: description,
    value: Number(value),
    date: date,
  });
}
