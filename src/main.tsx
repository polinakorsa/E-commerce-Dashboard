import './index.css';
import { createRoot } from 'react-dom/client';
import Router from './Router.tsx';
import { Provider } from 'react-redux';
import store from './store/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router />
  </Provider>
);

//1. Store - y
//2. Add store to react app - y
//3. Reducer, action
//4.
