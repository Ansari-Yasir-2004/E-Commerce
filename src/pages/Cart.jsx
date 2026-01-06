import { useDispatch, useSelector } from "react-redux";
import { filterProductData, setUpdProduct } from "../ReduxManager/action";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const Cart = () => {
  const cartProductDataSelector = useSelector((state) => state.cartProductData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeProductFromCart = (productId) => {
    const filterCartData = cartProductDataSelector.filter(
      (prodDetail) => prodDetail.id !== productId
    );

    dispatch(filterProductData(filterCartData));
    // console.log("Cart Data ===>", cartProductDataSelector);
    console.log("Filter Cart Data ===>", filterCartData);
  };

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

  return (
    <div className="my-4">
      <Container>
        <div className="custom-bread">
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          / Your Shopping Cart
        </div>
        {cartProductDataSelector.length === 0 ? (
          <div className="main-cart-product border-2 border-black-light-4 rounded-3 my-5">
            <div className="d-flex flex-column">
              <div className="cart-head d-inline-block fs-18 font-geologica fw-500 bg-white rounded-pill border-2 border-black-light-1 mx-auto translate-middle-y">
                Cart
              </div>
              <p className="empty-msg h1 fw-lighter text-black-light-2 mx-auto mb-4">
                Your cart is currently empty.
              </p>
              <button
                className="btn-gradient mx-auto px-4 py-2 rounded-5 mb-5"
                onClick={() => {
                  navigate("/");
                }}
              >
                Return To Shop {">"}
              </button>
            </div>
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-lg-8">
              <div className="main-cart-product border-2 border-black-light-4 rounded-3">
                <div className="d-flex">
                  <div className="cart-head d-inline-block fs-18 font-geologica fw-500 bg-white rounded-pill border-2 border-black-light-1 mx-auto translate-middle-y">
                    Cart
                  </div>
                </div>
                <div className="row">
                  {cartProductDataSelector.map((product) => {
                    const cartProduct = cartProductDataSelector.find(
                      (item) => item.id === product.id
                    );
                    const prodQty = cartProduct?.quantity || 0;

                    return (
                      <div key={product.id} className="col-sm-12">
                        <div className="cart-product-card row m-0 align-items-center border-black-light-4 border-start-0 border-top-0 border-end-0 py-4 position-relative">
                          {/* <span
                        className="badge bg-danger position-absolute top-0 end-0 fs-6"
                        style={{ transform: "translate(-20%, 50%)" }}
                      >
                        -{product.discountPercentage}%
                      </span> */}
                          <div className="col-md-1 d-flex">
                            <span
                              onClick={() => {
                                removeProductFromCart(product.id);
                              }}
                              className="cart-product-del-btn d-inline-block fs-5 mx-auto cursor-pointer"
                            >
                              <i className="bi bi-x-lg "></i>
                            </span>
                          </div>
                          <div className="cart-product-img col-md-2 d-flex align-items-center px-1 border-black-light-4 rounded-3">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-md-3 d-flex">
                            <div className="ms-3">
                              <span className="cart-product-detail font-geologica fw-500 text-black cursor-pointer">
                                {product.title}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex">
                            <span className="d-inline-block mx-auto">
                              <div>
                                <button
                                  className="quantity-btn btn-gradient rounded-circle"
                                  onClick={() => {
                                    increaseQuantity(product);
                                  }}
                                >
                                  <span>
                                    <i className="bi bi-plus-lg"></i>
                                  </span>
                                </button>
                                <span className="fs-18 font-geologica fw-500 text-black-light-1 mx-2">
                                  {prodQty}
                                </span>
                                <button
                                  className="quantity-btn btn-gradient rounded-circle"
                                  onClick={() => {
                                    decreaseQauntity(product);
                                  }}
                                >
                                  <span>
                                    <i className="bi bi-dash-lg"></i>
                                  </span>
                                </button>
                              </div>
                            </span>
                          </div>
                          <p className="mb-0 ms-auto col-md-2 d-flex">
                            <span className="d-inline-block mx-auto">
                              $
                              {(
                                product.price -
                                product.price *
                                  (product.discountPercentage / 100)
                              ).toFixed(2) * product.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="main-cart-product border-2 border-black-light-4 rounded-3">
                <div className="d-flex">
                  <div className="cart-head d-inline-block fs-18 font-geologica fw-500 bg-white rounded-pill border-2 border-black-light-1 mx-auto translate-middle-y">
                    Cart Total
                  </div>
                </div>
                <div className="row ">
                  {/* {cartProductDataSelector.map((product) => {
                  const cartProduct = cartProductDataSelector.find(
                    (item) => item.id === product.id
                  );
                  const prodQty = cartProduct?.quantity || 0;

                  return (
                    <div key={product.id} className="col-sm-12">
                      <div className="cart-product-card row m-0 d-flex align-items-center py-4 position-relative">
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
                        <div className="cart-product-img col-md-2 d-flex align-items-center px-1">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="img-fluid"
                          />
                        </div>
                        <div className="cart-product-detail col-md-3 d-flex">
                          <div className="mx-auto">
                            <p className="m-0">
                              <span>{product.title}</span>
                            </p>
                            <p className="m-0">
                              <span>{product.category}</span>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex">
                          <span className="d-inline-block mx-auto">
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
                          </span>
                        </div>
                        <p className="mb-0 ms-auto col-md-2 d-flex">
                          <span className="d-inline-block mx-auto">
                            ${product.price * product.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })} */}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
