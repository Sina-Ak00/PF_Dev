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
          {hich === true && <MenuItem value="هیچکدام">هیچکدام</MenuItem>}
          {options.length && options?.map((item) => (
            <MenuItem key={item.id} value={item.IName}>
              {item.IName}
            </MenuItem>
          ))}
        </MuiSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
  