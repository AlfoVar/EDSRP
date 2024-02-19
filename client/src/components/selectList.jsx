import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectList({
    listValue,
    value,
    setValue
}) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Islero</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="Islero"
        onChange={handleChange}
      >
        {
            listValue.map((item) => {
                return <MenuItem value={item._id}>{item.nameGrocer}</MenuItem>
            })
        }
      </Select>
    </FormControl>
  );
}