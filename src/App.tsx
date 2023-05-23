import React from 'react';

import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import CustomHeader from './components/header/CustomHeader';
import { HttpServiceClient } from './services/HttpServiceClient';

 async function tikla(){
  let httpServiceClient = new HttpServiceClient()

  let response = await httpServiceClient.getAsync<deneme>({fullEndPoint:"https://jsonplaceholder.typicode.com/todos/1"})
  let a = 4
  debugger
}
interface deneme{

  userId: number,
  id: number,
  title: string,
  completed: boolean

}
function App() {
  return (
    <div className="App">
      <CustomNavbar/>
      <CustomHeader/>
      <br />
      <br />
      <button onClick={tikla}>asdsadsa</button>
    </div>
  );
}

export default App;
