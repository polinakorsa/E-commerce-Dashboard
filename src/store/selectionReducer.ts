const initialState = {
  selectedUsersArray: [],
};

export default function userDataConversionAndModification(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'TOGGLE_USER_SELECTION':
      return {
        ...state,
        isSelected: action.payload,
      };
    default:
      return state;
  }
}
