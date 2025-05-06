import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import itemData from '../data/itemData.json'; // Assuming this path is correct
import styles from './ItemDetailPage.module.css'; // Import CSS Modules
import { FaSearchPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Example icons

const ItemDetailPage = () => {
    const { id } = useParams();
    const item = itemData.find(i => i.id === parseInt(id));

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // To track mouse for magnifier movement

    const imageRef = useRef(null); // Ref for the main image element
    const magnifierPreviewRef = useRef(null); // Ref for the magnifier preview element

    useEffect(() => {
        // Reset image index if item changes (though unlikely on this page without re-mount)
        setCurrentImageIndex(0);
        setIsMagnifierEnabled(false); // Reset magnifier state
    }, [id]);

    if (!item) {
        return <div className={styles.notFound}>Item not found. <Link to="/home" className={styles.backLink}>Go Home</Link></div>;
    }

    const { title, price, images, description } = item;

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };

    const toggleMagnifier = (event) => {
        event.stopPropagation(); // Prevent click from bubbling to image container if necessary
        setIsMagnifierEnabled(!isMagnifierEnabled);
    };

    const handleMouseMove = (e) => {
        if (!isMagnifierEnabled || !imageRef.current || !magnifierPreviewRef.current) return;

        const img = imageRef.current;
        const preview = magnifierPreviewRef.current;
        const rect = img.getBoundingClientRect();

        // Calculate cursor position relative to the image
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Store raw mouse position for the magnifier square placement
        setMousePosition({ x: e.clientX, y: e.clientY });

        // Constrain x and y to be within the image bounds
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));

        setMagnifierPosition({ x, y });

        // Calculate background position for the zoomed image
        // The preview size is assumed to be 150x150px (magnifierSize in CSS)
        // The zoom level is 2x (magnifierZoom in CSS)
        const zoomLevel = 2;
        const previewSize = 150;

        const bgPosX = - (x * zoomLevel - previewSize / 2);
        const bgPosY = - (y * zoomLevel - previewSize / 2);

        preview.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
        preview.style.backgroundImage = `url(${images[currentImageIndex]})`;
        preview.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
    };

    const handleMouseLeaveImage = () => {
        // Optionally disable magnifier when mouse leaves image area
        // setIsMagnifierEnabled(false);
    };

    return (
        <div className={styles.pageContainer}>
            <nav className={styles.breadcrumbs}>
                <Link to="/home">Home</Link> / <span>{title}</span>
            </nav>

            <div className={styles.detailLayout}>
                {/* Image Gallery Section */}
                <div className={styles.imageGallery}>
                    <div
                        className={styles.imageContainer}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeaveImage}
                        ref={imageRef}
                    >
                        <img
                            src={images[currentImageIndex]}
                            alt={`${title} - view ${currentImageIndex + 1}`}
                            className={styles.mainImage}
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className={`${styles.navButton} ${styles.prevButton}`}
                                    aria-label="Previous image"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className={`${styles.navButton} ${styles.nextButton}`}
                                    aria-label="Next image"
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}
                        <button
                            onClick={toggleMagnifier}
                            className={styles.magnifierToggle}
                            aria-label={isMagnifierEnabled ? "Disable magnifier" : "Enable magnifier"}
                        >
                            <FaSearchPlus />
                        </button>
                        {isMagnifierEnabled && (
                            <div
                                ref={magnifierPreviewRef}
                                className={styles.magnifierPreview}
                                style={{
                                    // Position the preview box near the cursor
                                    // Adjust offsets as needed for better UX
                                    left: `${mousePosition.x + 15}px`, // 15px offset from cursor
                                    top: `${mousePosition.y + 15}px`,
                                }}
                            />
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className={styles.dotContainer}>
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                                    onClick={() => handleDotClick(index)}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Item Info Section */}
                <div className={styles.itemInfo}>
                    <h1 className={styles.itemTitle}>{title}</h1>
                    <p className={styles.itemPrice}>${price.toFixed(2)}</p>
                    <p className={styles.itemDescription}>{description}</p>

                    <div className={styles.actions}>
                        <button className={styles.primaryButton}>Add to Cart</button>
                        <Link to={`/track/${item.id}`} className={styles.secondaryButtonLink}>
                            <button className={styles.secondaryButton}>Track Price</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.backLinkContainer}>
                <Link to="/home" className={styles.backLink}>
                    &larr; Back to All Products
                </Link>
            </div>
        </div>
    );
};

export default ItemDetailPage;