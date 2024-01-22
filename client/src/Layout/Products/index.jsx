import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { WishlistContext } from "../../Context/WishlistContext.jsx";
import "./index.scss";

const Products = () => {
  const [product, setProduct] = useState("");
  async function axiosData() {
    try {
      const response = await axios.get("http://localhost:7000/products/");
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    axiosData();
  }, []);
  const { toggleWishlist, wishlist } = useContext(WishlistContext);

  return (
    <div className="cards">
      {product &&
        product.map((item) => (
          <div className="productCard" key={item._id}>
            <div className="CardName">
              <h1>{item.name}</h1>
            </div>
            <div className="cardImg">
              <img src={item.image} />
            </div>
            <div className="cardDesc">
              <p>{item.description}</p>
            </div>
            <div className="cardPrice">
              <span>{item.price}</span>
            </div>
            <div className="addToWishlist">
                <button onClick={()=> toggleWishlist(item)}>
                    Add to Wishlist
                </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
