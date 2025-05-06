import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  MobileStepper,
  useTheme,
} from "@mui/material";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import itemData from "../data/itemData.json";

const ItemDetailPage = () => {
  const { id } = useParams();
  const item = itemData.find(i => i.id === parseInt(id));
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = item?.images.length || 0;

  if (!item) {
    return (
      <Box p={4}>
        <Typography variant="h6">Item not found.</Typography>
        <Link to="/home">
          <Button variant="outlined" sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </Link>
      </Box>
    );
  }

  const handleNext = () => {
    setActiveStep(prev => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(prev => (prev - 1 + maxSteps) % maxSteps);
  };

  return (
    <Box p={{ xs: 2, sm: 4 }} maxWidth="800px" mx="auto">
      <Typography variant="h4" gutterBottom>
        {item.title}
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        ${item.price.toFixed(2)}
      </Typography>

      <Box position="relative" mb={2}>
        <Box
          component="img"
          src={item.images[activeStep]}
          alt={`Detail ${activeStep}`}
          sx={{
            width: "100%",
            maxHeight: 450,
            objectFit: "contain",
            borderRadius: 2,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
        <IconButton
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.6)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.6)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          justifyContent: "center",
          mb: 3,
        }}
        nextButton={null}
        backButton={null}
      />

      <Typography variant="body1" sx={{ mb: 3 }}>
        {item.description}
      </Typography>

      <Link to={`/track/${item.id}`}>
        <Button variant="contained" sx={{ mr: 2 }}>
          Track Price Change
        </Button>
      </Link>

      <Link to="/home">
        <Button variant="outlined">Back to Home</Button>
      </Link>
    </Box>
  );
};

export default ItemDetailPage;
