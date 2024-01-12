import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { Grid, Tooltip } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

export default function FoodItem(props) {
  const { food, onAdd } = props;
  return (
    <Grid
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
        {food?.FImage ? (
          <Tooltip
            style={{ cursor: "pointer" }}
            title={food?.FName}
            onClick={() => onAdd(food)}
          >
            <Grid item>
              {!food?.FImage.includes("server") ? (
                <img
                  src={food?.FImage}
                  alt={food?.FName}
                  loading="lazy"
                  style={{
                    objectFit: "containt",
                    height: "150px",
                    maxHeight: "150px",
                    width: "150px",
                    maxWidth: "200px",
                    borderRadius: "25px",
                  }}
                  placeholder="images/No-Image-Placeholder.png"
                />
              ) : (
                <img
                  src={`http://localhost:8000/uploads/${food?.FImage}`}
                  alt={food?.FName}
                  loading="lazy"
                  style={{
                    objectFit: "containt",
                    height: "150px",
                    maxHeight: "150px",
                    width: "150px",
                    maxWidth: "200px",
                    borderRadius: "25px",
                  }}
                  placeholder="images/No-Image-Placeholder.png"
                />
              )}
            </Grid>
          </Tooltip>
        ) : (
          <Tooltip
            style={{ cursor: "pointer" }}
            title={food?.FName}
            onClick={() => onAdd(food)}
          >
            <Grid item>
              <img
                src="images/No-Image-Placeholder.png"
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
          title={food?.FName}
          subtitle={food?.FPrice.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
          sx={{ borderRadius: "0 0 25px 25px !important" }}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${food?.FPrice}`}
              onClick={() => onAdd(food)}
            >
              <ShoppingCart />
            </IconButton>
          }
        />
      </ImageListItem>
    </Grid>
  );
}
