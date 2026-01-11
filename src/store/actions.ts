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

export const toggleUserSelection = (userId) => ({
  type: 'TOGGLE_USER_SELECTION',
  payload: userId,
});
