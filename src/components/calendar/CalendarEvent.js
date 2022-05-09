import React from 'react'

export const CalendarEvent = ( {event} ) => {

    //console.log('Checate esta', event);

    const { title, user } = event

    return (
        <div>
            <strong>{ title }</strong>
            <span>- { user.name }</span>
        </div>
    )
}
