import PokemonContainer from './components/container/PokemonContainer'
import Menu from './components/common/Menu'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import CatchedPokemonContainer from './components/container/CatchedPokemonContainer'
import PokemonPageContainer from './components/container/PokemonPageContainer'
import LoginPage from './components/present/pages/LoginPage'

function App () {
  return (
    <Router>
      <div className="App">
        <header >
          <Menu />
        </header>
        <main className={'grid'}>
          <Switch>
            <Route exact path="/">
              <PokemonContainer />
            </Route>
            <Route exact path="/catched">
              <CatchedPokemonContainer />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/pokemon/:id">
              <PokemonPageContainer />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
