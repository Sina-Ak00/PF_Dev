import React from "react";
import { Chip, TableCell, TableRow, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: "1rem",
    padding: "1rem",
  },
  item: {
    margin: ".5rem",
    textAlign: "center",
  },
  tableCEll: {
    padding: "0px 12px 0px 0px",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#DDDDDD !important",
    },
  },
}));

// const headCells = [
//   { id: "null", label: "" },
//   { id: "orderName", label: "کالا در سفارش" },
//   { id: "qty", label: "حجم" },
// ];

export const InventoryRow = (props) => {
  const classes = useStyles();

  return (
    <>
      {props.isOpen === true &&
        props.foods?.map((f) => (
          <TableRow
            key={f.id}
            className={classes.tableRow}
            sx={{ backgroundColor: "#DDDDDD" }}
          >
            <TableCell className={classes.tableCell}>
              <Tooltip title={Number(f.FPrice) * Number(f.qty)}>
                <Chip
                  label={f.FName + "(" + f.qty + ")"}
                  style={{ marginRight: "5px", direction: "rtl" }}
                />
              </Tooltip>
            </TableCell>
            <TableCell className={classes.tableCell}>{f.FInvTitle}</TableCell>
            <TableCell className={classes.tableCell}></TableCell>
            <TableCell className={classes.tableCell}>
              {f.qty * f.FInvValue}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};
