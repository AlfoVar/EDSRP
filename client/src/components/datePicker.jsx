import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerValue = ({setDateValue}) => {
  const [value, setValue] = React.useState(dayjs("2024-02-01"))
  setDateValue(value);
  //console.log(value.format('YYYY-MM-DD') > dayjs().format('YYYY-MM-DD') );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Filtro por fecha"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePickerValue;
