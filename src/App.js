import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import ManageForm from "./ManageForm";
import Home from "./Home";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <div className="container mx-auto px-3">
            <Switch>
              <Route path="/create">
                <ManageForm />
              </Route>
              <Route path="/update">
                <ManageForm />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App;