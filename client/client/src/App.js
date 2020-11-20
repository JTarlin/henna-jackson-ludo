import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
//import component
import Welcome from "./Components/Welcome/Welcome";
import Game from "./Components/Game/Game";

function App() {


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route path="/game/:id" component={Game}/>
      </Switch>
    </Router>
  );
}

export default App;
