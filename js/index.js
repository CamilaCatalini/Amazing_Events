/* 
FUNCION CAMBIADA POR addEventListener PARA CATEGORIAS.
function searchEvents(element){
    //BUSCADOR: SI EL ARRAY QUE CONTIENE LOS EVENTOS SELECCIONADOS ESTA VACIO, BUSCA EN
    //TODOS LOS EVENTOS, SINO SOLO EN LOS SELECCIONADOS POR CATEGORIA.  
    if(array_selected_events.length == 0){
        search(element.value, data.events);
    }else{
        search(element.value, array_selected_events);
    }
    
}
*/

/* 
FUNCION CAMBIADA POR addEventListener PARA BUSCADOR.

function selectCategoryChecked(element){
    //SI AL SELECCIONAR O DESELECCIONAR UNA CATEGORIA EL INPUT DEL BUSCADOR
    //CONTIENE UN ELEMENTO, LO ELIMINA.
    document.getElementById("search").value = '';

    //OBJETO QUE VA A CONTENER TODAS LAS CATEGORIAS SELECCIONADAS Y
    //TODOS LOS EVENTOS SEGUN ESAS CATEGORIAS.
    var obj_data;

    obj_data = selectCategory(element, array_selected_categories, array_selected_events, data.events)

    array_selected_events = obj_data['events'];
    array_selected_categories = obj_data['array_categories'];
    
}
*/

//ARRAY DE STRINGS QUE SE CARGA CON CATEGORIAS SEGUN LA CATEGORIA ELEGIDA.
let array_selected_categories = [];
//ARRAY DE EVENTOS QUE SE CARGA SOLO CON LOS EVENTOS SEGUN LA CATEGORIA SELECCIONADA.
let array_selected_events = [];

createCards(data.events);
createCategories(data.events);

//addEventListener PARA CATEGORIAS
const element_category = document.querySelector("#categories");
var obj_data;
element_category.addEventListener("change", (e) => {
    //SI AL SELECCIONAR O DESELECCIONAR UNA CATEGORIA EL INPUT DEL BUSCADOR
    //CONTIENE UN ELEMENTO, LO ELIMINA.
    document.getElementById("search").value = '';
    
    //OBJETO QUE VA A CONTENER TODAS LAS CATEGORIAS SELECCIONADAS Y
    //TODOS LOS EVENTOS SEGUN ESAS CATEGORIAS.
    obj_data = selectCategory(e.target, array_selected_categories, array_selected_events, data.events)
    array_selected_events = obj_data['events'];
    array_selected_categories = obj_data['array_categories'];
});

//*addEventListener PARA BUSCADOR.
const element_search = document.querySelector("#search");
element_search.addEventListener("keyup", (e) => {
    //BUSCADOR: SI EL ARRAY QUE CONTIENE LOS EVENTOS SELECCIONADOS ESTA VACIO, BUSCA EN
    //TODOS LOS EVENTOS FUTUROS, SINO SOLO EN LOS SELECCIONADOS POR CATEGORIA.
    if(array_selected_events.length == 0){
        search(e.target.value, data.events);
    }else{
        search(e.target.value, array_selected_events);
    }
});
