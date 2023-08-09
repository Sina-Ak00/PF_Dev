import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: "1rem",
    },
  },
}));

export function useForm(initailValues) {
  const [values, setValues] = useState(initailValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  // const handleImage = (id,name, value) => {
  //   setValues({
  //     ...values,
  //     [id]: value
  //   })
  // };

  const resetForm = () => {
    setValues(initailValues);
  };

  return {
    values,
    setValues,
    handleInputChange,
    resetForm,
  };
}

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} {...other}>
      {props.children}
    </form>
  );
}
