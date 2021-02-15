import logo from './logo.svg';

// order is important for overriding.
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import './index.css';

import Home from "./components/Home";
import UserProvider from "./providers/UserProvider";
import Navigation from "./components/Navigation";
function App() {
  return (
    <UserProvider>
      <Navigation />
      <Home/>
    </UserProvider>
  );
}

export default App;
