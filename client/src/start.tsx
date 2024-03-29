import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./common/Redux/reducer";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

import { Welcome } from "./components/Welcome/Welcome";
import { App } from "./components/App/App";

import { init } from "./common/Socket/socket";

let elem;

if (location.pathname === "/welcome") {
  elem = <Welcome />;
} else {
  init(store);
  elem = (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(elem, document.querySelector("main"));

// const moduleConfig: any = module;

//  if (moduleConfig) {
//      moduleConfig.hot.accept();
//  }
