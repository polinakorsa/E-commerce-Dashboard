const initialState = {
  dataProducts: [],
  activeProduct: null,
  loading: false,
  error: null,
  isModalOpen: false,
  selectedProducts: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_PRODUCTS_SUCCESS':
      return {
        ...state,
        dataProducts: action.payload,
        loading: false,
      };

    case 'GET_PRODUCTS_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        dataProducts: state.dataProducts.filter(
          (product) => product.id !== action.payload
        ),
        loading: false,
      };
    case 'SET_ACTIVE_PRODUCT':
      return {
        ...state,
        activeProduct: action.payload,
      };
    case 'EDIT_PRODUCT':
      return {
        ...state,
        dataProducts: state.dataProducts.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        loading: false,
      };
    case 'CREATE_PRODUCT':
      return {
        ...state,
        dataProducts: [action.payload, ...state.dataProducts],
        loading: false,
      };
    case 'TOGGLE_MODAL_VISIBILITY_PRODUCT':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case 'PRODUCT_SELECTION':
      return {
        ...state,
        selectedProducts: state.selectedProducts.includes(action.payload)
          ? state.selectedProducts.filter((id) => id !== action.payload)
          : [...state.selectedProducts, action.payload],
      };
    case 'BULK_PRODUCTS_SELECTION':
      return {
        ...state,
        selectedProducts:
          state.selectedProducts.length === state.dataProducts.length
            ? []
            : state.dataProducts.map((product) => product.id),
      };
    case 'BULK_DELETE_PRODUCTS_SELECTION':
      return {
        ...state,
        dataProducts: state.dataProducts.filter(
          (product) => !state.selectedProducts.includes(product.id)
        ),
        selectedProducts: [],
      };
    default:
      return state;
  }
}
