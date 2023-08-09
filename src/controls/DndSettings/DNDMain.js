import React, { useState } from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import Tags from "./Tags.js";
import FoodItem from "./FoodItem";
import * as Foodservices from "../../services/FoodServices";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../controls/DndSettings/StrictModeDroppable.js";
// import { useGetFoodsQuery } from "../../state/api.js";

export default function Main(props) {
  const [search, setSearch] = useState("");
  const [typeTag, setTypeTag] = useState(8);
  const { onAdd } = props;
  const menus = Foodservices.getAllFoods();
  // const { data } = useGetFoodsQuery();
  // console.log(data)

  //Draggable
  const [foods, updateFoods] = useState(menus || []);
  const handleOnDragEnd = (result) => {
    if (!result) return
    const dndfoods = [...foods]

    const [reorderedItem] = dndfoods.splice(result.source.index, 1);

    dndfoods.splice(result.destination.index, 0, reorderedItem);
    updateFoods(dndfoods);
  };

  return (
    <Grid container ml={0.5}>
      <Grid item mb={2.5}>
        <Typography
          variant="h3"
          style={{ justifyContent: "start" }}
          component="div"
        >
          منو
        </Typography>
      </Grid>
      <TextField
        style={{
          alignSelf: "center",
          justifyContent: "center",
          marginLeft: "450px",
        }}
        id="form-texts"
        variant="outlined"
        label="جستجو"
        name="search"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid item mb={2.5}>
        <Tags typeTag={typeTag} setTypeTag={setTypeTag} />
      </Grid>
      <Divider variant="middle" />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="FoodItem">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef}>
              {search === "" ? (
                // <>
                //   <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
                //     {menus?.map((m, index) => (
                //       <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
                //     ))}
                //   </Grid>
                // </>
                typeTag === 8 ? (
                  <>
                    <Grid
                      container
                      spacing={2}
                      style={{ marginLeft: "0.5rem" }}
                    >
                      {foods?.map((m, index) => (
                        <FoodItem
                          key={index}
                          dndId={m.id}
                          index={index}
                          food={m}
                          onAdd={onAdd}
                        ></FoodItem>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      container
                      spacing={2}
                      style={{ marginLeft: "0.5rem" }}
                    >
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
                  {menus
                    ?.filter((m) => m.FName.includes(search))
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
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
      {/* {search === "" ? (
        <>
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {menus?.map((m, index) =>
              m.FType === 0 ? (
                <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
              ) : (
                ""
              )
            )}
          </Grid>
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {menus?.map((m, index) =>
              m.FType === 1 ? (
                <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
              ) : (
                ""
              )
            )}
          </Grid>
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {menus?.map((m, index) =>
              m.FType === 2 ? (
                <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
              ) : (
                ""
              )
            )}
          </Grid>
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {menus?.map((m, index) =>
              m.FType === 3 ? (
                <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
              ) : (
                ""
              )
            )}
          </Grid>
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {menus?.map((m, index) =>
              m.FType === 4 ? (
                <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
              ) : (
                ""
              )
            )}
          </Grid>
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {menus?.map((m, index) =>
              m.FType === 5 ? (
                <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
              ) : (
                ""
              )
            )}
          </Grid>
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {menus?.map((m, index) =>
              m.FType === 6 ? (
                <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
              ) : (
                ""
              )
            )}
          </Grid>
          <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
            {menus?.map((m, index) =>
              m.FType === 7 ? (
                <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
              ) : (
                ""
              )
            )}
          </Grid>
        </>
      ) : (
        <Grid container spacing={2} style={{ marginLeft: "0.5rem" }}>
          {menus
            ?.filter((m) => m.FName.toLowerCase().includes(search))
            .map((m, index) => (
              <FoodItem key={index} food={m} onAdd={onAdd}></FoodItem>
            ))}
        </Grid>
      )} */}
    </Grid>
  );
}
