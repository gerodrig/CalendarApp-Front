import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';

import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
//for french
import 'moment/locale/fr-ca';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
//for french
import { messages } from '../../helpers/calendar-messages-fr';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


let localizer = momentLocalizer(moment); // or globalizeLocalizer


// const events = [{
//     title: 'Birthday boss',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours' ).toDate(),
//     bgcolor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Gerardo'
//     }
// }]

export const CalendarScreen = () => {
    
    //import the dispatch so we can trigger actions
    const dispatch = useDispatch();

    //read from the store the events
    const { events, activeEvent } = useSelector( state => state.calendar );

    //read the uid form the store
    const { uid } = useSelector( state => state.auth );


    //define the current language
    const [language, setLanguage] = useState(' FR');
    //console.log(language);

    const languageHandler = (lang) => {

        if( lang === ' EN'){
            return setLanguage(' FR');
        }

        return setLanguage(' EN');
    }

    //define current state to save the view
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month');

    //load events
    useEffect(() => {
        
        dispatch( eventStartLoading() )

    }, [dispatch]);

    const onDoubleClick =  (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive( e ) );
    }

    const onViewChange = (e) => {
        //every time we change views the events triggers where we are located Month,Week,day,Agenda
        //console.log(e)
        setLastView( e );
        localStorage.setItem('lastView', e);
    }

    //You can implement that when user clicks anywhere in the calendar the modal can be opened and autofills the date where
    // the cursonr was clicked
    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }
    
    const eventStyleGetter = ( event, start, end, isSelected ) => { 

        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#EABFB9',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return { style }

    }

    if( language === ' EN'){

        moment.locale('en');
        localizer = momentLocalizer(moment);
        return (
            <div className="calendar-screen">
                <Navbar onSetLanguage={languageHandler} />
                {
    
                <BigCalendar
                    localizer={ localizer }
                    events={ events }
                    startAccessor="start"
                    endAccessor="end"
                    onDoubleClickEvent={ onDoubleClick } 
                    onSelectEvent={ onSelectEvent }
                    onView={ onViewChange }
                    view={ lastView }
                    //hide delete button when clicking on any part of the calendar
                    onSelectSlot={ onSelectSlot }
                    selectable={ true }
                    //for french
                    //messages={ messages }
                    eventPropGetter={ eventStyleGetter }
                    components={{
                        event: CalendarEvent
                    }}
                />
                }
                <AddNewFab />

                {
                    (activeEvent) && <DeleteEventFab lang={ language }/>
                }
                
                <CalendarModal lang={ language } />
            </div>
        )
    } else {

        moment.locale('fr-ca');
        localizer = momentLocalizer(moment);

        return (
            <div className="calendar-screen">
                <Navbar onSetLanguage={languageHandler} />
                {
    
                <BigCalendar
                    localizer={ localizer }
                    events={ events }
                    startAccessor="start"
                    endAccessor="end"
                    onDoubleClickEvent={ onDoubleClick } 
                    onSelectEvent={ onSelectEvent }
                    onView={ onViewChange }
                    view={ lastView }
                    //for french
                    onSelectSlot={ onSelectSlot }
                    selectable={ true }
                    messages={ messages }
                    eventPropGetter={ eventStyleGetter }
                    components={{
                        event: CalendarEvent
                    }}
                />
                }
                <AddNewFab />

                {
                    (activeEvent) && <DeleteEventFab lang={ language }/>
                }

                <CalendarModal lang={ language }  />
            </div>
        )
    }
    
}
