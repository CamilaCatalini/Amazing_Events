//createCategorias: CREA DIVS CON SUS RESPECTIVOS INPUT SEGUN LA
//CANTIDAD DE CATEGORIAS QUE HAYA.
function createCategories(events){
    let category = document.getElementById("categories");
    let div = document.createElement("div");
    div.className = "px-lg-5 px-md-2 px-3 row d-flex align-items-center";

    let template = '';

    //ARRAY DE STRINGS QUE CONTIENE TODAS LAS CATEGORIAS(INCLUYENDO REPETIDAS).
    let categories = [];
    for( const c of events){
        categories.push(c['category']);
    }

    //ARRAY DE STRING CON TODAS LAS CATEGORIAS(SIN REPETIR).
    let unique_categories = [... new Set(categories)];

    for( const c of unique_categories){
        template += `
            <div class="col-lg-3 col-md-3 col-6 form-check">
                ${c}
                <input  class=" form-check-input border border-dark" name="check" type="checkbox" value="${c}" >
                <label class="form-check-label" for="flexCheckDefault"></label>
            </div>
        `
    }

    div.innerHTML = template;
    category.appendChild(div);
}

//selectCategory: DEVUELVE UN OBJETO CON UN ARRAY QUE CONTIENE TODOS LOS EVENTOS SEGUN LAS
//CATEGORIAS SELECCIONADAS Y UN ARRAY DE STRING CON LAS CATEGORIAS SELECCIONADAS.
function selectCategory(element, array_selected_categories, array_selected_events, events){

    if(element.checked){
        array_selected_categories.push(element.value);
        array_selected_events = changeCardsForCategory(array_selected_categories, events);
    
    //SI LA CATEGORIA SELECCIONADA SE DESELECCIONA ENTRA Y ELIMINA LA CATEGORIA DESELECCIONADA
    //JUNTO CON SUS RESPECTIVOS EVENTOS.
    }else{
        var array_filtered = array_selected_categories.filter((item) => item !== element.value)
        array_selected_categories = array_filtered;
        array_selected_events = changeCardsForCategory(array_selected_categories, events);
    }
    return ({'events': array_selected_events, 'array_categories': array_selected_categories})
}

//changeCardsForCategory: CAMBIA LOS EVENTOS MOSTRADOS SEGUN LA CATEGORIA SELECCIONADA O
//DESELECCIONADA Y RETORNA UN ARRAY SOLO CON LOS EVENTOS SELECCIONADOS.
function changeCardsForCategory(categories, events){
    let array_events = [];

    //SI TODAS LAS CATEGORIAS FUERON DESELECCIONADAS SE VUELVEN A MOSTRAR TODOS LOS EVENTOS.
    if (categories.length == 0){
        deleteChildElements('cards-event');
        createCards(events);
    }else{
        for (let i=0;i < categories.length; i++){
            for( const e of events){
                if(categories[i] == e['category']){
                    array_events.push(e);
                }     
            }
        }
        deleteChildElements('cards-event');
        createCards(array_events)
    }
    return array_events;
}

//createCards: CREA LAS CARDS CON SUS RESPECTIVOS EVENTOS.
function createCards(data){
    let cards = document.getElementById("cards-event");
    let div = document.createElement("div");
    div.className = "row d-flex justify-content-center";

    let template = '';

    for( const d of data){
        template += `
            <div class="col-lg-4 m-2 card border border-dark cards-events ">
                <img src=${d['image']} class="card-img-top p-1 " alt="...">
                <span id="sold-out-${d['_id']}" class="sold-out position-absolute badge rounded-pill bg-danger m-1">
                    SOLD OUT
                    <span class="visually-hidden ">unread messages</span>
                </span>
                <div class="card-body row align-items-end">
                    <div class="card-info">
                        <h5 class="card-title text-center ">
                            ${d['name']}
                            
                        </h5>
                        <p class="card-text p-2">${d['description']}</p>
                    </div>
                    <div class="row align-items-center ">
                        <p class="col-lg-6 col-6 fw-bold fs-5 price">price $${d['price']}</p>
                        <a href="./detail.html?q=${d['_id']}" type="button" class="col-lg-6 col-6 btn btn-dark ">See more</a>
                    </div>
                </div>
            </div>
        `
    }

    div.innerHTML = template;
    cards.appendChild(div);

    showSoldOut(data);
}

//deleteChildElements: ELIMINA TODOS LOS ELEMENTOS HIJOS DE ELEMENTO SELECCIONADO 
function deleteChildElements(id){
    let element = document.getElementById(id);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//search: BUSCA SEGUN CARACTERES QUE SE VAYAN INGRESANDO. SI LA PALABRA INGRESADA
//COINCIDE CON LOS PRIMEROS CARACTERES EN UN MISMO ORDEN, MUESTRA SOLO ESOS EVENTOS.
function search(word, events){
    //ARRAY QUE CONTIENE LOS EVENTOS QUE TIENEN DICHA COINCIDENCIA.
    let array_events = [];

    events.forEach(element => {
      if(element['name'].substr(0,word.length).toLowerCase() == word.toLowerCase()){
        array_events.push(element);
      }
    });
    deleteChildElements('cards-event');
    createCards(array_events);
}

function showSoldOut(events){
    events.forEach(element => {
        if((element['capacity'] - element['assistance'] == 0 ) || (element['capacity'] - element['estimate'] == 0 )){
            e = document.getElementById("sold-out-"+element['_id']);
            e.style.display = 'block';
        }
    });
}