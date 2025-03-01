import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Buynow.css'; // Add your styles here

function BuyNow() {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null); // State to store product data
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: ''
  }); // State for form data
  const [shippingMethod] = useState("Free Delivery");
  const [paymentMethod] = useState("COD");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Fetch product details from the API based on product ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(response.data);  // Set product data to state
      } catch (error) {
        console.error('Error fetching product details:', error);
        setErrorMessage("Unable to fetch product details.");
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]); // Fetch product when the ID changes

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const { email, firstName, lastName, address, city, postalCode, phone } = formData;

    if (!email || !firstName || !lastName || !address || !city || !postalCode || !phone) {
      setErrorMessage("All fields are required.");
      return;
    }

    setErrorMessage(""); // Reset error message

    try {
      // Prepare order data with product ID
      const orderData = {
        user: email,  // Assuming email as the user identifier
        email,
        first_name: firstName,
        last_name: lastName,
        address,
        apartment: formData.apartment,
        city,
        postal_code: postalCode,
        phone_number: phone,
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        product: product.id // Correct the field name 'product' to match the backend model
      };

      // Send POST request to place the order
      const response = await axios.post('http://127.0.0.1:8000/api/order/', orderData);
      
      if (response.status === 201) {
        setSuccessMessage("Your order has been placed successfully.");
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          apartment: '',
          city: '',
          postalCode: '',
          phone: ''
        }); // Clear form fields
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage("There was an issue placing your order. Please try again later.");
    }
  };

  if (!product) {
    return <h1>Loading product details...</h1>;
  }

  return (
    <div className="buy-now-container">
      {/* Left Section: Delivery/Contact Form */}
      <div className="buy-now-left">
        <h2>Contact</h2>
        <input
          type="email"
          name="email"
          placeholder="Email or mobile phone number"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="checkbox-container">
          <span>Email me with news and offers</span>
          <input type="checkbox" className="email-checkbox" />
        </div>
        <h2>Delivery</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apartment"
          placeholder="Apartment, suite, etc. (optional)"
          value={formData.apartment}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal code (optional)"
          value={formData.postalCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button className="save-info">Save this information for next time</button>

        {/* Shipping Method Section */}
        <div className="shipping-method-section">
          <h3>Shipping method</h3>
          <p>Choose a shipping method</p>
          <label>
            <span>Free delivery</span>
            <span className="shipping-price">FREE</span>
          </label>
        </div>

        {/* Payment Section */}
        <div className="payment-method-section">
          <h3>Payment</h3>
          <p>All transactions are secure and encrypted.</p>
          <label>
            <span>Cash on Delivery (COD)</span>
            <span className="payment-fee">FREE</span>
          </label>
        </div>

        {/* Error and Success Messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      {/* Right Section: Product Summary */}
      <div className="buy-now-right">
        <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <div className="total-section">
          <p><span>Subtotal (1 item):</span> <span>${product.price}</span></p>
          <p><span>Shipping:</span> <span>FREE</span></p>
          <p className="total-price">Total: PKR {product.price}</p>
        </div>
        <button onClick={handleSubmit}>Complete Order</button>
      </div>
    </div>
  );
}

export default BuyNow;
