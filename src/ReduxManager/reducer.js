const initialState = {
  cartProductData: [],
  registeredUser: [],
  currentUser: null,
  wishlistProductData: [],
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART_PRODUCTDATA":
      return {
        ...state,
        cartProductData: [...state.cartProductData, action.payload],
      };
    case "FILTER_CART_PRODUCTDATA":
      return {
        ...state,
        cartProductData: action.payload,
      };
    case "SET_UPDATED_PRODUCT":
      return {
        ...state,
        cartProductData: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartProductData: [],
      };
    case "ADD_REGISTERED_USER":
      return {
        ...state,
        registeredUser: [...state.registeredUser, action.payload],
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: null,
      };
    case "ADD_TO_WISHLIST_PRODUCTDATA":
      return {
        ...state,
        wishlistProductData: [...state.wishlistProductData, action.payload],
      };
    case "REMOVE_FROM_WISHLIST_PRODUCTDATA":
      return {
        ...state,
        wishlistProductData: action.payload,
      };
    default:
      return state;
  }
};

export default myReducer;
