import React from "react";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
// import { FaHamburger, FaPizzaSlice } from "react-icons/fa/";
// import { GiFrenchFries, GiSaucepan, GiChicken } from "react-icons/gi/";
// import { RiVipLine, RiMistFill } from "react-icons/ri/";
// import { MdLocalDrink } from "react-icons/md/";
import { Chip, Grid } from "@mui/material";

import { useGetCategorysQuery } from "../../state/api.js";

export default function TypeTags(props) {
  const { data: category } = useGetCategorysQuery();
  const { typeTag, setTypeTag } = props;
  return (
    <Grid container spacing={0.5}>
      <Grid item>
        <Chip
          icon={<AllInclusiveIcon />}
          label="همه"
          color={typeTag === null ? "success" : "info"}
          variant={typeTag === null ? "filled" : "outlined"}
          style={{ marginleft: "2px" }}
          onClick={() => setTypeTag(null)}
        />
      </Grid>
      {category?.map((c) => (
        <Grid item key={c.id}>
          <Chip
            label={c.CName}
            color={typeTag === c.CName ? "success" : "info"}
            variant={typeTag === c.CName ? "filled" : "outlined"}
            style={{ marginleft: "2px" }}
            onClick={() => setTypeTag(c.CName)}
          />
        </Grid>
      ))}
      {/* <Grid item>
        <Chip
          icon={<RiVipLine />}
          color={typeTag === 4 ? "success" : "info"}
          label="Vip"
          variant={typeTag === 4 ? "filled" : "outlined"}
          onClick={() => setTypeTag(4)}
        />
      </Grid>
      <Grid item>
        <Chip
          icon={<GiFrenchFries />}
          color={typeTag === 0 ? "success" : "info"}
          label="سیب زمینی"
          variant={typeTag === 0 ? "filled" : "outlined"}
          onClick={() => setTypeTag(0)}
        />
      </Grid>
      <Grid item>
        <Chip
          icon={<FaPizzaSlice />}
          color={typeTag === 1 ? "success" : "info"}
          label="پیتزا"
          variant={typeTag === 1 ? "filled" : "outlined"}
          onClick={() => setTypeTag(1)}
        />
      </Grid>
      <Grid item>
        <Chip
          icon={<GiChicken />}
          color={typeTag === 2 ? "success" : "info"}
          label="چیکن/سوخاری"
          variant={typeTag === 2 ? "filled" : "outlined"}
          onClick={() => setTypeTag(2)}
        />
      </Grid>
      <Grid item>
        <Chip
          icon={<FaHamburger />}
          color={typeTag === 3 ? "success" : "info"}
          label="اسنک"
          variant={typeTag === 3 ? "filled" : "outlined"}
          onClick={() => setTypeTag(3)}
        />
      </Grid>
      <Grid item>
        <Chip
          icon={<GiSaucepan />}
          color={typeTag === 6 ? "success" : "info"}
          label="سس"
          variant={typeTag === 6 ? "filled" : "outlined"}
          onClick={() => setTypeTag(6)}
        />
      </Grid>
      <Grid item>
        <Chip
          icon={<MdLocalDrink />}
          color={typeTag === 5 ? "success" : "info"}
          label="نوشیدنی"
          variant={typeTag === 5 ? "filled" : "outlined"}
          onClick={() => setTypeTag(5)}
        />
      </Grid>
      <Grid item>
        <Chip
          icon={<RiMistFill />}
          color={typeTag === 7 ? "success" : "info"}
          label="بقیه"
          variant={typeTag === 7 ? "filled" : "outlined"}
          onClick={() => setTypeTag(7)}
        />
      </Grid> */}
    </Grid>
  );
}
