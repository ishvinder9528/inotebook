import React from 'react'

const Home = () => (
  <div className='container my-3'>
    <h2>Add a Task </h2>
    <form>
      <div className="mb-3 my-4 container">
        <h5><label for="title" className="form-label ">Title</label></h5>
        <input type="text" className="form-control" id="title" />

      </div>
      <div className="mb-3 container">
      <h5><label for="title" className="form-label ">Description</label></h5>
        <textarea type="text" className="form-control" id="description" rows="3" > </textarea>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" className="btn btn-primary container">Add Task</button>
    </form>

    <div className='my-5'>
    <h2>Your Notes </h2>
    </div>
  </div>
)

export default Home
