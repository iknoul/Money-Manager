import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {FirstContext} from './context'
import DashBoard from './pages/DashBoard';
import Expenses from './pages/Expenses';
import Wallet from './pages/Wallet';

import { useState } from 'react';

const App = ()=>{

 
  const [categories, setCategories] = useState([{category:'Homing',amount:0,budget:0,date:0},
    {category:'Food',amount:0,budget:0,date:0},
    {category:'Clothing',amount:0,budget:0,date:0},
    {category:'Travel',amount:0,budget:0,date:0},
    {category:'Health',amount:0,budget:0,date:0}]);
  const [data, setData] = useState([])
    const [status, setStatus] = useState('none')

  return(<>
      <BrowserRouter>
      <FirstContext.Provider value={{categories, setCategories, data, setData}}>
        <Routes>
          <Route path='/' element={<DashBoard/>}></Route>
          <Route path='/e' element={<Expenses/>}></Route>
          <Route path='/d' element={<Wallet/>}></Route>
          
        </Routes>
      </FirstContext.Provider>
      </BrowserRouter>
 
    
  </>)
}

export default App