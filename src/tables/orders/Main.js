import React, { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  TextField,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Tags from "./Tags.js";
import FoodItem from "./FoodItem";
//import * as Foodservices from "../../services/FoodServices";
//import { useGetFoodsQuery } from "../../state/api.js";
import useApi from "../../state/useApi.js";
import Popup from "../../controls/Popup.js";
import { useGetTotalsQuery } from "../../state/api.js";
import TotalSales from "./ExportExcel/TotalsSales.js";

export default function Main(props) {
  const [search, setSearch] = useState("");
  const [typeTag, setTypeTag] = useState(null);
  const { onAdd } = props;
  //const menus = Foodservices.getAllFoods();
  const [data] = useApi("http://localhost:8000/foods", false);
  const [menus, updateMenus] = useState(data || []);

  useEffect(() => {
    const arrayIdsOrder = JSON.parse(localStorage.getItem("taskOrder"));

    if (!arrayIdsOrder && data?.length) {
      const idsOrderArray = data.map((task) => task.id);
      localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));
    }
    let myArray;
    if (arrayIdsOrder?.length && data?.length) {
      myArray = arrayIdsOrder.map((pos) => {
        return data.find((el) => el.id === pos);
      });
      const newItems = data.filter((el) => {
        return !arrayIdsOrder.includes(el.id);
      });
      if (newItems?.length) myArray = [...newItems, ...myArray];
    }

    updateMenus(myArray || data);
  }, [data]);

  let timer;
  const [filteredMenu, setFilteredMenu] = useState([]);
  const debouncedFilter = (search) => {
    setSearch(search);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setFilteredMenu(
        menus.filter((item) => {
          return item.FName.includes(search) || item.FPrice.includes(search);
        })
      );
    }, 500);
  };

  const { data: totals } = useGetTotalsQuery("totals");
  const [openPopup, setOpenPopup] = useState(false);

  const openInPopup = (item) => {
    setOpenPopup(true);
  };

  return (
    <Grid container ml={0.5} spacing={1}>
      <Grid item xs={9}>
        <Typography
          variant="h3"
          style={{ justifyContent: "start" }}
          component="div"
        >
          منو
        </Typography>
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="فروش امروز"
          directionTitle="rtl"
        >
          <Grid container alignContent="center" justifyContent="center">
            <Grid item xs={12} marginBottom={5}>
              <Stepper alternativeLabel activeStep={2}>
                {totals &&
                  totals?.slice(0, 1).map((m) => (
                    <Step key={m.id}>
                      <StepLabel>{m.Date}</StepLabel>
                    </Step>
                  ))}

                {totals?.slice(totals.length - 1, totals.length).map((m) => (
                  <Step key={m.id}>
                    <StepLabel>{m.Date}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid item>
              <Typography
                variant="h8"
                display="inline"
                style={{ justifyContent: "start" }}
                margin={5}
              >
                فروش کلی :
              </Typography>
              <Typography
                variant="h6"
                display="inline"
                style={{ justifyContent: "start" }}
                margin={5}
              >
                {totals
                  ? totals
                      .reduce((a, item) => (a = a + item.totalPrice), 0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={12} marginTop={5}>
              <TotalSales hidden="none" setOpenPopup={setOpenPopup} />
            </Grid>
          </Grid>
        </Popup>
      </Grid>
      <Grid item rowSpacing={2} xs={3}>
        <Grid item>
          <TextField
            id="form-texts"
            variant="outlined"
            label="جستجو"
            name="search"
            autoComplete="off"
            value={search}
            onChange={(e) => debouncedFilter(e.target.value)}
          />
          
          {/* {menus && (
            <Autocomplete
              options={menus}
              sx={{ width: 242 }}
              getOptionLabel={(option) => option.FName}
              renderOption={(option) => (
                <div
                  key={option.id}
                  style={{ cursor: "pointer" }}
                  title={option?.FName}
                  onClick={() => onAdd(option)}
                >
                  <Box display="flex" alignItems="center">
                    <img
                      src={option.FImage}
                      alt={option.FName}
                      width={50}
                      height={50}
                    />
                    <Typography ml={2}>{option.FName}</Typography>
                  </Box>
                </div>
              )}
              onChange={(event, newValue) => {
                // Display the card with selected food information
              }}
              renderInput={(params) => (
                <TextField {...params} label="جستجو" variant="outlined" />
              )}
            />
          )} */}
        </Grid>
        <Grid item justifyContent="flex-end">
          <Button
            sx={{ margin: "5px 5px 0 5px" }}
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              openInPopup();
            }}
          >
            صفحه فروش روزانه{" "}
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} item style={{ marginBottom: "20px" }}>
        <Tags typeTag={typeTag} setTypeTag={setTypeTag} />
      </Grid>
      <Divider variant="middle" />
      <Grid item xs={12}>
        {search === "" ? (
          // <>
          //   <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
          //     {menus?.map((m, index) => (
          //       <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
          //     ))}
          //   </Grid>
          // </>
          typeTag === null ? (
            <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
              {menus?.map((m, index) => (
                <FoodItem
                  key={index}
                  index={index}
                  food={m}
                  onAdd={onAdd}
                ></FoodItem>
              ))}
            </Grid>
          ) : (
            <>
              <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
                {menus
                  ?.filter((m) => m.FType === typeTag)
                  .map((m, index) => (
                    <FoodItem
                      key={index}
                      index={index}
                      food={m}
                      onAdd={onAdd}
                    ></FoodItem>
                  ))}
              </Grid>
            </>
          )
        ) : (
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {filteredMenu
              // ?.filter((m) => m.FName.includes(search))
              .map((m, index) => (
                <FoodItem
                  key={index}
                  index={index}
                  food={m}
                  onAdd={onAdd}
                ></FoodItem>
              ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
