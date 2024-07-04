import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './Redux/Store.jsx'
import { Provider } from 'react-redux'
import { initializeContract } from "../utils/icp.js"

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// );



// import { initializeContract } from "./utils/icp";

// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/css/bootstrap.min.css";

window.renderICPromise = initializeContract()
  .then(() => {
    ReactDOM.render(
      // <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
      // </React.StrictMode >
      ,
      document.getElementById("root")
    );
  }).catch(console.error);


