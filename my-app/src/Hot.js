import React from 'react';
import './Men.css'; // Make sure this path is correct
import img5 from './img/img5.png';
import img4 from './img/img4.jpg';
import img8 from './img/img8.png';
import img10 from './img/img10.png';

const Men = () => {
  const watches = [
    { img: img8, hoverImg: img10, title: "Women's Watch 1", price: '$150' },
    { img: img8, hoverImg: img10, title: "Women's Watch 2", price: '$200' },
    { img: img8, hoverImg: img10, title: "Women's Watch 3", price: '$180' },
    { img: img8, hoverImg: img10, title: "Women's Watch 4", price: '$220' },
    { img: img8, hoverImg: img10, title: "Women's Watch 5", price: '$160' },
    { img: img8, hoverImg: img10, title: "Women's Watch 6", price: '$250' },
    { img: img8, hoverImg: img10, title: "Women's Watch 7", price: '$190' },
    { img: img8, hoverImg: img10, title: "Women's Watch 8", price: '$210' },
  ];

  return (
    <div>
      <br /><br /><br /><br />
      <section className="womens-collection">
        <div className="collection-content">
          <h2>HOT SELLING </h2>
          <div className="collection-grid">
            {watches.map((watch, index) => (
              <div className="collection-item" key={index}>
                {/* Two images for normal and hover */}
                <img
                  src={watch.img}
                  alt={`Women's Watch ${index + 1}`}
                  className="normal-img"
                />
                <img
                  src={watch.hoverImg}
                  alt={`Women's Hover Watch ${index + 1}`}
                  className="hover-img"
                />
                <h3>{watch.title}</h3>
                <p>{watch.price}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            ))}
          </div>
          <button className="view-all">View All</button>
        </div>
      </section>
    </div>
  );
}

export default Men;
