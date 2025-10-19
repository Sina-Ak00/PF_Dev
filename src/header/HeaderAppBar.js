import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Grid, IconButton, SpeedDial, SpeedDialAction } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import InventoryIcon from '@mui/icons-material/Inventory';
import SellIcon from '@mui/icons-material/Sell';
import { Link } from "react-router-dom";

const actions = [
  {
    icon: (
      <IconButton component={Link} to="/Auth/createFood">
        <RestaurantIcon />
      </IconButton>
    ),
    name: "Insert Food / ساخت غذا",
  },
  {
    icon: (
      <IconButton component={Link} to="InventoryTable">
        <InventoryIcon />
      </IconButton>
    ),
    name: "Inventory / انبارداری",
  },
  {
    icon: (
      <IconButton component={Link} to="/bascket">
        <ShoppingBasketIcon />
      </IconButton>
    ),
    name: "Menu / منو",
  },
  {
    icon: (
      <IconButton component={Link} to="/Auth/TotalSell">
        <SellIcon />
      </IconButton>
    ),
    name: "Total Sales / فروش روزانه",
  },
];

function AppBarLabel(label) {
  return (
    <Toolbar>
      <Grid container spacing={5}>
        <Grid item>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", top: 5, left: 2, size: "50%" }}
            icon={<MenuIcon />}
            direction="down"
            FabProps={{
              sx: {
                bgcolor: "#272727",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#272727",
                  boxShadow: "#272727",
                },
              },
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Grid>
        <Grid item>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {label}
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function EnableColorOnDarkAppBar() {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          {AppBarLabel("Potato Home")}
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}
