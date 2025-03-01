import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#help">Help & FAQs</a></li>
              <li><a href="#shipping">Shipping</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#order-status">Order Status</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Use</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#twitter"><i className="fab fa-twitter"></i></a>
              <a href="#instagram"><i className="fab fa-instagram"></i></a>
              <a href="#linkedin"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 MA AK Watches. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
