import React from "react";

import { ReactComponent as FoodIcon } from "../images/cat_food.svg";
import { ReactComponent as ShoppingIcon } from "../images/cat_shopping.svg";
import { ReactComponent as BillsPaymentsIcon } from "../images/cat_bills-payments.svg";
import { ReactComponent as FunnyIcon } from "../images/cat_funny.svg";
import { ReactComponent as HomeIcon } from "../images/cat_home.svg";
import { ReactComponent as ClothesIcon } from "../images/cat_clothes.svg";
import { ReactComponent as HealthIcon } from "../images/cat_health.svg";
import { ReactComponent as TransportIcon } from "../images/cat_transport.svg";

export const CategoryIcon = ({ id }) => {
  switch (id) {
    case "food":
      return <FoodIcon />;
    case "Comida":
      return <FoodIcon />;
    case "shopping":
      return <ShoppingIcon />;
    case "Compras":
      return <ShoppingIcon />;
    case "bills and payments":
      return <BillsPaymentsIcon />;
    case "Cuentas y pagos":
      return <BillsPaymentsIcon />;
    case "funny":
      return <FunnyIcon />;
    case "Diversion":
      return <FunnyIcon />;
    case "home":
      return <HomeIcon />;
    case "Hogar":
      return <HomeIcon />;
    case "hogar":
      return <HomeIcon />;
    case "clothes":
      return <ClothesIcon />;
    case "Ropa":
      return <ClothesIcon />;
    case "health":
      return <HealthIcon />;
    case "Salud e Higiene":
      return <HealthIcon />;
    case "transport":
      return <TransportIcon />;
    case "Transporte":
      return <TransportIcon />;
    default:
      break;
  }
};
