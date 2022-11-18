import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation-bar/navigation-bar.component'
import Home from './routes/home/home.component'
import OptionAdd from './components/options/option-add/option-add.component';
import OptionEdit from './components/options/option-edit/option-edit.component';
import OptionsImport from './components/options/options-import/options-import.component';

function App() {
  return (
    <Routes>    
      <Route path='/options-tracker' element={<Navigation />}>
        <Route index element={<Home />}/>     
        <Route path='/options-tracker/option/add' element={<OptionAdd />}/>    
        <Route path='/options-tracker/option/edit/:id' element={<OptionEdit />}/>    
        <Route path='/options-tracker/option/import' element={<OptionsImport />} />
      </Route>
    </Routes>
  );
}

export default App;
