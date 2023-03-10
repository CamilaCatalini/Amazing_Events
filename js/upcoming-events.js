function getUpcomingEvents(){
    let array_upcoming_events = [];

    for( const event of data.events){
        if(data.currentDate < event['date']){
            array_upcoming_events.push(event);
        }     
    }
    return(array_upcoming_events);
}

function searchEvents(element){
    //BUSCADOR: SI EL ARRAY QUE CONTIENE LOS EVENTOS SELECCIONADOS ESTA VACIO, BUSCA EN
    //TODOS LOS EVENTOS FUTUROS, SINO SOLO EN LOS SELECCIONADOS POR CATEGORIA.
    if(array_selected_events.length == 0){
        search(element.value, upcoming_events);
    }else{
        search(element.value, array_selected_events);
    }
}

function selectCategoryChecked(element){
    //SI AL SELECCIONAR O DESELECCIONAR UNA CATEGORIA EL INPUT DEL BUSCADOR
    //CONTIENE UN ELEMENTO, LO ELIMINA.
    document.getElementById("search").value = '';
    
    //OBJETO QUE VA A CONTENER TODAS LAS CATEGORIAS SELECCIONADAS Y
    //TODOS LOS EVENTOS SEGUN ESAS CATEGORIAS.
    var obj_data;

    obj_data = selectCategory(element, array_selected_categories, array_selected_events, upcoming_events)

    array_selected_events = obj_data['events'];
    array_selected_categories = obj_data['array_categories'];
    
}

//ARRAY DE STRINGS QUE SE CARGA CON CATEGORIAS SEGUN LA CATEGORIA ELEGIDA.
let array_selected_categories = [];
//ARRAY DE EVENTOS QUE SE CARGA SOLO CON LOS EVENTOS SEGUN LA CATEGORIA SELECCIONADA.
let array_selected_events = [];

//getUpcomingEvents: ME DEVUELVE EN upcoming_events LOS EVENTOS FUTUROS. 
let upcoming_events = getUpcomingEvents();

createCards(upcoming_events);
createCategories(upcoming_events);