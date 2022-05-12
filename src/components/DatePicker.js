import React from "react";
import styled from "styled-components";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import theme from "../constants/theme";

import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import { es } from "date-fns/locale";

function parseDate(str, format) {
  const parsed = dateFnsParse(str, format, new Date(), { locale: es });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format) {
  return dateFnsFormat(date, format, { locale: es });
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const days_week_short = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

const ContainerInput = styled.div`
  input {
    font-family: "Work Sans", sans-serif;
    box-sizing: border-box;
    background: ${theme.primarySnowGrey};
    border: none;
    cursor: pointer;
    border-radius: 0.625rem; /* 10px */
    height: 5rem; /* 80px */
    width: 100%;
    padding: 0 1.25rem; /* 20px */
    font-size: 1.5rem; /* 24px */
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    margin-right: 4rem;
  }

  @media (max-width: 60rem) {
    /* 950px */
    & > * {
      width: 100%;
    }
  }
`;

export const DatePicker = (props) => {
  const { date, setDate } = props;
  return (
    <ContainerInput>
      <DayPickerInput
        value={date}
        onDayChange={(day) => setDate(day)}
        placeholder="Seleccione la fecha"
        format="dd 'de' MMMM 'de' yyyy"
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{
          months: months,
          weekdaysShort: days_week_short,
        }}
      />
    </ContainerInput>
  );
};
