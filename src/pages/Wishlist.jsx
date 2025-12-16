import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  cartProductData,
  removeProductFromWishlist,
  setUpdProduct,
} from "../ReduxManager/action";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistProductData = useSelector((state) => state.wishlistProductData);
  const currentUserExist = useSelector((state) => state.currentUser);
  const cartProductDataSelector = useSelector((state) => state.cartProductData);

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
  };

  const decreaseQauntity = (product) => {
    const updateCart = cartProductDataSelector
      .map((prodDetail) => {
        if (prodDetail.id === product.id) {
          return { ...prodDetail, quantity: prodDetail.quantity - 1 };
        }
        return prodDetail;
      })
      .filter((prodItem) => prodItem.quantity > 0);

    dispatch(setUpdProduct(updateCart));
  };

  const removeProductFromCart = (productId) => {
    const filteredWishlist = wishlistProductData.filter(
      (prodDetail) => prodDetail.id !== productId
    );

    dispatch(removeProductFromWishlist(filteredWishlist));
  };

  return (
    <div className="mt-4">
      <Container>
        <div className="custom-bread">
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          / Wishlist
        </div>
        <div className="main-cart-product my-5">
          <div className="d-flex flex-column">
            <div className="cart-head mx-auto translate-middle-y">Wishlist</div>
            {wishlistProductData.length > 0 ? (
              <>
                <div className="row">
                  {wishlistProductData.map((product) => {
                    const cartProduct = cartProductDataSelector.find(
                      (item) => item.id === product.id
                    );
                    const prodQty = cartProduct?.quantity || 0;

                    return (
                      <div key={product.id} className="col-sm-12">
                        <div className="cart-product-card row mx-0 d-flex align-items-center py-4 position-relative">
                          {/* <span
                        className="badge bg-danger position-absolute top-0 end-0 fs-6"
                        style={{ transform: "translate(-20%, 50%)" }}
                      >
                        -{product.discountPercentage}%
                      </span> */}
                          <div
                            className="cart-product-del-btn col-md-1 d-flex"
                            onClick={() => {
                              removeProductFromCart(product.id);
                            }}
                          >
                            <span className="d-inline-block fs-5 mx-auto">
                              <i className="bi bi-x-lg "></i>
                            </span>
                          </div>
                          <div className="cart-product-img col-md-1 d-flex align-items-center px-1">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-md-3 d-flex">
                            <div className="ms-4">
                              <span className="cart-product-detail">
                                {product.title}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <p className="mb-0 ms-auto d-flex">
                              <span className="d-inline-block mx-auto">
                                ${product.price}
                              </span>
                            </p>
                          </div>
                          <div className="col-md-3 d-flex">
                            <span
                              className={`d-inline-block mx-auto ${
                                product.stock > 0
                                  ? "cart-product-stock"
                                  : "cart-product-stock cart-product-unavailable"
                              } px-3 py-1`}
                            >
                              {product.stock > 0
                                ? "In stock"
                                : "Currently unavailable"}
                            </span>
                          </div>
                          <div className="col-md-2 d-flex">
                            {prodQty > 0 ? (
                              <>
                                <div className="mx-auto">
                                  <button
                                    className="quantity-btn btn-gradient"
                                    onClick={() => {
                                      increaseQuantity(product);
                                    }}
                                  >
                                    <span>
                                      <i className="bi bi-plus-lg"></i>
                                    </span>
                                  </button>
                                  <span className="cart-product-quantity mx-2">{prodQty}</span>
                                  <button
                                    className="quantity-btn btn-gradient"
                                    onClick={() => {
                                      decreaseQauntity(product);
                                    }}
                                  >
                                    <span>
                                      <i className="bi bi-dash-lg"></i>
                                    </span>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <button
                                  className="btn-gradient mx-auto px-4 py-2 rounded-5"
                                  onClick={() => {
                                    addToCart(product);
                                  }}
                                >
                                  Add to cart
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex my-5">
                  <button
                    className="btn-gradient mx-auto px-4 py-2 rounded-5"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="empty-cart-msg mx-auto mb-4">
                  Your wishlist is currently empty.
                </p>
                <button
                  className="btn-gradient mx-auto px-4 py-2 rounded-5 mb-5"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Return To Shop {">"}
                </button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Wishlist;
