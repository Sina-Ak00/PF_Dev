import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MuiButton from "../controls/MuiButton";

// import ImageUploader from "../shared/formElements/ImageUploader";
import { Form, useForm } from "../controls/useForm";

import "./createFood.css";

const initailValues = {
  id: 0,
  IName: "",
  IValue: 0,
  ITotal: 0,
};

const useStyles = makeStyles((theme) => ({
  text: {
    maxWidth: "100%",
  },
  righted: {
    margin: "1rem",
    textAlign: "end",
    alignContent: "end",
  },
}));

const CreateInventory = (props) => {
  const classes = useStyles();
  const { addOrEdit, recordForEdit } = props;

  const { values, setValues, handleInputChange, resetForm } =
    useForm(initailValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values, resetForm);
  };

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container className={classes.text}>
        <TextField
          id="form-texts"
          variant="outlined"
          label="نام محصول/کالا"
          name="IName"
          value={values.IName}
          onChange={handleInputChange}
        />
        <TextField
          id="form-texts-toman"
          variant="outlined"
          value={values.IValue}
          onChange={handleInputChange}
          type="number"
          name="IValue"
          label="ارزش کلی"
          style={{ borderRadius: "50", backgroundColor: "white" }}
          InputProps={{
            inputMode: "numeric",
            pattern: "[,]*",
            inputProps: { min: 0 },
            endAdornment: (
              <InputAdornment position="start">تومان</InputAdornment>
            ),
          }}
        />
        <TextField
          id="form-texts-toman"
          variant="outlined"
          value={values.ITotal}
          onChange={handleInputChange}
          type="number"
          name="ITotal"
          label="تعداد کل"
          style={{ borderRadius: "50", backgroundColor: "white" }}
          InputProps={{
            inputMode: "numeric",
            pattern: "[,]*",
            inputProps: { min: 0 },
            endAdornment: (
              <InputAdornment position="start">کیلوگرم</InputAdornment>
            ),
          }}
        />
        {/* <Grid item>
          <ImageUploader
            name="FImage"
            id="FImage"
            onChange={handleInputChange}
          />
        </Grid> */}
        <Grid item>
          <div>
            <MuiButton
              text="ثبت"
              type="submit"
              style={{ margin: "1rem", textAlign: "end", alignContent: "end" }}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default CreateInventory;
