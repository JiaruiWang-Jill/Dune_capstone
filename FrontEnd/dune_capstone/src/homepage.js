import { useState } from 'react';
import { useNavigate } from "react-router-dom";
function HomePage() {
    const [inputValue, setInput] = useState('');
    const [fetchError, setFetchError] = useState('');
    let navigate = useNavigate(); 
    function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: inputValue
        };
        fetch('http://127.0.0.1:5000/task/1', requestOptions)
            .then(response => 
              {
              if (!response.ok) { 
                setFetchError("Error, status code is "+response.status);
                throw new Error("Error, status code is "+response.status)
              }
              console.log("response json")
              return response.json() 
            }
            ).then(data =>{ 
                navigate( "/resultpage", {state:{plaintext: data, tasklist: JSON.parse(inputValue).TaskList}})
              }
            ).catch(error => {
              console.log("error", error)
            })
            
    }

    return (
      <div className="HomePage">
        <label>
            Command Line:
            <input value={inputValue} onInput={e => setInput(e.target.value)} type="text" name="task_json" />
        </label>
         
        <button onClick={handleSubmit} type="submit" value="Submit"> Submit </button>
        <div >{fetchError} </div>
        
      </div>
    );
  }
  
  export default HomePage;
  