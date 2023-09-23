import React from "react";
import useTable from "../../controls/useTable";
import { Button, InputAdornment, Paper, TextField, Toolbar } from "@mui/material";

import { InventorySection } from "./InventorySection";
import {  Search } from "@mui/icons-material";
import moment from "jalali-moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";


const headCells = [
  { id: "expand", label: "", disableSorting: true },
  { id: "inventorys", label: "کالا" },
  { id: "price", label: "قیمت" },
  { id: "qty", label: "تعداد" },
];

export const InventoryTbl = (props) => {
  const [expand,setExpand]=React.useState(false)

  const [filterFn, setFilterFn] = React.useState({
    fn: (item) => {
      return item;
    },
  });
  const { TblContainer, TblHead, recordsAfterPagingAndSorting } =
    useTable(props.inventory, headCells, filterFn,setFilterFn);

    const handleSearch = (e) => {
      setFilterFn({
        fn: (items) => {
          if (e.target.value === "") return items;
          else return props.inventory.filter((x) => x.IName.includes(e.target.value));
        },
      });
    };
  return (
    <Paper sx={{ margin: "5rem" }}>
      <Toolbar>
        <TextField
          style={{ direction: "rtl" }}
          label="جستجو"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <ReactHTMLTableToExcel
          style={{ position: "absolute", right: "10px", dir: "rtl" }}
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename={String(moment().format("jYYYY/jMM/jDD-HH:mm"))}
          sheet="فروش تا این تاریخ"
          buttonText="Excel"
        />
        <Button
              style={{ position: "absolute", right: "10px" }}
              variant="outlined"
              color="error"
              onClick={() => setExpand(perv=>!perv)}
            >
              باز کردن همه
            </Button>
      </Toolbar>
      <TblContainer m={5} id="table-to-xls">
        <TblHead />

        {recordsAfterPagingAndSorting()?.map((item,index) => (
          <InventorySection key={index} item={props.data} inventory={item} expand={expand} />
        ))}
      </TblContainer>
    </Paper>
  );
};
