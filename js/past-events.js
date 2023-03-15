function getPastEvents(){
    let array_past_events = [];

    for( const event of data.events){
        if(data.currentDate > event['date']){
            array_past_events.push(event);
        }     
    }
    return(array_past_events);
}

/*
SE REEMPLAZO POR *addEventListener PARA CATEGORIAS.

function searchEvents(element){
    //BUSCADOR: SI EL ARRAY QUE CONTIENE LOS EVENTOS SELECCIONADOS ESTA VACIO, BUSCA EN
    //TODOS LOS EVENTOS PASADOS, SINO SOLO EN LOS SELECCIONADOS POR CATEGORIA.  
    if(array_selected_events.length == 0){
        search(element.value, past_events);
    }else{
        search(element.value, array_selected_events);
    }
}
*/

/*
SE REEMPLAZO POR *addEventListener PARA BUSCADOR.

function selectCategoryChecked(element){
    //SI AL SELECCIONAR O DESELECCIONAR UNA CATEGORIA EL INPUT DEL BUSCADOR
    //CONTIENE UN ELEMENTO, LO ELIMINA.
    document.getElementById("search").value = '';
    
    //OBJETO QUE VA A CONTENER TODAS LAS CATEGORIAS SELECCIONADAS Y
    //TODOS LOS EVENTOS SEGUN ESAS CATEGORIAS.
    var obj_data;

    obj_data = selectCategory(element, array_selected_categories, array_selected_events, past_events)

    array_selected_events = obj_data['events'];
    array_selected_categories = obj_data['array_categories'];
}
*/

//ARRAY DE STRINGS QUE SE CARGA CON CATEGORIAS SEGUN LA CATEGORIA ELEGIDA.
let array_selected_categories = [];
//ARRAY DE EVENTOS QUE SE CARGA SOLO CON LOS EVENTOS SEGUN LA CATEGORIA SELECCIONADA.
let array_selected_events = [];

//getPastEvents: ME DEVUELVE EN upcoming_events LOS EVENTOS PASADOS. 
let past_events = getPastEvents();

createCards(past_events)
createCategories(past_events);
showSoldOut(past_events);

//addEventListener PARA CATEGORIAS
const element_category = document.querySelector("#categories");
var obj_data;
element_category.addEventListener("change", (e) => {
    //SI AL SELECCIONAR O DESELECCIONAR UNA CATEGORIA EL INPUT DEL BUSCADOR
    //CONTIENE UN ELEMENTO, LO ELIMINA.
    document.getElementById("search").value = '';
    
    //OBJETO QUE VA A CONTENER TODAS LAS CATEGORIAS SELECCIONADAS Y
    //TODOS LOS EVENTOS SEGUN ESAS CATEGORIAS.
    obj_data = selectCategory(e.target, array_selected_categories, array_selected_events, past_events)
    array_selected_events = obj_data['events'];
    array_selected_categories = obj_data['array_categories'];
});

//*addEventListener PARA BUSCADOR.
const element_search = document.querySelector("#search");
element_search.addEventListener("keyup", (e) => {
    //BUSCADOR: SI EL ARRAY QUE CONTIENE LOS EVENTOS SELECCIONADOS ESTA VACIO, BUSCA EN
    //TODOS LOS EVENTOS FUTUROS, SINO SOLO EN LOS SELECCIONADOS POR CATEGORIA.
    if(array_selected_events.length == 0){
        search(e.target.value, past_events);
    }else{
        search(e.target.value, array_selected_events);
    }
});

//*addEventListener PARA BOTON QUE ELIMINA EL TEXTO DEL BUSCADOR.
element_search.addEventListener("click", () => {
    deleteChildElements('cards-event');
    if(array_selected_events.length == 0){
        createCards(past_events);
    }else{
        createCards(array_selected_events);
    }
});