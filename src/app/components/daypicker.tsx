import { es } from "react-day-picker/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import {  dateAtom } from "./atoms/atoms";
import { useAtom } from "jotai";


export function DatePicker() {
    const [dateInfo, setDateInfo] = useAtom(dateAtom)


  return (
    <DayPicker
      animate
      mode="single"
      selected={dateInfo}
      onSelect={setDateInfo}
      locale={es}
    />
  );
}