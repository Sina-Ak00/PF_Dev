import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import MuiButton from "../controls/MuiButton";
import { Form, useForm } from "../controls/useForm";
import Popup from "../controls/Popup";
import { makeStyles } from "@mui/styles";
import Notification from "../controls/Notification";

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

const initailValues = {
  id: 0,
  PW: "",
};

export default function AuthForTotal() {
  const classes = useStyles();
  const history = useHistory();
  const [openPopup, setOpenPopup] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { values, handleInputChange } = useForm(initailValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.PW === "1613651") {
      setNotify({
        isOpen: true,
        message: "دسترسی مجاز",
        type: "success",
      });
      history.push("/TotalSell");
    } else
      setNotify({
        isOpen: true,
        message: "دسترسی غیرمجاز - لطفا پسوورد درست وارد کنید ",
        type: "error",
      });
  };

  return (
    <div>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="دسترسی محدود"
      >
        <Form onSubmit={handleSubmit}>
          <Grid container className={classes.text}>
            <TextField
              id="form-texts"
              variant="outlined"
              label="پسورد"
              type="password"
              name="PW"
              value={values.PW}
              onChange={handleInputChange}
            />
            <Grid item>
              <MuiButton
                text="ثبت"
                type="submit"
                style={{
                  margin: "1rem",
                  textAlign: "end",
                  alignContent: "end",
                }}
              />
            </Grid>
          </Grid>
        </Form>
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
