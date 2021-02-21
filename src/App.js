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
import CheckIn from "./components/CheckIn";
import { useRouteMatch } from "react-router-dom";
import Attendeesfrom  from "./components/Attendees";
import Attendees from './components/Attendees';

function New(params) {
  /**
   * this is how U can get here 
   * <Route path='/new/:name/:age'><New/></Route>
   */
  let match = useRouteMatch();
  console.log(match)

  return (
    <>
    this is new 
    <h1>here : {match.params.name} -- {match.params.age}</h1>
    </>
  )
}

function App() {
  //** now app subscrip tot he userContext */
  const user = useContext(userContext);

  return (
      <>
        <Navigation />
        
        {
          user?
          <Switch>            
            <Route exact path='/'>
            <Home/> </Route>

            <Route exact path='/meetings'>
            <Meetings/> </Route>

            <Route path='/checkin/:meetingId'> 
            <CheckIn/> </Route>
            
            <Route path="/attendees/:meetingId" component={Attendees}></Route>

            <Route><Home/></Route>

          </Switch>
          :
          null
        }

        {
            !user?
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
