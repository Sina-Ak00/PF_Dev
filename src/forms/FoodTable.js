import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import useTable from "../controls/useTable";
//import * as FoodServices from "../services/FoodServices";
import {
  useGetFoodsQuery,
  useCreateFoodMutation,
  useDeleteFoodMutation,
  useUpdateFoodMutation,
} from "../state/api.js";
import CreateFood from "./createFood";
import Popup from "../controls/Popup";
import CBtn from "../controls/CBtn";
import Notification from "../controls/Notification";
import ConfirmDialog from "../controls/ConfirmDialog";
import {
  Button,
  Chip,
  InputAdornment,
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
  ImageNotSupported,
  Search,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

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
  { id: "FName", label: "نام" },
  { id: "FPrice", label: "قیمت" },
  { id: "FImage", label: "تصویر", disableSorting: true },
  { id: "FType", label: "دسته بندی" },
  { id: "Actions", label: "تنظیمات", disableSorting: true },
];

const FoodTable = (props) => {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const { data } = useGetFoodsQuery();
  const [records, setRecords] = useState(data || []);
  const [createFood] = useCreateFoodMutation();
  const [deleteFood] = useDeleteFoodMutation();
  const [updateFood] = useUpdateFoodMutation();
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
        else return items.filter((x) => x.FName.includes(e.target.value));
      },
    });
  };

  const addOrEdit = (food, resetForm) => {
    // if (food.id === 0) createFood(food);
    // else updateFood(food.id,food);
    if (food.id === 0) createFood(food);
    else updateFood({ id: food.id, updatedFood: food });
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
    deleteFood(id);
    setRecords(data);
    setNotify({
      isOpen: true,
      message: "رکورد مورد نظر حذف شد",
      type: "error",
    });
  };

  return (
    <>
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
          <CBtn
            text="دسته بندی جدید"
            variant="outlined"
            startIcon={<AddCircleRounded />}
            component={Link}
            to="/createCategory"
            styles={{
              position: "absolute",
              right: "10px",
              marginRight: "100px",
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell className={classes.tableCell}>
                  {item.FName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {item.FPrice}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {item.FImage ? (
                    <img
                      src={item.FImage}
                      alt={item.id}
                      loading="lazy"
                      style={{
                        objectFit: "containt",
                        height: "auto",
                        maxHeight: "100px",
                        width: "auto",
                        maxWidth: "150px",
                      }}
                    />
                  ) : (
                    <ImageNotSupported />
                  )}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {item.FType && (
                    <Chip
                      label={item.FType}
                      color="primary"
                      variant="outlined"
                    />
                  )}
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
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="ساخت منو">
        <CreateFood addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default FoodTable;
