import { useState, useEffect } from 'react';
import './App.css';
import Home from './Component/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Alert from './Component/Alert';
import io from "socket.io-client";

const socket = io.connect("");

function App() {

  const [alert, setAlert] = useState(null);
  const showAlret = (message, type) => {
     setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  const joinRoom = (roo,email) => {
    console.log(roo, "roo");
    if (roo !== "") {
      socket.emit("join_room", {roo,email});
    }
  }

  return (
    <>
      <Provider store={store}>
        <Router>
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlret={showAlret}/>
              </Route>
              <Route exact path="/login">
                <Login showAlret={showAlret} />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;