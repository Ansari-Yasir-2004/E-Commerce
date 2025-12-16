import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  cartProductData,
  removeProductFromWishlist,
  setUpdProduct,
} from "../ReduxManager/action";
import { addProductToWishlist } from "../ReduxManager/action";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const cartProductDataSelector = useSelector((state) => state.cartProductData);
  const currentUserExist = useSelector((state) => state.currentUser);
  const wishlistProductData = useSelector((state) => state.wishlistProductData);
  const navigate = useNavigate();

  const getProductData = () => {
    axios
      .get("https://dummyjson.com/products?limit=0")
      .then((response) => {
        setProductData(response.data.products);
        // dispatch(getProductData(response.data.products));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    getProductData();
    console.log("Cart Product Data ===>", cartProductDataSelector);
  }, [cartProductDataSelector]);
  // console.log("GET PRODUCT ===>", productData);

  function addToCart(product) {
    if (currentUserExist) {
      const productExist = cartProductDataSelector.some(
        (prodDetail) => prodDetail.id === product.id
      );

      if (!productExist) {
        const productQty = { ...product, quantity: 1 };
        dispatch(cartProductData(productQty));
        console.log("Product Added ===>", productQty);
      } else {
        increaseQuantity(product);
      }
    } else {
      alert("Please Login To Add Product To Your Cart");
    }
  }

  const increaseQuantity = (product) => {
    const updateCart = cartProductDataSelector.map((prodDetail) => {
      if (prodDetail.id === product.id) {
        return { ...prodDetail, quantity: prodDetail.quantity + 1 };
      }
      return prodDetail;
    });

    dispatch(setUpdProduct(updateCart));
    console.log("Product Already in cart ===>", updateCart);
  };

  const decreaseQauntity = (product) => {
    const updateCart = cartProductDataSelector
      .map((prodDetail) => {
        if (prodDetail.id === product.id) {
          return { ...prodDetail, quantity: prodDetail.quantity - 1 };
        }
        return prodDetail;
      })
      .filter((item) => item.quantity > 0);

    dispatch(setUpdProduct(updateCart));
    console.log("Product Already in cart ===>", updateCart);
  };

  const addToWishlist = (product) => {
    const wishlistProductExist = wishlistProductData.some(
      (prodDetail) => prodDetail.id === product.id
    );

    if (!wishlistProductExist) {
      dispatch(addProductToWishlist(product));
    } else {
      const updateWishlist = wishlistProductData.filter(
        (prodDetail) => prodDetail.id !== product.id
      );
      dispatch(removeProductFromWishlist(updateWishlist));
    }
  };

  return (
    <div className="mt-4">
      <Container>
        <div className="row">
          <div className="col-lg-3">
            <div className="main-filter rounded-3">
              <div className="filter-head p-3">Product filter</div>
              <div className="filter-body p-3">
                <span className="filter-title mb-3 d-inline-block">Price</span>
                <ul>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>$0-$35</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>$0-$35</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>$0-$35</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>$0-$35</a>
                  </li>
                </ul>
              </div>
              <div className="filter-body p-3">
                <span className="filter-title mb-3 d-inline-block">Brands</span>
                <ul>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>e-come-store</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>Sony</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>susu</a>
                  </li>
                </ul>
              </div>
              <div className="filter-body p-3">
                <span className="filter-title mb-3 d-inline-block">
                  By Size
                </span>
                <ul>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>XS</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>S</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>M</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>L</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>XL</a>
                  </li>
                </ul>
              </div>
              <div className="filter-body p-3">
                <span className="filter-title mb-3 d-inline-block">Colour</span>
                <ul>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>Black</a>
                  </li>
                  <li>
                    <input type="checkbox" value="0-35" /> <a>Blue</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="main-product rounded-3">
              <div className="product-head p-3">Product filter</div>
              <div className="product-body row p-3">
                {productData.map((product) => {
                  const cartProduct = cartProductDataSelector.find(
                    (item) => item.id === product.id
                  );
                  const prodQty = cartProduct?.quantity || 0;
                  const wishlistProductExist = wishlistProductData.some(
                    (prodDetail) => prodDetail.id === product.id
                  );

                  return (
                    <div key={product.id} className="col-lg-4 mb-5">
                      <div className="product-card p-4 position-relative">
                        <span className="position-absolute top-0 end-0 product-discount">
                          - {product.discountPercentage.toFixed(1)}%
                        </span>
                        <div className="product-btn-group w-100 d-flex justify-content-between px-4 py-3 position-absolute start-0 top-100">
                          <button onClick={() => addToCart(product)}>
                            <span>
                              <i className="bi bi-cart"></i>
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                            }}
                          >
                            <span>
                              <i className="bi bi-eye"></i>
                            </span>
                          </button>
                          <button onClick={() => addToWishlist(product)}>
                            <span>
                              <i
                                style={{ transition: "all 0.35s ease 0s" }}
                                className={`bi ${
                                  wishlistProductExist
                                    ? "bi-suit-heart-fill text-danger"
                                    : "bi-suit-heart"
                                }`}
                              ></i>
                            </span>
                          </button>
                        </div>
                        <div
                          className="product-img"
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                          }}
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            style={{ width: "100%", borderRadius: "8px" }}
                          />
                        </div>
                        <div className="mb-1">
                          <span className="product-category">
                            {product.category}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span className="product-title">{product.title}</span>
                        </div>
                        <div className="mb-2">
                          <span className="product-price">
                            $
                            {(
                              product.price -
                              product.price * (product.discountPercentage / 100)
                            ).toFixed(2)}
                          </span>
                          <span className="ms-2 product-cut-price">
                            ${product.price}
                          </span>
                        </div>
                        {/* {prodQty < 1 || currentUserExist === null ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              addToCart(product);
                            }}
                          >
                            Add To cart
                          </button>
                        ) : (
                          <div>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                increaseQuantity(product);
                              }}
                            >
                              +
                            </button>{" "}
                            <span>{prodQty}</span>{" "}
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                decreaseQauntity(product);
                              }}
                            >
                              -
                            </button>
                          </div>
                        )} */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
