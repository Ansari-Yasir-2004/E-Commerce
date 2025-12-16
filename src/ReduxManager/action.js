export const cartProductData = (cartProductData) => {
  return {
    type: "ADD_TO_CART_PRODUCTDATA",
    payload: cartProductData,
  };
};

export const filterProductData = (filterProductData) => {
  return {
    type: "FILTER_CART_PRODUCTDATA",
    payload: filterProductData,
  };
};

export const setUpdProduct = (updatedProduct) => {
  return {
    type: "SET_UPDATED_PRODUCT",
    payload: updatedProduct,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};

export const addRegisteredUser = (registerdUser) => {
  return {
    type: "ADD_REGISTERED_USER",
    payload: registerdUser,
  };
};

export const setCurrentUser = (currentUser) => {
  return {
    type: "SET_CURRENT_USER",
    payload: currentUser,
  };
};

export const logoutCurrentUser = (currentUser) => {
  return {
    type: "LOGOUT_USER",
    payload: currentUser,
  };
};

export const addProductToWishlist = (wishlistProductData) => {
  return {
    type: "ADD_TO_WISHLIST_PRODUCTDATA",
    payload: wishlistProductData,
  };
};

export const removeProductFromWishlist = (wishlistProductData) => {
  return {
    type: "REMOVE_FROM_WISHLIST_PRODUCTDATA",
    payload: wishlistProductData,
  };
};
