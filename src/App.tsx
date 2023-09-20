import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Disperse from './Components/Disperse';



function App() {
  const [inputArr, setInputArr] = useState<string[]>(['harsh']);

  const handleClick = () => {
    setInputArr([...inputArr, 'newInput'])
  }
  return (
    <div className="App">
      <>
        {/* <button onClick={handleClick}>Add Input Box</button>
        {inputArr.map((x) => {
          return <p><input name={x} value={''} /></p>
        })} */}
        <Disperse/>
      </>
    </div>
  )
}

export default App
