import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles=makeStyles({
  root:{
    margin:"1rem",
  },
  label:{
    textTransform:'none',
  }
})

export default function MuiButton(props) {
    const {text,size,color,variant,onClick, ...other}=props;

  const classes=useStyles();

  return (
    <Button
    classes={{root:classes.root,label:classes.label}}
    size={size || "large"}
    color={color || "primary"}
    variant={variant || "contained"}
    onClick={onClick}
    {...other}
    >{text}</Button>
  )
}
