import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addProductToWishlist,
  cartProductData,
  removeProductFromWishlist,
  setUpdProduct,
} from "../ReduxManager/action";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const cartProductDataSelector = useSelector((state) => state.cartProductData);
  const wishlistProductData = useSelector((state) => state.wishlistProductData);
  const currentUserExist = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const getProductById = () => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  const addToCart = () => {
    if (currentUserExist) {
      const productExist = cartProductDataSelector.some(
        (prodDetail) => prodDetail.id === product.id
      );

      if (!productExist) {
        const productQty = { ...product, quantity: 1 };
        dispatch(cartProductData(productQty));
        console.log("Product Added ==>", productQty);
      } else {
        increaseQuantity();
      }
    } else {
      alert("Please Login To Add Product To Your Cart");
    }
  };

  const increaseQuantity = () => {
    const updateCart = cartProductDataSelector.map((prodDetail) => {
      if (prodDetail.id === product.id) {
        return { ...prodDetail, quantity: prodDetail.quantity + 1 };
      }
      return prodDetail;
    });

    dispatch(setUpdProduct(updateCart));
    console.log("Product Already in cart ===>", updateCart);
  };

  // const decreaseQuantity = () => {
  //   const updateCart = cartProductData
  //     .map((prodDetail) => {
  //       if (prodDetail.id === product.id) {
  //         return { ...prodDetail, quantity: prodDetail.quantity - 1 };
  //       }
  //       return prodDetail;
  //     })
  //     .filter((item) => item.quantity > 0);

  //   dispatch(setUpdProduct(updateCart));
  //   console.log("Product Already in cart ===>", updateCart);
  // };

  const addToWishlist = () => {
    const productExist = wishlistProductData.some(
      (prodDetail) => prodDetail.id === product.id
    );

    if (!productExist) {
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
        {product ? (
          <>
            <div className="mx-5">
              <div className="custom-bread">
                <span>
                  <Link to="/">Home</Link>
                </span>{" "}
                / Product Detail: {product.title}
              </div>
              <div className="my-4 row">
                <div className="col-lg-6 product-detail-img d-flex justify-content-center gap-3">
                  <div className="product-detail-img-list">
                    {product.images.map((prodImg, index) => (
                      <div
                        key={index}
                        className="product-detail-img-list-images border-black-light-4 rounded-3 mb-3 p-1"
                      >
                        <img
                          className="img-fluid"
                          src={prodImg}
                          alt="Product Image"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="product-detail-img-active border-black-light-4 rounded-3 cursor-pointer p-3">
                    <img
                      className="product-detail-img-active-images w-100"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>
                </div>
                <div className="col-lg-4 product-detail-info">
                  <span className="product-detail-category d-inline-block fs-14 text-black-light-3 text-capitalize my-3">
                    {product.category}
                  </span>
                  <h4 className="product-detail-tilte text-black text-capitalize mb-1">
                    {product.title}
                  </h4>
                  <p className="product-detail-price fs-4 fw-500 text-black-light-2 mb-3">
                    $
                    {(
                      product.price -
                      (product.discountPercentage / 100) * product.price
                    ).toFixed(2)}
                    <span className="product-detail-cut-price fs-6 text-red text-decoration-line-through ms-2">
                      ${product.price}
                    </span>
                  </p>
                  <div className="product-detail-availability fs-14 text-black-light-3 text-capitalize mb-2">
                    Availibity:{" "}
                    <span className="text-success fw-bold">
                      {product.availabilityStatus}
                    </span>
                  </div>
                  <p className="product-detail-brand text-black-light-1 mb-2">
                    Brand: <span>{product.brand}</span>
                  </p>
                  <p className="product-detail-sku text-black-light-1 mb-2">
                    SKU: <span>{product.sku}</span>
                  </p>
                  <div className="product-detail-description fs-14 text-black-light-2 mb-4">
                    {product.description}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn-gradient px-4 py-2 rounded-5"
                      onClick={() => addToCart()}
                    >
                      Add to cart
                    </button>
                    <button
                      style={{ width: "50px", height: "50px" }}
                      className="border-2 border-black-light-4 bg-transparent rounded-circle"
                      onClick={() => addToWishlist()}
                    >
                      <span className="product-datail-heart-btn fs-4 bg-transparent text-black-light-1 opacity-50">
                        <i
                          style={{ transition: "all 0.35s ease 0s" }} 
                          className={`bi ${
                            wishlistProductData.some(
                              (prodDetail) => prodDetail.id === product.id
                            )
                              ? "bi-suit-heart-fill text-danger"
                              : "bi-suit-heart"
                          }`}
                        ></i>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default ProductDetail;
