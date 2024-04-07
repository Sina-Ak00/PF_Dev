import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useCreateTotalMutation } from "../../state/api.js";
// import * as TotalServices from "../../services/TotalServices";
import moment from "jalali-moment";
import Foods from "../menu/Foods";

export default function Bascket(props) {
  const { anchor, anchorClick, cartItem, onAdd, onRemove, onReset } = props;
  const [createTotal] = useCreateTotalMutation();
  const [turn, setTurn] = useState(1);
  const [address, setAddress] = useState("");
  const itemsPrice = cartItem.reduce((a, c) => a + c.FPrice * c.qty, 0);
  const MyFPrice = cartItem.reduce((a, c) => a + c.FMyPrice * c.qty, 0);
  const filteredCartItems = cartItem.map((cartItem) => ({
    id: cartItem.id,
    FName: cartItem.FName,
    qty: cartItem.qty,
  }));
  // const taxPrice = itemsPrice * 0.09;
  // const shippingPrice = itemsPrice > 2000 ? 0 : 50;
  const totalPrice = itemsPrice;
  const addTurn = () => {
    setTurn(Number(turn) + Number(1));
    const data = {
      id: 0,
      foods: filteredCartItems,
      totalPrice: totalPrice,
      MyPrice: MyFPrice,
      Date: moment().format("jYYYY/jM/jD HH:mm"),
      Address: address,
    };
    createTotal(data);
    // TotalServices.insertTotal(data);
    onReset();
  };
  return (
    <Grid container style={{ textAlign: "center", alignContent: "center" }}>
      <Typography variant="h2">Order</Typography>
      <IconButton
        onClick={() => anchorClick()}
        size="small"
        color={anchor ? "info" : "error"}
        style={{ backgroundColor: "transparent" }}
        disableRipple={false}
        variant="raised"
      >
        <ImportExportIcon />
      </IconButton>
      {cartItem?.length === 0 && (
        <Grid
          container
          spacing={2}
          style={{ marginLeft: "0.5rem", margin: "1rem" }}
        >
          <div>لیست سفارش خالی است</div>
        </Grid>
      )}
      {cartItem?.length !== 0 && (
        <Grid container style={{ marginLeft: "2.5px" }}>
          <Button
            onClick={() => addTurn()}
            size="small"
            color="info"
            variant="outlined"
          >
            ثبت نهایی سفارش
          </Button>
          <Button
            onClick={() => onReset()}
            style={{ marginLeft: "2.5px" }}
            size="small"
            color="error"
            variant="outlined"
          >
            کنسل کردن سفارش
          </Button>
        </Grid>
      )}
      {cartItem &&
        cartItem.map((item, index) => (
          <Grid
            container
            spacing={2}
            style={{ marginLeft: "0.5rem", margin: "1rem" }}
            key={item.id}
          >
            <Grid item md={4} minWidth={106}>
              <Typography variant="p">{item.FName}</Typography>
            </Grid>
            <Grid item md={4}>
              <ButtonGroup size="small">
                <Button onClick={() => onRemove(item)}>-</Button>
                <Button disabled>{item.qty}</Button>
                <Button onClick={() => onAdd(item)}>+</Button>
              </ButtonGroup>
            </Grid>
            <Grid item md={4}>
              {item.qty} x {Number(item.FPrice).toLocaleString()} تومان
            </Grid>
          </Grid>
        ))}
      <Grid
        container
        spacing={2}
        style={{ marginLeft: "0.5rem", margin: "1rem" }}
      >
        {cartItem.length !== 0 && (
          <Grid item md={4}>
            <TextField
              id="form-texts-toman"
              variant="outlined"
              value={turn}
              onChange={(e) => setTurn(e.target.value)}
              name="turn"
              label="نوبت"
              type="number"
              inputProps={{ min: 0 }}
              style={{ borderRadius: "50", backgroundColor: "white" }}
            />
          </Grid>
        )}
        {cartItem.length !== 0 && (
          <Grid item md={4}>
            <TextField
              id="form-texts-toman"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="turn"
              label="آدرس"
              multiline
              type="text"
              rows={2}
              inputProps={{ min: 0 }}
              style={{ borderRadius: "50", backgroundColor: "white" }}
            />
          </Grid>
        )}
      </Grid>
      {cartItem.length !== 0 && (
        <div>
          <Foods
            cartItems={cartItem}
            totalPrice={totalPrice}
            turn={turn}
            address={address}
            addTurn={addTurn}
            itemsPrice={itemsPrice}
          />
        </div>
      )}
    </Grid>
  );
}
