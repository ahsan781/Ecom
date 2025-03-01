import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import axios from 'axios'; // Import axios for API requests
import './Product.css';
import { FaStar } from 'react-icons/fa';

function Product() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  // States to manage product data, images, reviews, and ratings
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]); // State to store reviews

  // Fetch product details by ID from the API
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}/`)  // Fetch product by ID from API
      .then(response => {
        setProduct(response.data);  // Set the product data from API
        setMainImage(response.data.img);  // Set the default main image
        setReviews(response.data.reviews || []);  // Set product reviews if any
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  // If product is not found, display a message
  if (!product) {
    return <h1>Product not found</h1>;
  }

  // Handle small image click to update the main image
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  // Handle form submission for review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || review === '') {
      alert('Please add a rating and review.');
      return;
    }

    const newReview = {
      rating: rating,
      text: review,
    };

    setReviews([...reviews, newReview]);  // Add the new review
    setRating(0);  // Reset the rating
    setReview('');  // Reset the review text
  };

  return (
    <div className="product-page">
      <div className="image-gallery">
        {/* Main large image */}
        <img
          src={`http://127.0.0.1:8000${product.image}`}
          alt={product.name}
          className="large-image"
        />
        {/* Small images below the large image */}
        {/* <div className="small-images-below">
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt="Main Product"
            className="small-image"
            onClick={() => handleImageClick(product.image)}
          />
        
        </div> */}
      </div>

      <div className="product-info">
        <p>{product.description}</p>

        <p>
          <span className="price-label">Price: </span>
          <span className="product-price">${product.price}</span>
        </p>

        {/* Add to Cart Button */}
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        {/* Buy Now Button */}
        <button className="add-to-cart" onClick={() => navigate(`/buynow/${product.id}`)}>
          Buy Now
        </button>

        {/* Rating & Review Section */}
        <div className="reviews-section">
          <h2>Leave a Rating</h2>

          <div className="rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: 'none' }}
                  />
                  <FaStar
                    size={30}
                    color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                    className="star"
                  />
                </label>
              );
            })}
          </div>

          {/* Review Form */}
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <textarea
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button type="submit">Submit Review</button>
          </form>

          {/* Display All Reviews */}
          <div className="review-list">
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((rev, index) => (
                <div className="review" key={index}>
                  <div className="review-rating">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FaStar key={i} size={20} color="#ffc107" />
                    ))}
                  </div>
                  <p>{rev.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
