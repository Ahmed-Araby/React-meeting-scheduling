import logo from './logo.svg';

// order is important for overriding.
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';

import { Route, Switch} from "react-router-dom";

import Home from "./components/Home";
import UserProvider from "./providers/UserProvider";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import firebase from "./firebase/firebase";

function App() {
  return (
     <UserProvider>
        <Navigation />

        <Switch> 
          {/** once it will render a Comonent
          it will go out */}

          <Route exact path='/'>
          <Home/> </Route>

          <Route path='/signin'>
            <SignIn/>
          </Route>

          <Route path='/signup'>
            <SignUp/>
          </Route>

          <Route>not implemented yet</Route>

        </Switch>
      </UserProvider>
   );
}

export default App;
