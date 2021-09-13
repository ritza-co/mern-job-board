import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import SubmitJob from './components/submitJob/submitJob';
import ViewJobs from './components/viewJobs/viewJobs';

const DisplayForm = () => {

  const [name, setName] = useState("")
  const [nameId, setNameId] = useState(null)
  const [retrievedName, setRetrievedName] = useState("")

  const postWithAxios = (e) => {
    e.preventDefault()
    const data = { name: name}
    axios.post('https://mern-stack-uianow.codecapsules.co.za/api/person', data)
        .then(response => {
          //console.log(response)
          setNameId(response.data.id)
        })
  }

  const getWithAxios = (e) => {
    e.preventDefault()
    axios.get('https://mern-stack-uianow.codecapsules.co.za/api/person/' + nameId)
      .then(response => {
        console.log(response)
        setRetrievedName(response.data.name)
      })
  }

  return(
    <div className="displayFormContainer">
      <p>Hey there {retrievedName ? retrievedName : null}</p>
      <form onSubmit={postWithAxios}>
        <input type="text" placeholder="Name..." value={name} 
          onChange={e => setName(e.target.value)} name="name" />
        <button type="submit">Submit</button>
      </form>
      <button onClick={getWithAxios}>View Personal Message</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Job Board</h3>
      </header>
      <SubmitJob />
      <ViewJobs />
    </div>
  );
}

export default App;
