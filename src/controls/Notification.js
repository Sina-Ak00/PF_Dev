import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = (event, resaon) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type?notify.type:"warning"} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
