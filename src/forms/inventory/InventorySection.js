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
    <TableBody key={inventory.id}>
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
        <TableCell>{inventory.IValue}</TableCell>
        <TableCell>{inventory.ITotal} کیلو گرم</TableCell>
      </TableRow>
      {item
        .map((i) => i.foods.filter((i) => i.FInvTitle === inventory.IName))
        .map((i) => (
          <InventoryRow
            key={i.id}
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
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>مجموع</TableCell>
        <TableRow>
          <TableCell align="left">{gramTotal} گرم</TableCell>
          <TableCell align="left">
            {gramTotal / 1000}  کیلو گرم
          </TableCell>
        </TableRow>
      </TableRow>
    </TableBody>
  );
};
