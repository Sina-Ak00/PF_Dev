import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import MuiButton from "../controls/MuiButton";
import Notification from "../controls/Notification";
import ConfirmDialog from "../controls/ConfirmDialog";

import { Form, useForm } from "../controls/useForm";
import useTable from "../controls/useTable";

import {
  useGetCategorysQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetFoodsQuery,
  useUpdateFoodMutation,
} from "../state/api.js";

import { CloseOutlined, EditOutlined } from "@mui/icons-material";

import "./createFood.css";
import { Paper, TableBody, TableCell, TableRow, Button } from "@mui/material";

const initailValues = {
  id: 0,
  CName: "",
};
const headCells = [
  { id: "CName", label: "نام" },
  { id: "Actions", label: "تنظیمات" },
];

const CreateCategory = (props) => {
  const { data } = useGetCategorysQuery();
  const { data: foods } = useGetFoodsQuery();
  const [records, setRecords] = useState(data || []);
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [updateFoods] = useUpdateFoodMutation();
  const [filterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
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

  const { values, setValues, handleInputChange, resetForm } =
    useForm(initailValues);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.id === 0) createCategory(values);
    else {
      updateCategory({ id: values.id, updatedCategory: values });
      foods.map(
        (f) =>
          f.FType === values.CName &&
          updateFoods({ id: f.id, updatedFood: { ...f, FType: values.CName } })
      );
    }
    resetForm();
  };

  const onDelete = (id, name) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteCategory(id);
    foods.map(
      (f) =>
        f.FType === name &&
        updateFoods({ id: f.id, updatedFood: { ...f, FType: "" } })
    );
    setRecords(data);
    setNotify({
      isOpen: true,
      message: "رکورد مورد نظر حذف شد",
      type: "error",
    });
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "100px" }}
      >
        <Grid item xs="auto">
          <Paper
            spacing={10}
            direction="column"
            align="center"
            justify="center"
          >
            <Form onSubmit={handleSubmit}>
              <Grid container>
                <TextField
                  id="form-texts"
                  variant="outlined"
                  label="نام دسته بندی"
                  name="CName"
                  value={values.CName}
                  onChange={handleInputChange}
                />
                <Grid item>
                  <div>
                    <MuiButton
                      text="ثبت"
                      type="submit"
                      style={{
                        margin: "1rem",
                        textAlign: "end",
                        alignContent: "end",
                      }}
                    />
                    <MuiButton
                      text="پاک کردن"
                      color="error"
                      style={{
                        margin: "1rem",
                        textAlign: "end",
                        alignContent: "end",
                      }}
                      onClick={() => resetForm()}
                    />
                  </div>
                </Grid>
              </Grid>
            </Form>
          </Paper>
        </Grid>
        <Grid item xs="auto" sm="auto">
          <Paper
            sx={{
              marginTop: "20px",
              marginLeft: "550px",
              marginRight: "550px",
              minWidth: "500px",
            }}
          >
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      هیچ رکوردی در جدول دسته بندی وجود ندارد
                    </TableCell>
                  </TableRow>
                )}
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.CName}</TableCell>
                    <TableCell width={100}>
                      <Button
                        color="primary"
                        onClick={() => {
                          setValues(item);
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
                              onDelete(item.id, item.CName);
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
          </Paper>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default CreateCategory;
