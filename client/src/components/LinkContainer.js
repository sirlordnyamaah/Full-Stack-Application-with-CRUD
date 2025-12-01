import { useState, useEffect} from 'react'
// import Table from './Table';
// import Form from './Form';

const LinkContainer = (props) => {
    // Get API base URL from environment variable, fallback to relative path for local dev
    const API_BASE_URL = process.env.REACT_APP_API_URL || ''

    //to fetch data
    const fetchData = async () => {
      try {
        let response = await fetch(`${API_BASE_URL}/tracker`)
        console.log(response)
        let data = await response.json()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    const postData = async () => {
      let testData = {
        day: "Test",
        calories: "test.com"
      }
      try {
        let res = await fetch(`${API_BASE_URL}/tracker`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testData)
        })
        console.log(res)
        let message = res.text()
        console.log(message)
      } catch (error){
        console.log(error)
      }
    }

    useEffect(() => {
      //fetchData()
      postData()
    }, [])

  const handleRemove = (index) => {
    /*
            TODO - Create logic for setting the state to filter array and remove favLink at index
        */
  }

  const handleSubmit = (favLink) => {
    /*
            TODO - Create logic to set state and add new favLink to favLinks array in state
        */
  }

  return (
    <div className="container">
      <h1>My Calorie Tracker!</h1>
      <p>Add a day and the amount of calories gained on that day to the table.</p>
      {/*TODO - Add Table Component */}

      <br />

      <h3>Add New</h3>
      {/*TODO - Add Form Component */}
    </div>
  )
}

export default LinkContainer
