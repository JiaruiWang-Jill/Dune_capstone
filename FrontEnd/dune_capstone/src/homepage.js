import { useState } from 'react';
import { useNavigate } from "react-router-dom";
function HomePage() {
    const [inputValue, setInput] = useState('');
    let navigate = useNavigate(); 
    function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: inputValue
        };
        fetch('http://127.0.0.1:5000/task/1', requestOptions)
            .then(response => response.json())
            .then(data =>{
                navigate( "/resultpage", {state:{plaintext: JSON.parse(data[0])}})
              }
              )
             
    }

    return (
      <div className="HomePage">
        <label>
            Command Line:
            <input value={inputValue} onInput={e => setInput(e.target.value)} type="text" name="task_json" />
        </label>
         
        <button onClick={handleSubmit} type="submit" value="Submit"> Submit </button>
 
      </div>
    );
  }
  
  export default HomePage;
  