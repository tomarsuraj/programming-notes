import React from 'react'
import PostInfoCard from '../Components/PostInfoCard'

const Explore = () => {
  return (
    <div className="screenContainer">
      <div className="searchFilterContainer">
        <div className="searchFilterInput">
          <label for="fname">First name:</label>
          <input type="text" id="fname" name="fname" />
        </div>
        <div className="searchFilterInput">
          <label for="fname">Number Of Post TO Fetch:</label>
          <input type="number" id="fname" name="fname" />
        </div>
        <div className="searchFilterInput">
          <label for="fname">Post Category:</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <button>Submit</button>
      </div>
      <PostInfoCard />
      <PostInfoCard />
      <PostInfoCard />
      <PostInfoCard />
    </div>
  )
}

export default Explore
