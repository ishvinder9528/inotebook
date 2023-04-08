import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

const Notes = () => {
    const context = useContext(NoteContext)
    const { notes } = context
    return (
        <>
            <AddNote />
            <div className='my-5'>
                <h2>Your Notes </h2>
                <div className='row my-3 '>
                    {notes.map((note) => {
                        return (
                            <NoteItem key={note._id} note={note} />

                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
