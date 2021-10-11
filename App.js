import Menu from "./src/components/Menu";
import React from 'react';
import { Provider } from "react-redux";
import store from "./src/store/store";

export default function App() {

  return (
    <Provider store={store}>
      <Menu/>
    </Provider>
  );
}
