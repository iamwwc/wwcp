import React from 'react';
import './App.css';
import { DynamicForm, FormItems } from './components/DynamicForm';
const lists: FormItems = [
    {
        type: 'input',
        componentProps: {
            
        },
        label:'input',
        key:'input'
    }
]
function App() {
  return (
    <div className="App">
      <DynamicForm formLists={lists} hasConfirm={false} setFields={(key, value) => console.log(`${key}:${value}`)}></DynamicForm>
    </div>
  );
}

export default App;
