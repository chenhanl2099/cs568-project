import React, { useState, useRef } from "react";
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
    ZoomIn as ZoomInIcon,
} from "@mui/icons-material";
import itemData from "../data/itemData.json";

const ItemDetailPage = () => {
    const { id } = useParams();
    const item = itemData.find(i => i.id === parseInt(id));
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [magnifierOn, setMagnifierOn] = useState(false);
    const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });
    const imgRef = useRef(null);
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
        setMagnifierOn(false);
    };

    const handleBack = () => {
        setActiveStep(prev => (prev - 1 + maxSteps) % maxSteps);
        setMagnifierOn(false);
    };

    const toggleMagnifier = () => setMagnifierOn(prev => !prev);

    const handleMouseMove = (e) => {
        if (!imgRef.current) return;

        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const imgWidth = imgRef.current.offsetWidth;
        const imgHeight = imgRef.current.offsetHeight;

        const bgX = (x / imgWidth) * (imgWidth * 2);
        const bgY = (y / imgHeight) * (imgHeight * 2);

        setMagnifierPos({ x, y, bgX, bgY });
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
                    ref={imgRef}
                    component="img"
                    src={item.images[activeStep]}
                    alt={`Detail ${activeStep}`}
                    onMouseMove={magnifierOn ? handleMouseMove : null}
                    sx={{
                        width: "100%",
                        maxHeight: 450,
                        objectFit: "contain",
                        borderRadius: 2,
                        transition: "opacity 0.5s ease-in-out",
                        cursor: magnifierOn ? "none" : "default",
                    }}
                />

                {magnifierOn && (
                    <Box
                        sx={{
                            position: "absolute",
                            left: magnifierPos.x - 50,
                            top: magnifierPos.y - 50,
                            width: 100,
                            height: 100,
                            border: "2px solid #aaa",
                            borderRadius: "8px",
                            backgroundImage: `url(${item.images[activeStep]})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: `${imgRef.current?.offsetWidth * 2}px ${imgRef.current?.offsetHeight * 2}px`,
                            backgroundPosition: `-${magnifierPos.bgX - 50}px -${magnifierPos.bgY - 50}px`,
                            pointerEvents: "none",
                            zIndex: 10,
                        }}
                    />
                )}

                {/* Navigation Arrows */}
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

                {/* Magnifier Toggle Button */}
                <IconButton
                    onClick={toggleMagnifier}
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        bgcolor: "rgba(255,255,255,0.6)",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                        zIndex: 5,
                    }}
                >
                    <ZoomInIcon />
                </IconButton>
            </Box>

            <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{ justifyContent: "center", mb: 3 }}
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