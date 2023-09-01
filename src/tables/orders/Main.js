import React, { useState, useEffect } from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import Tags from "./Tags.js";
import FoodItem from "./FoodItem";
//import * as Foodservices from "../../services/FoodServices";
//import { useGetFoodsQuery } from "../../state/api.js";
import useApi from "../../state/useApi.js";

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


  return (
    <Grid container ml={0.5} spacing={1}>
      <Grid item xs={6}>
        <Typography
          variant="h3"
          style={{ justifyContent: "start" }}
          component="div"
        >
          منو
        </Typography>
      </Grid>
      <Grid item justifyContent="flex-end" xs={6}>
        <TextField
          id="form-texts"
          variant="outlined"
          label="جستجو"
          name="search"
          autoComplete="off"
          value={search}
          onChange={(e) => debouncedFilter(e.target.value)}
        />
      </Grid>
      <Grid item style={{ marginBottom: "20px" }}>
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
