import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MuiButton from "../controls/MuiButton";
import Select from "../controls/Select";

// import ImageUploader from "../shared/formElements/ImageUploader";
import { Form, useForm } from "../controls/useForm";

import "./createFood.css";

const initailValues = {
  id: 0,
  FName: "",
  FPrice: "",
  FImage: null||'',
  FType: 7,
};
const options=[
  {id:0,title:'سیب زمینی'},
  {id:1,title:'پیتزا'},
  {id:2,title:'چیکن/سوخاری'},
  {id:3,title:'اسنک'},
  {id:4,title:'Vip'},
  {id:5,title:'نوشیدنی'},
  {id:6,title:'سس'},
  {id:7,title:'هیچکدام'},
]
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

const CreateFood = (props) => {
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
          label="نام غذا"
          name="FName"
          value={values.FName}
          onChange={handleInputChange}
        />
        <TextField
          id="form-texts-toman"
          variant="outlined"
          value={values.FPrice}
          onChange={handleInputChange}
          type="number"
          name="FPrice"
          label="قیمت"
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
          value={values.FImage}
          onChange={handleInputChange}
          placeholder="https://www.uploadiamge.com/image/"
          name="FImage"
          label="تصویر"
          style={{ borderRadius: "50", backgroundColor: "white" }}
        />
        <Select
          name="FType"
          label="دسته بندی"
          options={options}
          value={values.FType===undefined?7:values.FType}
          onChange={handleInputChange}
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

export default CreateFood;
