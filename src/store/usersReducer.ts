const initialState = {
  data: [],
  activeUser: null,
  loading: false,
  error: null,
  isModalOpen: false,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USERS_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'GET_USERS_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'TOGGLE_MODAL_VISIBILITY':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };

    case 'DELETE_USER':
      return {
        ...state,
        data: state.data.filter((user) => user.id !== action.payload),
      };
    case 'SET_ACTIVE_USER':
      return {
        ...state,
        activeUser: action.payload,
      };
    case 'EDIT_USER':
      return {
        ...state,
        data: state.data.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'CREATE_USER':
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    default:
      return state;
  }
}
