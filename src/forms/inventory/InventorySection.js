import React from "react";
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { InventoryRow } from "./InventoryRow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import useOpenController from "../../controls/useOpenController";

export const InventorySection = (props) => {
  const { item, inventory, expand } = props;
  const { isOpen, toggle } = useOpenController(expand || false);
  let gramTotal = 0;
  item?.forEach((i) => {
    i.foods
      .filter((i) => i.FInvTitle === inventory.IName)
      .forEach((item) => {
        gramTotal += Number(item.qty * item.FInvValue);
      });
  });
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={toggle}
          >
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{inventory.IName}</TableCell>
        <TableCell>
          {Number(inventory.IValue)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </TableCell>
        <TableCell>{inventory.ITotal} گرم</TableCell>
      </TableRow>
      {item
        .map((i) => i.foods.filter((i) => i.FInvTitle === inventory.IName))
        .map((i,index) => (
          <InventoryRow
            key={index}
            foods={i}
            invName={inventory.IName}
            isOpen={isOpen}
          />
        ))}
      <TableRow
        style={{
          display: isOpen ? "" : "none",
          borderBottom: "lightblue solid",
        }}
      >
        <TableCell colSpan={2}>مجموع</TableCell>

        <TableCell align="left" colSpan={1}>
          {Number((gramTotal * inventory.IValue) / inventory.ITotal)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          تومان
        </TableCell>
        <TableCell align="left" colSpan={3}>{gramTotal} گرم</TableCell>
      </TableRow>
    </TableBody>
  );
};
