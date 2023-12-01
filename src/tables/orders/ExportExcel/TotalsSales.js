import React, { useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { makeStyles } from "@mui/styles";
import useTable from "../../../controls/useTable.js";
import {
  useGetTotalsQuery,
  useDeleteTotalMutation,
} from "../../../state/api.js";
import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Tooltip,
  Chip,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
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
  { id: "totalPrice", label: "قیمت فروش به مشتری" },
  { id: "MyPrice", label: "هزینه تولید فروشنده" },
  { id: "Date", label: "تاریخ" },
  { id: "Address", label: "آدرس" },
  { id: "Actions", label: "تنظیمات" },
];

export default function TotalSales(props) {
  const classes = useStyles();
  const { data } = useGetTotalsQuery("totals");
  const [deleteTotal] = useDeleteTotalMutation();
  const [records, setRecords] = useState(data || []);

  const [filterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  React.useEffect(() => {
    if (data) setRecords(data);
  }, [data]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

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
      <div
      style={{width:'100%'}}
        onClick={() => {
          props.setOpenPopup(false);
        }}
      >
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportExcelBtn"
          table="table-to-xls"
          filename={String(moment().format("jYYYY/jMM/jDD-HH:mm"))}
          sheet="فروش تا این تاریخ"
          buttonText="دانلود خروجی"
        />
      </div>
      {/* <ReactHTMLTableToExcel
        style={{ position: "absolute", right: "10px", dir: "rtl" }}
        id="test-table-xls-button"
        className="exportExcelBtn"
        table="table-to-xls"
        filename={String(moment().format("jYYYY/jMM/jDD-HH:mm"))}
        sheet="فروش تا این تاریخ"
        buttonText="دانلود خروجی"
        buttonComponent={Button}
      /> */}
      <Paper sx={{ margin: "5rem", display: props.hidden }}>
        <Toolbar>
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
                  {Number(item.totalPrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {Number(item.MyPrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell className={classes.tableCell}>{item.Date}</TableCell>
                <TableCell className={classes.tableCell}>
                  {item.Address}
                </TableCell>
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
                {recordsAfterPagingAndSorting()
                  .reduce((a, item) => (a = a + item.totalPrice), 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </TableCell>
              <TableCell align="left">
                {recordsAfterPagingAndSorting()
                  .reduce((a, item) => (a = a + item.MyPrice), 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>سود</TableCell>
              <TableCell align="left">
                {recordsAfterPagingAndSorting()
                  .reduce(
                    (a, item) => (a = a + item.totalPrice - item.MyPrice),
                    0
                  )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </TableCell>
            </TableRow>
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
