import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import BreedCreate from './Components/BreedCreate/BreedCreate';
import Detail from './Components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/breedCreate' component={BreedCreate}/>
        <Route path='/detail/:id' component={Detail}/>
        <Route path='/update/:id' component={BreedCreate}/>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
