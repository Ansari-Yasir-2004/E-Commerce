import React from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "../assets/images/png/company-logo.png";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const cartProductDataSelector = useSelector((state) => state.cartProductData);
  const currentUserExist = useSelector((state) => state.currentUser);
  const wishlistProductDataSelector = useSelector(
    (state) => state.wishlistProductData
  );

  let cartQuantity = 0;
  cartProductDataSelector.map((product) => {
    // console.log("Product Qty ===>", product.quantity);
    return (cartQuantity += product.quantity);
  });
  // console.log("Cart Qty ===>", cartQuantity);

  return (
    <header>
      <Container>
        <div className="main-header d-flex justify-content-between align-items-center py-2">
          <div className="company-logo">
            <Link to="/">
              <img src={CompanyLogo} alt="Company Logo" className="img-fluid" />
            </Link>
          </div>
          <div className="header-serach-bar h-100 w-50 d-flex align-items-center">
            <input
              className="h-100 ps-4 flex-grow-1"
              type="text"
              placeholder="i'm shopping for..."
            />
            <div className="serach-bar-dropdown h-100 d-flex align-items-center">
              <a className="ps-3 me-2">
                All categories{" "}
                <span>
                  <i className="bi bi-caret-down-fill"></i>
                </span>
              </a>
              <span className="serach-bar-btn d-flex justify-content-center align-items-center rounded-circle">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-4">
            <div className="fs-3">
              <Link to="/profile">
                <i className="bi bi-person"></i>
              </Link>
            </div>
            <div className="fs-3">
              <Link to="/wishlist" className="position-relative">
                <i className="bi bi-suit-heart"></i>
                {wishlistProductDataSelector.length > 0 && (
                  <span
                    className="badge position-absolute top-0 start-100 translate-middle-x rounded-circle"
                    style={{
                      fontSize: "12px",
                      backgroundColor: "var(--red-color)",
                    }}
                  >
                    {wishlistProductDataSelector.length}
                  </span>
                )}
              </Link>
            </div>
            <div className="fs-3">
              <Link to="/cart" className="position-relative">
                <i className="bi bi-cart"></i>
                {cartQuantity > 0 && currentUserExist !== null && (
                  <span
                    className="badge position-absolute top-0 strat-100 translate-middle-x rounded-circle"
                    style={{
                      fontSize: "12px",
                      backgroundColor: "var(--red-color)",
                    }}
                  >
                    {cartQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
