import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/event';

export const DeleteEventFab = ({lang = 'EN'}) => {

     //import the dispatch so we can trigger actions
    const dispatch = useDispatch();

    let message = ' Delete Event'

    if(lang.trim() !== 'EN'){
        message = ` supprimer l'événement`
    }

    const handleDelete = () => {

        dispatch( eventStartDelete() );

    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={ handleDelete }>

            <i className="fas fa-trash"></i>
            <span>{ message }</span>
        </button>
    )
}
