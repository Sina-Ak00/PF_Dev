import React, { useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { makeStyles } from "@mui/styles";
import useTable from "../controls/useTable";
import { useGetTotalsQuery, useDeleteTotalMutation } from "../state/api.js";
// import * as TotalServices from "../services/TotalServices";
import {
  Button,
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Chip,
} from "@mui/material";
import { DeleteOutline, Search } from "@mui/icons-material";
import moment from "jalali-moment";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: "1rem",
    padding: "1rem",
  },
  item: {
    margin: ".5rem",
    textAlign: "center",
  },
  tableCEll: {
    padding: "0px 12px 0px 0px",
  },
}));

const headCells = [
  { id: "foods", label: "سفارش" },
  { id: "totalPrice", label: "قیمت" },
  { id: "Date", label: "تاریخ" },
  { id: "Actions", label: "تنظیمات" },
];

export default function DailyPrice(props) {
  const classes = useStyles();
  const { data } = useGetTotalsQuery('totals');
  const [deleteTotal] = useDeleteTotalMutation();
  const [records, setRecords] = useState(data || []);
  // const [records, setRecords] = useState(TotalServices.getAllTotals());
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  React.useEffect(() => {
    if (data) setRecords(data);
  }, [data]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (items) => {
        if (e.target.value === "") return items;
        else return items.filter((x) => x.totalPrice.includes(e.target.value));
      },
    });
  };

  const onDelete = (id) => {
    deleteTotal(id);
    setRecords(data);
    // TotalServices.deleteTotal(id);
    // setRecords(TotalServices.getAllTotals());
  };
  const onRemoveAll = () => {
    data.forEach((d) => deleteTotal(d.id));
    setRecords(data);
    // TotalServices.deleteAllTotal();
    // setRecords(TotalServices.getAllTotals());
  };

  return (
    <>
      {/* <DownloadTableExcel
        filename={new Date()}
        sheet={"تا" + new Date()}
        currentTableRef={tableRef.current}
      >
      </DownloadTableExcel> */}
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
          {/* <Button
            style={{ position: "absolute", right: "160px" }}
            variant="outlined"
          >
            Export Excel
          </Button> */}
          <Button
            style={{ position: "absolute", right: "10px" }}
            variant="outlined"
            color="error"
            onClick={() => onRemoveAll()}
          >
            حذف رکوردها
          </Button>
        </Toolbar>

        <TblContainer id="table-to-xls">
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell className={classes.tableCell}>
                  {item.foods?.map((f) => (
                    <Tooltip
                      key={f.id}
                      title={Number(f.FPrice) * Number(f.qty)}
                    >
                      <Chip
                        label={f.FName + "(" + f.qty + ")"}
                        style={{ marginRight: "5px", direction: "rtl" }}
                      />
                    </Tooltip>
                  ))}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {Number(item.totalPrice)}
                </TableCell>
                <TableCell className={classes.tableCell}>{item.Date}</TableCell>
                <TableCell className={classes.tableCell}>
                  <Button color="error" onClick={() => onDelete(item.id)}>
                    <DeleteOutline />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>مجموع فروش</TableCell>
              <TableCell align="left">
                {recordsAfterPagingAndSorting().reduce(
                  (a, item) => (a = a + item.totalPrice),
                  0
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
