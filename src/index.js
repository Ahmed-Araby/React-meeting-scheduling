import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // css styles from here will over ride the ./index.css file.
import reportWebVitals from './reportWebVitals';


import { BrowserRouter} from "react-router-dom";
import UserProvider from './providers/UserProvider';



ReactDOM.render(
  <BrowserRouter> {/** this have to be the root  */}
    <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    </React.StrictMode>    
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
