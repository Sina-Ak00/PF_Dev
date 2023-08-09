import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select as MuiSelect,
  } from "@mui/material";
  import React from "react";
  
  export default function Select(props) {
    const { id,name, label, value, error = null, onChange, options, hich,size } = props;
  
    return (
      <FormControl variant="outlined" {...(error && { error: true })} size={size}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect id={id} label={label} name={name} value={value} onChange={onChange}>
          {hich === true && <MenuItem value="">هیچکدام</MenuItem>}
          {options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </MuiSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
  