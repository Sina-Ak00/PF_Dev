import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { DriveFolderUpload } from "@mui/icons-material";
import { Grid } from "@mui/material";

const ImageUploader = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);

    } else {
      console.log("error no Img");
    }
    props.onChange(props.name,pickedFile)
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Grid container>
      <Grid item>
        <Button id="form-button" onClick={pickImageHandler}>
          <DriveFolderUpload />
        </Button>
        <input
          name={props.name}
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
          {...props.other}
        />
      </Grid>
      <Grid item>
        {previewUrl && (
          <img
            src={previewUrl}
            style={{
              maxWidth: "50%",
              height: "auto",
            }}
            alt="Preview"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ImageUploader;
