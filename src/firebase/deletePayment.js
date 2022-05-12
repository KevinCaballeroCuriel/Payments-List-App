import { db } from "./firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const deletePayment = async (id) => {
  await deleteDoc(doc(db, "payments", id));
};
