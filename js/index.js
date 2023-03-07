function searchEvents(element){
    search(element.value, data.events);
}

function selectCategory(element){
    changeCardsForCategory(element, data.events);
}

createCards(data.events);
createCategories(data.events);

