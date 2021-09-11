import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import AppLayout from "../appLayout/AppLayout";
import Dogoxo from "../projects/Dogoxo";
import KittyFur from "../projects/KittyFur";
import Petsly from "../projects/Petsly";
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
        <Router>
          <AppLayout>
              <Switch>
                  <Route exact path="/">
                      <Redirect to="/dogoxo"/>
                  </Route>
                  <Route path="/dogoxo">
                    <Dogoxo/>
                  </Route>
                  <Route path="/kittyFur">
                      <KittyFur/>
                  </Route>
                  <Route path="/petsly">
                      <Petsly/>
                  </Route>
              </Switch>
          </AppLayout>
        </Router>
    </div>
  );
}

export default App;
