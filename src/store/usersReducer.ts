const initialState = {
  data: [],
  activeUser: null,
  loading: false,
  error: null,
  isModalOpen: false,
  selectedUsers: [],
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
        loading: false,
      };
    case 'CREATE_USER':
      return {
        ...state,
        data: [action.payload, ...state.data],
        loading: false,
      };
    case 'USER_SELECTION':
      return {
        ...state,
        selectedUsers: state.selectedUsers.includes(action.payload)
          ? state.selectedUsers.filter((id) => id !== action.payload)
          : [...state.selectedUsers, action.payload],
      };
    case 'BULK_USER_SELECTION':
      return {
        ...state,
        selectedUsers:
          state.selectedUsers.length === state.data.length
            ? []
            : state.data.map((user) => user.id),
      };
    case 'BULK_DELETE_USER_SELECTION':
      return {
        ...state,
        data: state.data.filter(
          (user) => !state.selectedUsers.includes(user.id)
        ),
        selectedUsers: [],
      };
    default:
      return state;
  }
}
