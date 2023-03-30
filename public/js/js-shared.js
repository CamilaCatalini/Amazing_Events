//createCategorias: CREA DIVS CON SUS RESPECTIVOS INPUT SEGUN LA
//CANTIDAD DE CATEGORIAS QUE HAYA.
function createCategories(events){
    let category = document.getElementById("categories");
    let div = document.createElement("div");
    div.className = "px-lg-5 px-md-2 px-2 row d-flex align-items-center";

    let template = '';

    //ARRAY DE STRING CON TODAS LAS CATEGORIAS(SIN REPETIR).
    let unique_categories = createArrayUniqueCategory(events);

    for( const c of unique_categories){
        template += `
            <div class="col-lg-1 col-md-3 col-1 form-check ">
                ${c}
                <input  class=" form-check-input border border-dark" name="check" type="checkbox" value="${c}" >
                <label class="form-check-label" for="flexCheckDefault"></label>
            </div>
        `
    }

    div.innerHTML = template;
    category.appendChild(div);
}

function createArrayUniqueCategory(events){
    //ARRAY DE STRINGS QUE CONTIENE TODAS LAS CATEGORIAS(INCLUYENDO REPETIDAS).
    let categories = [];
    for( const c of events){
        categories.push(c['category']);
    }

    //ARRAY DE STRING CON TODAS LAS CATEGORIAS(SIN REPETIR).
    return unique_categories = [... new Set(categories)];
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
    div.className = "row px-lg-5 px-md-3 px-2";

    let template = '';

    let description;
    for( const d of data){
        if(d['description'].length>=60){
            description = d['description'].slice(0,50) + '...';
          }else{
            description = d['description']
          }
        template += `
            <div id="cards-events-${d['_id']}" class="col-lg-4 m-lg-2 m-1 card border border-dark cards-events ">
                <div class="sold-out" id="sold-out-${d['_id']}" >
                    <img src="./assets/sold-out.png">
                </div>
                <img src=${d['image']} class="card-img-top p-1 " alt="...">
                <div class="card-body ">
                    <div class="card-info">
                        <h5 class="card-title text-center ">
                            ${d['name']}
                        </h5>
                        <p class="card-text p-lg-2">${description}</p>
                    </div>
                    <div class="row align-items-center ">
                        <p class="col-lg-6 col-6 fw-bold fs-lg-5 price">price $${d['price']}</p>
                        <a href="./detail.html?q=${d['_id']}" type="button" class="col-lg-6 col-6 btn btn-dark see-more">See more</a>
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
      if(element['name'].toLowerCase().includes(word.toLowerCase())){
        array_events.push(element);
      }
    });
    deleteChildElements('cards-event');
    createCards(array_events);
    const sections = document.querySelectorAll(".card-title");
    sections.forEach(el => {
      el.innerHTML = el.innerText;
      el.innerHTML = el.innerText.replace(new RegExp(`(${word})`,"i"), "<strong style='color: #e0046c'>$1</strong>");
    });
}

//showSoldOut: CADA CARD DE EVENTO TIENE UNA ETIQUETA SPAM QUE QUE CONTIENE UN MSJ DE sold out
//QUE AL PRINCIPIO SE ENCUENTRA OCULTO.
//SI LA CAPACIDAD DEL EVENTO SE AGOTO, MUESTRA EL MSJ MEDIANTE UN display:block.
function showSoldOut(events){
    events.forEach(element => {
        if((element['capacity'] - element['assistance'] == 0 ) || (element['capacity'] - element['estimate'] == 0 )){
            
            e = document.getElementById("cards-events-"+element['_id']);
            e.style.filter = "brightness(60%)";
            e = document.getElementById("sold-out-"+element['_id']);
            e.style.display = 'block';
        }
    });
}

//getUpcomingEvents: DEVUELVE LOS EVENTOS FUTUROS.
function getUpcomingEvents(events){
    let array_upcoming_events = [];
    for( const event of events.events){
        if(data.currentDate <= event['date']){
            array_upcoming_events.push(event);
        }     
    }
    return(array_upcoming_events);
}

//getPastEvents: DEVUELVE LOS EVENTOS PASADOS.
function getPastEvents(events){
    let array_past_events = [];
    for( const event of events.events){
        if(data.currentDate > event['date']){
            array_past_events.push(event);
        }     
    }
    return(array_past_events);
}

//createArrayStats: CALCULA POR CADA CATEGORIA: revenues, percentaje of attendance Y DEVUELVE
//ESA INFO EN UN ARRAY.
function createArrayStats(categories, events){
    var revenues = 0;
    var porcentage = 0;
    var average = 0;
    var array_stats = [];

    //ORDENA LOS EVENTOS POR SU CATEGORIA.
    ordered_events = events.sort(function (a, b) {
        if (a.category > b.category) {
          return 1;
        }
        if (a.category < b.category) {
          return -1;
        }
        return 0;
      })
    
    //RECORRE LAS CATEGORIAS ORDENADAS, 
    for( const category of categories.sort()){
        var events_by_category = ordered_events.filter(e => e.category == category);
        //ACA SIMPLEMENTE CORTO EL ARRAY DE ordered_events PARA CUANDO HAGA EL FILTER
        //DE LA LINEA DE ARRIBA, NO VUELVA A RECORRER LOS EVENTOS CON UNA CATEGORIA
        //QUE YA FUE CALCULADA.
        ordered_events = ordered_events.slice(events_by_category.length,ordered_events.length)
        events_by_category.forEach(element => {
            //COMO DATA TIENE EVENTOS QUE CONTIENEN estimate O assistance, TOMO SOLO EL VALOR
            //QUE TIENE event['assistance'] SI ESTE ES undefined SIGNIFICA QUE ESTE EVENTO NO TIENE
            //EL CAMPO assistance SINO QUE TIENE estimate.
            if(element['estimate'] == undefined){
                revenues = revenues + (element['assistance']*element['price']);
                porcentage = porcentage + (element['assistance']/element['capacity']);
            }else{
                revenues = revenues + (element['estimate']*element['price']);
                porcentage = porcentage + (element['estimate']/element['capacity']);
            }
        });
        average = (porcentage/events_by_category.length)*100;
    
        array_stats.push({'category': category,'revenues': revenues, 'percentage': average});
        
        revenues = 0;
        porcentage = 0;
        average = 0;
    }
    return array_stats;
}

//loadTable: CARGA LAS TABLAS DE: Upcoming events statistics by category Y Past events statistics by category.
function loadTable(events, type_event){
    let stats;
    if(type_event == 'upcoming'){
        stats = document.getElementById("stats-upcoming-events");
    }else if(type_event == 'past'){
        stats = document.getElementById("stats-past-events");
    }    
    let template = '';

    for( const e of events){
        template += `
            <ul class="list-group list-group-horizontal-md list-group-horizontal">
                <li class="col-lg-4 col-4 list-group-item border border-dark text-center">${e['category']}</li>
                <li class="col-lg-4 col-4 list-group-item border border-dark text-center">${e['revenues']}</li>
                <li class="col-lg-4 col-4 list-group-item border border-dark text-center">${(e['percentage']).toFixed(2)}%</li>
            </ul>
        `
    }
    stats.innerHTML = template;
}
