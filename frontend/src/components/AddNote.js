import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: 'General'
    })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        setNote({
            title: "",
            description: "",
            tag: "General"
        })
        e.preventDefault()
        addNote(note)
    }
    return (
        <div className='container my-3'>
            <h2>Add a Task </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-4 container">
                    <h5><label htmlFor="title" className="form-label ">Title</label></h5>
                    <input type="text" className="form-control" name='title' id="title" value={note.title} onChange={onChange} />

                </div>
                <div className="mb-3 container">
                    <h5><label htmlFor="description" className="form-label ">Description</label></h5>
                    <textarea type="text" className="form-control" value={note.description} name='description' id="description" rows="3" onChange={onChange} />

                    <button type="submit" className="btn btn-primary  my-2">Add Task</button>
                    {/* This button will be triggered when user hits enter key */}
                    <button type="submit" style={{ display: 'none' }}></button>
                </div>

            </form>
        </div>
    )
}

export default AddNote
