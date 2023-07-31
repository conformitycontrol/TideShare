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
  Link,
} from "@mui/material";
import React, { useState } from "react";

import { api } from "~/utils/api";
import Navigation from "./components/Navigation";

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
  price: any;
  description: string;
  size: string;
  contact: string;
  condition: any;
};

export default function Form() {
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

  const handleSubmit = async () => {
    try {
      await mutate({
        model: input.model as string,
        type: input.type as string,
        fins: input.fins as number,
        price: input.price,
        description: input.description as string,
        size: input.size,
        contact: input.contact as string,
        condition: input.condition,
      });

      // Form succesfully submitted
      setIsSubmitted(true);

      setTimeout(() => {
        window.location.href = "./AllPosts"
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
        <Box sx={{ justifyContent: "center" }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 10 }}
          >
            <Paper sx={{ p: 3 }} elevation={4}>
              <form method="POST">
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Please enter the following details:
                </Typography>
                <TextField
                  id="outlined-standard-basic"
                  label="Model"
                  helperText="Surfboard Model/Name"
                  variant="outlined"
                  fullWidth
                  value={input.model}
                  onChange={(e) => handleInputChange(e, "model")}
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
                  required
                  sx={{
                    mb: 3,
                  }}
                />
              </form>
              <Button href="#" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Paper>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
