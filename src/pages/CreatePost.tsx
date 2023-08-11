import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Container,
  Stack,
} from "@mui/material";
import React, { useMemo, useState, useCallback } from "react";
import { api } from "~/utils/api";
import Navigation from "./components/Navigation";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const conditions = [
  {
    value: "1",
    label: "Excellent",
  },
  {
    value: "2",
    label: "Good",
  },
  {
    value: "3",
    label: "Fair",
  },
];

const finOptions = Array.from({ length: 6 }, (_, index) => index);

type FormData = {
  model: string;
  type: string;
  fins: number;
  price: string;
  description: string;
  size: string;
  contact: string;
  condition: string;
};

export default function Form() {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const { mutateAsync: fetchPresignedUrls } =
    api.s3.getStandardUploadPresignedUrl.useMutation();

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const apiUtils = api.useContext();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      maxFiles: 1,
      maxSize: 5 * 2 ** 30, // roughly 5GB
      multiple: false,
      onDropAccepted: (files, _event) => {
        const file = files[0] as File;

        fetchPresignedUrls({
          key: file.name,
        })
          .then((url) => {
            setPresignedUrl(url);
            setSubmitDisabled(false);
            setUploadedFileName(file.name);
          })
          .catch((err) => console.error(err));
      },
    });

  const files = useMemo(() => {
    if (!submitDisabled)
      return acceptedFiles.map((file) => (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ));
    return null;
  }, [acceptedFiles, submitDisabled]);

  const handleImageSubmit = useCallback(async () => {
    if (acceptedFiles.length > 0 && presignedUrl !== null) {
      const file = acceptedFiles[0] as File;
      await axios
        .put(presignedUrl, file.slice(), {
          headers: { "Content-Type": file.type },
        })
        .then((response) => {
          console.log(response);
          console.log("Successfully uploaded ", file.name);
          const imageUrl = `https://tide-bucket-1.s3.us-west-2.amazonaws.com/${file.name}`;
          setUploadedImageUrl(imageUrl);
          console.log(imageUrl);
        })
        .catch((err) => console.error(err));
      setSubmitDisabled(true);
      await apiUtils.s3.getObjects.invalidate();
    }
  }, [acceptedFiles, apiUtils.s3.getObjects, presignedUrl]);

  const { mutate } = api.createPost.create.useMutation();

  const [input, setInput] = useState<FormData>({
    model: "",
    type: "",
    fins: 0,
    price: "",
    description: "",
    size: "",
    contact: "",
    condition: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: event.target.value,
    }));
  };

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    try {
      mutate({
        model: input.model,
        type: input.type,
        fins: input.fins,
        price: input.price,
        description: input.description,
        size: input.size,
        contact: input.contact,
        condition: input.condition,
        imagename: uploadedFileName,
      });

      // Form succesfully submitted
      setIsSubmitted(true);

      setTimeout(() => {
        window.location.href = "./AllPosts";
      }, 1000);
    } catch (error: any) {
      // handle error
      console.error("Error submitting the form: ", error);
    }
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" disableGutters sx={{ mt: 15 }}>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            display="flex"
            sx={{ mt: 0, mb: 10, ml: 5, mr: 5 }}
          >
            <Paper
              sx={{
                p: 1,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-start",
              }}
              elevation={4}
            >
              <form method="POST">
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Please enter the following details:
                </Typography>
                <Stack direction="column">
                  <Box
                    sx={{
                      display: "flex",
                      backgroundColor: "#ededed",
                      width: "300px",
                      height: "500px",
                      borderRadius: "15px",
                      border: 2,
                      overflow: "hidden",
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <Box sx={{ display: "flex" }}>
                      {uploadedImageUrl ? (
                        <img
                          src={uploadedImageUrl}
                          alt="Uploaded Surfboard"
                          width={300}
                          height={500}
                        />
                      ) : (
                        <Box
                          sx={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6">
                            Drag or click to insert image.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <aside>
                    {!uploadedFileName ? (
                      <h4>Files pending upload</h4>
                    ) : (
                      <ul>{files}</ul>
                    )}
                  </aside>
                  <Button
                    variant="contained"
                    sx={{ mb: 3, width: "300px", color: "#000000" }}
                    onClick={() => void handleImageSubmit()}
                    disabled={
                      presignedUrl === null ||
                      acceptedFiles.length === 0 ||
                      submitDisabled
                    }
                  >
                    Upload
                  </Button>
                </Stack>
                <TextField
                  id="outlined-basic"
                  label="Model"
                  helperText="Surfboard Model/Name"
                  variant="outlined"
                  fullWidth
                  value={input.model}
                  onChange={(e) => handleInputChange(e, "model")}
                  color="secondary"
                  required
                  sx={{
                    mb: 3,
                  }}
                />
                <TextField
                  id="outlined-standard-basic"
                  label="Type"
                  helperText="Board Type"
                  value={input.type}
                  onChange={(e) => handleInputChange(e, "type")}
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  required
                  sx={{
                    mb: 3,
                  }}
                />

                <TextField
                  id="outlined-standard-basic"
                  label="Size"
                  variant="outlined"
                  value={input.size}
                  onChange={(e) => handleInputChange(e, "size")}
                  fullWidth
                  helperText="Please use factory measurements"
                  color="secondary"
                  required
                  sx={{
                    mb: 3,
                  }}
                />
                <TextField
                  id="outlined-standard-basic"
                  select
                  label="Condition"
                  value={input.condition}
                  onChange={(e) => handleInputChange(e, "condition")}
                  variant="outlined"
                  helperText="Select"
                  color="secondary"
                  fullWidth
                  required
                  sx={{
                    mb: 3,
                  }}
                >
                  {conditions.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-standard-basic"
                  select
                  label="Fins"
                  value={input.fins}
                  onChange={(e) => handleInputChange(e, "fins")}
                  variant="outlined"
                  helperText="Select"
                  color="secondary"
                  fullWidth
                  required
                  sx={{
                    mb: 3,
                  }}
                >
                  {finOptions.map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="standard-basic"
                  label="Hourly Price"
                  color="secondary"
                  variant="outlined"
                  value={input.price}
                  onChange={(e) => handleInputChange(e, "price")}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  required
                  sx={{
                    mb: 3,
                  }}
                />
                <TextField
                  id="outlined-standard-basic"
                  label="Description"
                  variant="outlined"
                  value={input.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  fullWidth
                  helperText="Prefered usage, rider size, etc."
                  color="secondary"
                  required
                  sx={{
                    mb: 4,
                  }}
                  multiline
                  rows={4}
                />
                <TextField
                  id="outlined-standard-basic"
                  label="Contact"
                  variant="outlined"
                  value={input.contact}
                  onChange={(e) => handleInputChange(e, "contact")}
                  fullWidth
                  helperText="Phone number or Email"
                  color="secondary"
                  required
                  sx={{
                    mb: 3,
                  }}
                />
              </form>
            </Paper>
            <Button
              sx={{
                mt: 3,
                display: "flex",
                alignContent: "left",
                fontSize: "15px",
                fontWeight: "800",
              }}
              href="#"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
