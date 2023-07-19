import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
} from "@mui/material";
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

export default function CreatePost() {
  return (
    <>
      <Navigation />
      <Box sx={{ justifyContent: "center" }}>
        <Typography variant="h3" sx={{ mt: 14, ml: 20 }}>
          Post your Surfboard
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mt: 1, mb: 10 }}
        >
          <Paper sx={{ p: 3 }} elevation={4}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Please enter the following details:
            </Typography>
            <TextField
              id="outlined-standard-basic"
              label="Model"
              helperText="Surfboard Model/Name"
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
              variant="outlined"
              fullWidth
              required
              sx={{
                mb: 3,
              }}
            >
              {conditions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-basic"
              label="Hourly Price"
              variant="outlined"
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
              fullWidth
              helperText="Prefered usage, rider size, etc."
              required
              sx={{
                mb: 3,
              }}
            />
            <Button href="#" variant="outlined">
              Submit
            </Button>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}
