import logo from './logo.svg';

// order is important for overriding.
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';

import { Route, Switch} from "react-router-dom";
import {  useCallback, useContext} from "react";
import Home from "./components/Home";
import UserProvider, { userContext } from "./providers/UserProvider";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Meetings from "./components/Meetings";
import firebase from "./firebase/firebase";

function App() {
  //** now app subscrip tot he userContext */
  const user = useContext(userContext);

  return (
      <>
        <Navigation />

        {
          user.data?
          <Switch>
            <Route exact path='/'>
            <Home/> </Route>

            <Route exact path='/meetings'>
            <Meetings/> </Route>

            <Route><Home/></Route>

          </Switch>
          :
          null
        }

        {
            !user.data?
          <Switch> 
            {/** once it will render a Comonent
            it will go out */}

            

            <Route path='/signin'>
              <SignIn/>
            </Route>

            <Route path='/signup'>
              <SignUp/>
            </Route>

            <Route> <SignIn/> </Route>

          </Switch>
          :
          null
        }
      </>
   );
}

export default App;
