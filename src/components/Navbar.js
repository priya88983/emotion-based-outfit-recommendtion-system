import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar({ onMoodClick }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a1a1a" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#fff" }}>
          Mood Outfit Recommender
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={onMoodClick}
            sx={{
              backgroundColor: "#4CAF50",
              color: "white",
              marginLeft: "10px",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            Your Current Mood
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
