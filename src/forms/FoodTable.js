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
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../controls/DndSettings/StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";

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

    if(data) setRecords(myArray || data);
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

  const handleOnDragEnd = (result) => {
    if (!result?.destination) return;

    const tasks = [...records];

    const [reorderedItem] = tasks.splice(result.source.index, 1);

    tasks.splice(result.destination.index, 0, reorderedItem);

    const idsOrderArray = tasks.map((task) => task.id);
    localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));

    setRecords(tasks);
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
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="DpFood">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <TableRow
                          key={item.id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
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
                                  subTitle:
                                    "دیگر امکان برگرداندن رکورد نخواهد بود",
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
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
