export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.log("Save State Error ===>", error);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }

    const loadState = JSON.parse(serializedState);

    return {
      cartProductData: loadState.cartProductData || [],
      registeredUser: loadState.registeredUser || [],
      currentUser: loadState.currentUser || null,
      wishlistProductData: loadState.wishlistProductData || [],
    };
  } catch (error) {
    console.log("Load State Error ===>", error);
    return undefined;
  }
};
