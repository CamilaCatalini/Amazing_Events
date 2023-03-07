function searchEvents(element){
    search(element.value, upcoming_events);
}

function selectCategory(element){
    changeCardsForCategory(element, upcoming_events);
}

function getUpcomingEvents(){

    let array_past_events = [];

    for( const event of data.events){
        if(data.currentDate < event['date']){
            array_past_events.push(event);
        }     
    }
    return(array_past_events);
}

let upcoming_events = getUpcomingEvents();
createCards(upcoming_events);
createCategories(upcoming_events);