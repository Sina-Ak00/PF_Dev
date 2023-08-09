import React, { useState } from "react";
import Bascket from "./Bascket";
import Main from "./Main";
import { Grid, Paper } from "@mui/material";

import "./order.css";

export default function Orders(props) {
  const [cartItems, setCartItems] = useState([]);
  
  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, qty: 1 }]);
    }
  };
  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    }else{
        setCartItems(
            cartItems.map((x) =>
              x.id === food.id ? { ...exist, qty: exist.qty - 1 } : x
            )
          );
    }
  };
  const onReset=()=>{
    setCartItems([]);
  }
  const [anchor, setAnchor] = useState(false);
  const anchorClick=()=>{
    setAnchor(current=>!current)
  }
  return (
    <Grid container id="item-paper" spacing={2}>
      <Grid item xs={12} md={7}>
        <Paper>
          <Main onAdd={onAdd} menu={props.menu} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper style={{position:anchor?'sticky':'',top:'1rem'}}>
          <Bascket onAdd={onAdd} onReset={onReset} onRemove={onRemove} cartItem={cartItems} anchor={anchor} anchorClick={anchorClick} />
        </Paper>
      </Grid>
    </Grid>
  );
}
