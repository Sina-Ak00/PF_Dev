import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import MuiButton from "./MuiButton";
import React from "react";
import { makeStyles } from "@mui/styles";
import { NotListedLocation } from "@mui/icons-material";

const useStyles = makeStyles({
  dialog: {
    padding: "1rem",
    position: "absolute",
    top: "1rem",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: "#ef5350",
    "& .MuiSvgIcon-root": {
      fontSize: "4rem",
    },
  },
});

export default function ConfirmDialog(props) {
  const classes = useStyles();
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={confirmDialog.isOpen}
      style={{ direction: "rtl" }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon} color="error">
          <NotListedLocation />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <MuiButton
          id="confirm-btn"
          text="خیر"
          color="error"
          onClick={() =>
            setConfirmDialog({
              ...confirmDialog,
              isOpen: false
            })
          }
        />
        <MuiButton id="confirm-btn" text="بله" color="success" onClick={
            confirmDialog.onConfirm
        }/>
      </DialogActions>
    </Dialog>
  );
}
