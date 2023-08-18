import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import useTable from "../controls/useTable";
//import * as FoodServices from "../services/FoodServices";
import {
  useGetInventorysQuery,
  useCreateInventoryMutation,
  useDeleteInventoryMutation,
  useUpdateInventoryMutation,
} from "../state/api.js";
import CreateInventory from "./createInventory";
import Popup from "../controls/Popup";
import CBtn from "../controls/CBtn";
import Notification from "../controls/Notification";
import ConfirmDialog from "../controls/ConfirmDialog";
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import {
  AddCircleRounded,
  CloseOutlined,
  EditOutlined,
  Search,
} from "@mui/icons-material";

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
  { id: "IName", label: "نام" },
  { id: "IValue", label: "قیمت" },
  { id: "ITotal", label: "مقدار (کیلو گرم)" },
  { id: "Actions", label: "تنظیمات", disableSorting: true },
];

const InventoryTable = (props) => {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const { data } = useGetInventorysQuery();
  const [records, setRecords] = useState(data || []);
  const [createInventory] = useCreateInventoryMutation();
  const [deleteInventory] = useDeleteInventoryMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    if (data) setRecords(data);
  }, [data]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (items) => {
        if (e.target.value === "") return items;
        else return items.filter((x) => x.IName.includes(e.target.value));
      },
    });
  };

  const addOrEdit = (inventory, resetForm) => {
    // if (food.id === 0) createFood(food);
    // else updateFood(food.id,food);
    if (inventory.id === 0) createInventory(inventory);
    else updateInventory({ id: inventory.id, updatedInventory: inventory });
    // uploadImage();
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(data);
    setNotify({
      isOpen: true,
      message: "اپدیت شد رکورد مورد نظر",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteInventory(id);
    setRecords(data);
    setNotify({
      isOpen: true,
      message: "رکورد مورد نظر حذف شد",
      type: "error",
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            className={classes.item}
            style={{
              margin: "2rem 5rem",
              textAlign: "center",
              alignContent: "center",
            }}
          >
            <div>
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
                <CBtn
                  text="افزودن"
                  variant="outlined"
                  startIcon={<AddCircleRounded />}
                  onClick={() => {
                    setOpenPopup(true);
                    setRecordForEdit(null);
                  }}
                  styles={{ position: "absolute", right: "10px" }}
                />
              </Toolbar>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className={classes.tableCell}>
                        {item.IName}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {item.IValue}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {item.ITotal}
                      </TableCell>
                      <TableCell className={classes.tableCell} width={100}>
                        <Button
                          color="primary"
                          onClick={() => {
                            openInPopup(item);
                          }}
                        >
                          <EditOutlined fontSize="Small" />
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "آیا از حذف این رکورد مطمعن هستید؟",
                              subTitle: "دیگر امکان برگرداندن رکورد نخواهد بود",
                              onConfirm: () => {
                                onDelete(item.id);
                              },
                            });
                          }}
                        >
                          <CloseOutlined fontSize="Small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </div>
            <Popup
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              title="ساخت منو"
            >
              <CreateInventory
                addOrEdit={addOrEdit}
                recordForEdit={recordForEdit}
              />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default InventoryTable;
