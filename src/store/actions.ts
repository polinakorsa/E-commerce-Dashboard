//action - object, action creator - function => object

export const deleteUser = (payload) => {
  return {
    type: 'DELETE_USER',
    payload,
  };
};

export const getUsersLoading = () => {
  return {
    type: 'GET_USERS_LOADING',
  };
};

export const getUsersSuccess = (payload) => {
  return {
    type: 'GET_USERS_SUCCESS',
    payload,
  };
};

export const getUsersError = (payload) => {
  return {
    type: 'GET_USERS_ERROR',
    payload,
  };
};

export const setActiveUser = (payload) => {
  return {
    type: 'SET_ACTIVE_USER',
    payload,
  };
};

export const editUser = (payload) => {
  return {
    type: 'EDIT_USER',
    payload,
  };
};

export const createUser = (payload) => {
  return {
    type: 'CREATE_USER',
    payload,
  };
};

export const toggleModalVisibility = () => {
  return {
    type: 'TOGGLE_MODAL_VISIBILITY',
  };
};

export const userSelection = (payload) => ({
  type: 'USER_SELECTION',
  payload,
});

export const bulkUserSelection = () => ({
  type: 'BULK_USER_SELECTION',
});

export const deleteALLUserSelection = (payload) => ({
  type: 'BULK_DELETE_USER_SELECTION',
  payload,
});

//...Products

export const getProductsLoading = () => {
  return {
    type: 'GET_PRODUCTS_LOADING',
  };
};

export const getProductsSuccess = (payload) => {
  return {
    type: 'GET_PRODUCTS_SUCCESS',
    payload,
  };
};

export const getProductsError = (payload) => {
  return {
    type: 'GET_PRODUCTS_ERROR',
    payload,
  };
};

export const deleteProduct = (payload) => {
  return {
    type: 'DELETE_PRODUCT',
    payload,
  };
};

export const setActiveProduct = (payload) => {
  return {
    type: 'SET_ACTIVE_PRODUCT',
    payload,
  };
};

export const editProduct = (payload) => {
  return {
    type: 'EDIT_PRODUCT',
    payload,
  };
};

export const createProduct = (payload) => {
  return {
    type: 'CREATE_PRODUCT',
    payload,
  };
};

export const toggleModalVisibilityProduct = () => {
  return {
    type: 'TOGGLE_MODAL_VISIBILITY_PRODUCT',
  };
};

export const productSelection = (payload) => ({
  type: 'PRODUCT_SELECTION',
  payload,
});

export const bulkProductsSelection = () => ({
  type: 'BULK_PRODUCTS_SELECTION',
});

export const deleteAllProductsSelection = (payload) => ({
  type: 'BULK_DELETE_PRODUCTS_SELECTION',
  payload,
});
