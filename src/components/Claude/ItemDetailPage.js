import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import itemData from "../data/itemData.json";
import "../components/ItemDetailPage.css";

const ItemDetailPage = () => {
    const { id } = useParams();
    const item = itemData.find(i => i.id === parseInt(id));

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const imageContainerRef = useRef(null);

    if (!item) {
        return (
            <div className="not-found-container">
                <h2>Item not found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <Link to="/home" className="back-link">
                    Back to Home
                </Link>
            </div>
        );
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handleZoomToggle = () => {
        setIsZooming(!isZooming);
    };

    const handleMouseMove = (e) => {
        if (!isZooming || !imageContainerRef.current) return;

        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x, y });
    };

    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="item-detail-container">
            <nav className="breadcrumb">
                <Link to="/home">Home</Link> /
                <Link to="/category">Category</Link> /
                <span>{item.title}</span>
            </nav>

            <div className="item-content">
                <div className="image-section">
                    <div
                        ref={imageContainerRef}
                        className={`image-container ${isZooming ? "zooming" : ""}`}
                        onMouseMove={handleMouseMove}
                        style={isZooming ? {
                            cursor: "zoom-in"
                        } : {}}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={item.images[currentImageIndex]}
                                alt={`${item.title} - view ${currentImageIndex + 1}`}
                                className="main-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={isZooming ? {
                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    transform: "scale(2.5)"
                                } : {}}
                            />
                        </AnimatePresence>

                        {/* Navigation arrows */}
                        <button
                            className="nav-button prev-button"
                            onClick={handlePrevImage}
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="nav-icon" />
                        </button>

                        <button
                            className="nav-button next-button"
                            onClick={handleNextImage}
                            aria-label="Next image"
                        >
                            <ChevronRight className="nav-icon" />
                        </button>

                        {/* Zoom button */}
                        <button
                            className="zoom-button"
                            onClick={handleZoomToggle}
                            aria-label={isZooming ? "Exit zoom mode" : "Enter zoom mode"}
                        >
                            <Search className="zoom-icon" />
                        </button>
                    </div>

                    {/* Image pagination dots */}
                    <div className="pagination-dots">
                        {item.images.map((_, index) => (
                            <button
                                key={index}
                                className={`pagination-dot ${index === currentImageIndex ? "active" : ""}`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`View image ${index + 1}`}
                                aria-current={index === currentImageIndex}
                            />
                        ))}
                    </div>

                    {/* Thumbnail preview */}
                    <div className="thumbnail-container">
                        {item.images.map((image, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                                    onClick={() => handleDotClick(index)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="item-details">
                    <motion.h1
                        className="item-title"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {item.title}
                    </motion.h1>

                    <motion.div
                        className="price-container"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <span className="price">${item.price.toFixed(2)}</span>
                    </motion.div>

                    <motion.div
                        className="description-container"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3>Description</h3>
                        <p className="item-description">{item.description}</p>
                    </motion.div>

                    <motion.div
                        className="purchase-options"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="quantity-selector">
                            <span>Quantity:</span>
                            <div className="quantity-controls">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                >-</button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    aria-label="Increase quantity"
                                >+</button>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <motion.button
                                className="add-to-cart"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ShoppingCart size={18} />
                                Add to Cart
                            </motion.button>

                            <motion.button
                                className={`favorite-button ${isFavorite ? "active" : ""}`}
                                onClick={handleFavoriteToggle}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                <Heart size={18} fill={isFavorite ? "#e74c3c" : "none"} />
                            </motion.button>
                        </div>

                        <Link to={`/track/${item.id}`} className="track-link">
                            <motion.button
                                className="track-button"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Track Price Change
                            </motion.button>
                        </Link>
                    </motion.div>

                    <div className="item-meta">
                        <p className="sku">SKU: {`PROD-${item.id}${item.title.substring(0, 3).toUpperCase()}`}</p>
                        <p className="availability in-stock">
                            Availability: In Stock
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailPage;