import React, { useState, useContext, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'


const Notes = () => {


    const ref = useRef(null);

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "General",
    });

    const updateNote = (note) => {
        ref.current.click()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({
            title: "",
            description: "",
            tag: "General",
        });
    };

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const context = useContext(NoteContext)
    const { notes, getNotes, addNote } = context

    return (
        <>
            <AddNote />

            {/* modal */}
            <div>
                <button
                    type="button"
                    ref={ref}
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Launch demo modal
                </button>

                <div
                    className="modal fade "
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Edit Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 my-4 container">
                                        <h5>
                                            <label htmlFor="etitle" className="form-label ">
                                                Title
                                            </label>
                                        </h5>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="etitle"
                                            id="etitle"
                                            value={note.title}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className=" my-4 mb-3 container">
                                        <h5>
                                            <label htmlFor="edescription" className="form-label ">
                                                Description
                                            </label>
                                        </h5>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            value={note.description}
                                            name="edescription"
                                            id="edescription"
                                            rows="3"
                                            onChange={onChange}
                                            onKeyDown={handleKeyDown}
                                        />

                                        <h5>
                                            <label htmlFor="etag" className="form-label my-4 mb-3">
                                                Tag
                                            </label>
                                        </h5>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={note.tag}
                                            name="etag"
                                            id="etag"
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="container">
                                        <button type="submit" className=" btn btn-primary  my-2">
                                            Add Note
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Modify Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Note Items */}
            <div className='my-5'>
                <h2>Your Notes </h2>
                <div className='row my-3 '>
                    {notes.map((note) => {
                        return (
                            <NoteItem key={note._id} updateNote={updateNote} note={note} />

                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
