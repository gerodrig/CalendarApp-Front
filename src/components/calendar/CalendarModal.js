import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./CalendarModal.css";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from "../../actions/event";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if( process.env.NODE_ENV !== 'test' ){
    Modal.setAppElement('#root');
}
//Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, 'hours'); 
const after = now.clone().add(1, 'hours');

//clean the form
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: after.toDate(),
    user: {
                _id: '123',
                name: 'Gerardo'
            }
}

export const CalendarModal = ({ lang = 'EN' }) => {

    //import the dispatch to pass the function
    const dispatch = useDispatch();

    //the use selector will help us be pending on something from the store
    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    
    //state of my start date and end date
    const [ dateStart, setdateStart ] = useState( now.toDate() );
    const [ dateEnd, setdateEnd ] = useState( after.toDate() );
    const [titleValid, setTitleValid] = useState(true);

    //initial state of the form
    const [formValues, setformValues] = useState( initEvent );

    //Destructure notes and title from the formValues
    const { notes, title, start, end } =  formValues;

    //use effect that will keep track of our active notes so it event can be filled when double clicked
    useEffect(() => {
        //if active event exists we will send the values of that to the form
        if(activeEvent){
            setformValues( activeEvent );
        } else {
            setformValues( initEvent );
        }
        
    }, [activeEvent, setformValues])

    //update the statew when the input is entered in the form
    const handleInputChange = ( { target } ) => {
        
        setformValues({
            ...formValues,
            [target.name]: target.value
        })

    }

    //define the function when modal is closed
    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setformValues( initEvent );
    };

    //update state when start date changes 
    const handleStartDateChange = ( e ) => {
        setdateStart( e );
        setformValues({
            ...formValues,
            start: e
        })
    }
    
    //update state when end date changes
    const handleEndDateChange = ( e ) => {
        setdateEnd( e );
        setformValues({
            ...formValues,
            end: e
        })
    }

    //form submiter
    const handleSubmitForm = ( event ) => {
        event.preventDefault();

        //create a moment instance for my start and end values in form
        const momentStart = moment( start );
        const momentEnd = moment( end );

        //check if end date is greater than start date
        if( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error', 'End date must be greater than start date', 'error');            
        }

        //set for validity to false in case there is no title in the textbox
        if( title.trim().length < 2 ){
            return setTitleValid(false);
        }

        //execute persistence in database
        //console.log(formValues);
        if( activeEvent ) {
            dispatch( eventStartUpdate( formValues) );
        } else {
            dispatch( eventStartAddNew( formValues ) );
        }

        //restore form validity
        setTitleValid(true);
        closeModal();

    }

    if( lang.trim() === 'EN'){
        return (
            <Modal
            isOpen={ modalOpen }
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
            ariaHideApp={ !process.env.NODE_ENV === 'test' }
            >
                <h1> {( activeEvent ) ? 'Edit event' : 'New Event'} </h1>
                <hr />
                <form 
                    className="container"
                    onSubmit={ handleSubmitForm }>
                    <div className="form-group">
                        <label>Date and start time</label>
                        <DateTimePicker
                            onChange={ handleStartDateChange }
                            value={ dateStart }
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Date and end time</label>
                        <DateTimePicker
                            onChange={ handleEndDateChange }
                            value={ dateEnd }
                            minDate={ dateStart }
                            className="form-control"
                        />                 
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Title and notes</label>
                        <input
                            type="text"
                            className={ `form-control ${ !titleValid && 'is-invalid' }`}
                            placeholder="Event name"
                            name="title"
                            autoComplete="off"
                            value={ title }
                            onChange={ handleInputChange }
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            Short description
                        </small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notes"
                            rows="5"
                            name="notes"
                            value={ notes }
                            onChange={ handleInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">
                            Additional information
                        </small>
                    </div>

                    <button type="submit" className="btn btn-outline-primary w-100 mt-5">
                        <i className="far fa-save"></i>
                        <span> Save</span>
                    </button>
                </form>
            </Modal>
        );
    }
    else {
        return (
            <Modal
            isOpen={ modalOpen }
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-background"
            ariaHideApp={ !process.env.NODE_ENV === 'test' }
            >
                <h1> {( activeEvent ) ? `Modifier l'événement` : 'Nouvel évènement' } </h1>
                <hr />
                <form 
                    className="container"
                    onSubmit={ handleSubmitForm }>
                    <div className="form-group">
                        <label>Date et heure de début</label>
                        <DateTimePicker
                            onChange={ handleStartDateChange }
                            value={ dateStart }
                            className="form-control"
                            locale='fr-ca'
                        />
                    </div>

                    <div className="form-group">
                        <label>Date et heure de fin</label>
                        <DateTimePicker
                            onChange={ handleEndDateChange }
                            value={ dateEnd }
                            minDate={ dateStart }
                            className="form-control"
                            locale='fr-ca'
                        />                 
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titre et notes</label>
                        <input
                            type="text"
                            className={ `form-control ${ !titleValid && 'is-invalid' }`}
                            placeholder="Nom de l'événement"
                            name="title"
                            autoComplete="off"
                            value={ title }
                            onChange={ handleInputChange }
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            Brève description
                        </small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Remarques"
                            rows="5"
                            name="notes"
                            value={ notes }
                            onChange={ handleInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">
                            Informations Complémentaires
                        </small>
                    </div>

                    <button type="submit" className="btn btn-outline-primary w-100 mt-5">
                        <i className="far fa-save"></i>
                        <span> Enregistrer</span>
                    </button>
                </form>
            </Modal>
        );
    }
};
