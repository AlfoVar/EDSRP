import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

export default function SelectList({ listValue, value, setValue, hasError }) {

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" error={hasError}>
      <InputLabel id="demo-select-small-label">Islero</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="Islero"
        onChange={handleChange}
      >
        {listValue.map((item) => {
          return (
            <MenuItem key={item._id} value={item._id}>
              {item.nameGrocer}
            </MenuItem>
          );
        })}
      </Select>
      {hasError && <FormHelperText>Este campo es requerido</FormHelperText>}
    </FormControl>
  );
}
