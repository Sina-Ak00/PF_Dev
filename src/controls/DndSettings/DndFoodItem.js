import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { Grid, Tooltip } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { ShoppingCart } from "@mui/icons-material";
export default function FoodItem(props) {
  const { food, onAdd, dndId, index } = props;
  return (
    <Draggable key={dndId} draggableId={dndId.toString()} index={index}>
      {(provided) => (
        <Grid
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          container
          sx={{
            width: "auto",
            height: 150,
            marginTop: "2rem",
            margin: "1rem",
            borderRaduis: "25px",
          }}
        >
          <ImageListItem>
            {food.FImage ? (
              <Tooltip
                style={{ cursor: "pointer" }}
                title={food.FName}
                onClick={() => onAdd(food)}
              >
                <Grid item>
                  <img
                    src={food.FImage}
                    alt={food.FName}
                    loading="lazy"
                    style={{
                      objectFit: "containt",
                      height: "150px",
                      maxHeight: "150px",
                      width: "150px",
                      maxWidth: "200px",
                      borderRadius: "25px",
                    }}
                  />
                </Grid>
              </Tooltip>
            ) : (
              <Tooltip
                style={{ cursor: "pointer" }}
                title={food.FName}
                onClick={() => onAdd(food)}
              >
                <Grid item>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    alt="notImage"
                    loading="lazy"
                    style={{
                      objectFit: "containt",
                      height: "150px",
                      maxHeight: "150px",
                      width: "150px",
                      maxWidth: "200px",
                      borderRadius: "25px",
                    }}
                  />
                </Grid>
              </Tooltip>
            )}
            <ImageListItemBar
              title={food.FName}
              subtitle={food.FPrice}
              sx={{ borderRadius: "0 0 25px 25px !important" }}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${food.FPrice}`}
                  onClick={() => onAdd(food)}
                >
                  <ShoppingCart />
                </IconButton>
              }
            />
          </ImageListItem>
        </Grid>
      )}
    </Draggable>
  );
}
