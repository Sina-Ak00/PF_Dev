import React from "react";
import { makeStyles } from "@mui/styles";
import FoodTable from "../forms/FoodTable";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: "1rem",
    padding: "1rem",
  },
  item: {
    margin: "2rem 5rem",
    textAlign: "center",
    alignContent: "center",
  },
  tableCEll: {
    padding: "0px 12px 0px 0px",
  },
}));

const Routes = (props) => {
  const classes = useStyles();


  return (
    <div>
      <Grid container>

        <Grid item xs={12}>
          <Paper className={classes.item}>
            <FoodTable />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Routes;
