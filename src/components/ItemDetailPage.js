import React, { useState, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaSearchPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import itemData from "../data/itemData.json";
import "./ItemDetailPage.css";

const ItemDetailPage = () => {
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMagnifierActive, setIsMagnifierActive] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const item = itemData.find(i => i.id === parseInt(id));

    const handlePrev = () => {
        setCurrentImageIndex(prev =>
            prev > 0 ? prev - 1 : item.images.length - 1
        );
    };

    const handleNext = () => {
        setCurrentImageIndex(prev =>
            prev < item.images.length - 1 ? prev + 1 : 0
        );
    };

    const handleMagnifierMove = useCallback((e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
        setCursorPosition({ x, y });
    }, []);

    useEffect(() => {
        if (isMagnifierActive) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px'; // Prevent layout shift
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0';
        };
    }, [isMagnifierActive]);

    if (!item) return <div className="not-found">Item not found.</div>;

    return (
        <div className="item-detail-container">
            <div className="gallery-section">
                <div className="main-image-wrapper">
                    {item.images.length > 1 && (
                        <motion.button
                            className="nav-arrow left"
                            onClick={handlePrev}
                            aria-label="Previous image"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaArrowLeft />
                        </motion.button>
                    )}

                    <div
                        className="image-container"
                        onMouseMove={handleMagnifierMove}
                        onMouseLeave={() => setIsMagnifierActive(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={item.images[currentImageIndex]}
                                alt={item.title}
                                className="main-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onLoad={() => setIsLoading(false)}
                            />
                        </AnimatePresence>

                        {isLoading && (
                            <div className="image-skeleton" />
                        )}

                        <motion.button
                            className="magnifier-trigger"
                            onClick={() => setIsMagnifierActive(!isMagnifierActive)}
                            aria-label="Toggle magnifier"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaSearchPlus />
                        </motion.button>

                        {isMagnifierActive && (
                            <motion.div
                                className="magnifier-overlay"
                                style={{
                                    backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                                    backgroundImage: `url(${item.images[currentImageIndex]})`
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        )}
                    </div>

                    {item.images.length > 1 && (
                        <motion.button
                            className="nav-arrow right"
                            onClick={handleNext}
                            aria-label="Next image"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaArrowRight />
                        </motion.button>
                    )}
                </div>

                {item.images.length > 1 && (
                    <div className="dots-container">
                        {item.images.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <motion.div
                className="product-info"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="product-title">{item.title}</h1>
                <p className="product-price">${item.price.toFixed(2)}</p>
                <p className="product-description">{item.description}</p>

                <div className="action-buttons">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link to={`/track/${item.id}`} className="track-button">
                            Track Price Changes
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link to="/home" className="back-button">
                            Continue Shopping
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ItemDetailPage;