import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import './Basket.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';  // Import axios for API requests

function Basket() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [productDetails, setProductDetails] = useState([]);  // State for storing product details
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: ''
  }); // State to handle form data
  const [errorMessage, setErrorMessage] = useState("");  // State for error messages
  const [successMessage, setSuccessMessage] = useState("");  // State for success messages

  // Handle modal open and close
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch product details from the API based on cart items' IDs
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productsData = await Promise.all(
          cartItems.map(async (item) => {
            const response = await axios.get(`http://127.0.0.1:8000/api/products/${item.id}/`);
            return response.data;
          })
        );
        setProductDetails(productsData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity <= 0) return;
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

  // Handle item removal
  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index); // Remove item by index
    setCartItems(updatedCartItems);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item, index) => total + (productDetails[index]?.price || 0) * item.quantity,
    0
  );

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const { email, firstName, lastName, address, city, postalCode, phone } = formData;

    // Validation to check if required fields are empty
    if (!email || !firstName || !lastName || !address || !city || !postalCode || !phone) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setErrorMessage(""); // Reset error message

    try {
      // Prepare the order data
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
        product: cartItems[0].id,  // Assuming a single product for now
      };

      // Send POST request to place the order
      const response = await axios.post('http://127.0.0.1:8000/api/order/', orderData);

      if (response.status === 201) {
        setSuccessMessage("Your order has been placed successfully.");
        setCartItems([]);  // Clear cart after successful order
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          apartment: '',
          city: '',
          postalCode: '',
          phone: ''
        }); // Reset form fields
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage("There was an issue placing your order. Please try again.");
    }
  };

  return (
    <div className="basket-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="basket-empty">Your cart is empty</p>
      ) : (
        <div className="basket-items">
          {productDetails.length === cartItems.length &&
            productDetails.map((product, index) => (
              <div key={index} className="basket-item">
                <img
                  src={`http://127.0.0.1:8000${product.image}`} // Assuming image field is returned from API
                  alt={product.name}
                  className="basket-item-img"
                />
                <div className="basket-item-details">
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(index, cartItems[index].quantity - 1)}
                      disabled={cartItems[index].quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{cartItems[index].quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(index, cartItems[index].quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="basket-item-remove" onClick={() => handleRemoveItem(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          <h2 className='price'>
            <span className="price-label">Total Price for Cart:</span>
            <span className="price-amount">${totalPrice.toFixed(2)}</span>
          </h2>
          <Button className="buy-now-btn" onClick={handleShow}>
            Buy Now
          </Button>
        </div>
      )}

      {/* Modal for User Information */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>


            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mt-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your shipping address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formApartment" className="mt-3">
              <Form.Label>Apartment (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter apartment number or suite"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCity" className="mt-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPostalCode" className="mt-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Error and Success Messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Basket;
