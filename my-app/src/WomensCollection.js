import React from 'react';
import './WomensCollection.css';
import img8 from './img/img8.png';

function WomensCollection() {
  return (
    <section className="womens-collection">
      <div className="side-image left">
        <img src={img8} alt="Left Side" />
      </div>
      
      <div className="collection-content">
        <h2>Women's Collection</h2>
        
        <div className="collection-grid">
          <div className="collection-item">
            <img src={img8} alt="Women's Item 1" />
          </div>
          <div className="collection-item">
            <img src={img8} alt="Women's Item 2" />
          </div>
          <div className="collection-item">
            <img src={img8} alt="Women's Item 3" />
          </div>
          <div className="collection-item">
            <img src={img8} alt="Women's Item 4" />
          </div>
        </div>

        <div className="collection-grid">
          <div className="collection-item">
            <img src={img8} alt="Women's Item 5" />
          </div>
          <div className="collection-item">
            <img src={img8} alt="Women's Item 6" />
          </div>
          <div className="collection-item">
            <img src={img8} alt="Women's Item 7" />
          </div>
          <div className="collection-item">
            <img src={img8} alt="Women's Item 8" />
          </div>
        </div>

        <button className="view-all">View All</button>
      </div>

      <div className="side-image right">
        <img src={img8} alt="Right Side" />
      </div>
    </section>
  );
}

export default WomensCollection;
