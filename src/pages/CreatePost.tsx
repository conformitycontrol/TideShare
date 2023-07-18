import { Button, Typography, AppBar, Alert, AlertTitle, Box, Container } from "@mui/material";
import Navigation from "./components/Navigation";

export default function CreatePost() {

    return (
        <>
        <Navigation />
        <Container>
            <Box sx={{ mt: 15 }}>
                <Typography variant="h2">
                    Create a Post
                </Typography>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                        This site is <strong>under construction.</strong>
                </Alert>
            </Box>
        </Container>
        </>
    );
}