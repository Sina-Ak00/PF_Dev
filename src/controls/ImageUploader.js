import React, { useState, useRef } from "react";
import { useCreateUploadMutation } from "../state/api.js";
import { Button, Grid, Stack } from "@mui/material";

const farsiRegex = /[\u0600-\u06FF]/;

const ImageUploader = (props) => {
  const { setValues, values } = props;
  const inputRef = useRef(null);
  const [createUpload] = useCreateUploadMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (farsiRegex.test(selectedImage.name)) {
      alert("لطفا نام تصویر فایل مورد نظر را به نام غیر فارسی تغییر دهید.");
    } else {
      formData.append("myImage", selectedImage);
      setValues({ ...values, FImage: "server_" + selectedImage.name });
      createUpload(formData);
    }
  };

  return (
    <Grid style={{ textAlign: "center" }}>
      <Stack
        justifyContent="center"
        direction="row"
        alignItems="center"
        spacing={2}
      >
        <Button variant="outlined" component="label">
          انتخاب تصویر
          <input
            ref={inputRef}
            hidden
            type="file"
            name="myImage"
            accept="image/*"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
        </Button>
        {selectedImage && (
          <>
            <Button variant="contained" color="success" onClick={handleUpload}>
              آپلود
            </Button>
          </>
        )}
        {selectedImage && (
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              setSelectedImage(null);
              inputRef.current.value = null;
            }}
          >
            حذف
          </Button>
        )}
      </Stack>
      {selectedImage && (
        <img
          style={{ marginTop: "20px" }}
          alt="Selected image"
          src={URL.createObjectURL(selectedImage)}
          width={300}
          height={150}
        />
      )}
    </Grid>
  );
};

export default ImageUploader;
