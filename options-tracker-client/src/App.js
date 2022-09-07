import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation-bar/navigation-bar.component'
import Home from './routes/home/home.component'
import OptionAdd from './components/options/option-add/option-add.component';

function App() {
  return (
    <Routes>
      
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}/>     
        <Route path='/add-option' element={<OptionAdd />}/>     
      </Route>
    </Routes>
  );
}

export default App;
