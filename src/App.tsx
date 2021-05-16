import './App.css';
import PokemonContainer from './components/container/PokemonContainer'
import Menu from './components/common/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CatchedPokemonContainer from './components/container/CatchedPokemonContainer';
import PokemonPageContainer from './components/container/PokemonPageContainer';

function App() {

  return (
    <Router>
      <div className="App">
        <header >
          <Menu />

        </header>
        <body>
          <main className={"grid"}>
            <Switch>
              <Route exact path="/">
                <PokemonContainer />
              </Route>
              <Route exact path="/catched">
                <CatchedPokemonContainer />
              </Route>
              <Route exact path="/pokemon/:id">
                <PokemonPageContainer />
              </Route>
            </Switch>
          </main>
        </body>
      </div>
    </Router>
  );
}

export default App;
