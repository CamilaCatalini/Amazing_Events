function searchEvents(element){
    search(element.value, past_events);
}

function getPastEvents(){

    let array_past_events = [];

    for( const event of data.events){
        if(data.currentDate > event['date']){
            array_past_events.push(event);
        }     
    }
    return(array_past_events);
}

let past_events = getPastEvents();
createCards(past_events)
createCategories(past_events);