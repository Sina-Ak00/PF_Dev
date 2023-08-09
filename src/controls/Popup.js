import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: "60px",
    position: "absolute",
    top: "10px",
  },
}));

export default function Popup(props) {
  const classes = useStyles();

  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
          <div style={{display:"flex"}}>
        <Typography variant="h6" component="div" style={{flexGrow:1}}>
          {title}
        </Typography>
        <Button
        color="error"
        onClick={()=>setOpenPopup(false)}
        >X</Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
