//loadTableUpcoming: OBTIENE LOS DATOS NECESARIOS PARA LUEGO CREAR LA TABLA
//DE EVENTOS FUTUROS. 
function loadTableUpcoming(){
    //getUpcomingEvents: ME DEVUELVE EN upcoming_events LOS EVENTOS FUTUROS. 
    let upcoming_events = getUpcomingEvents(data);

    //ARRAY DE STRING CON TODAS LAS CATEGORIAS(SIN REPETIR).
    let unique_categories_upcoming = createArrayUniqueCategory(upcoming_events);

    //createArrayStats: DEVUELVE UN ARRAY CON LA INFORMACION DE CADA CATEGORIA.
    let array_stats = createArrayStats(unique_categories_upcoming, upcoming_events);

    //loadTable: CREA LA TABLA DE 'Upcoming events statistics by category'.
    loadTable(array_stats, 'upcoming');

    return array_stats;
}

function loadTablePast(data){
    //getUpcomingEvents: ME DEVUELVE EN upcoming_events LOS EVENTOS FUTUROS. 
    let past_events = getPastEvents(data);

    //ARRAY DE STRING CON TODAS LAS CATEGORIAS(SIN REPETIR).
    let unique_categories_past = createArrayUniqueCategory(past_events);

    //createArrayStats: DEVUELVE UN ARRAY CON LA INFORMACION DE CADA CATEGORIA.
    let array_stats = createArrayStats(unique_categories_past, past_events);

    //loadTable: CREA LA TABLA DE 'Past events statistics by category'.
    loadTable(array_stats, 'past');

    loadStaticEvent(past_events);

    return array_stats;
}

//loadStaticEvent: RECORRE LOS EVENTOS PASADOS, CALCULA: higher_percentage_attendance, lowest_percentage_attendance,
//larger_capacity Y MUESTRA LOS RESULTADOS EN LA TABLA.
function loadStaticEvent(events){
    var higher_percentage_attendance = 0;
    var lowest_percentage_attendance = 100;
    var larger_capacity = 0;

    var name_event_higher;
    var name_event_lowest;
    var name_event_capacity;

    var percentage = 0;
    events.forEach(element => {
        percentage = (element['assistance']/element['capacity'])*100;
        if(percentage >higher_percentage_attendance){
            higher_percentage_attendance = percentage;
            name_event_higher = element['name'];
        }else if(percentage < lowest_percentage_attendance){
            lowest_percentage_attendance = percentage;
            name_event_lowest = element['name'];
        }
        if(element['capacity'] > larger_capacity){
            larger_capacity = element['capacity'];
            name_event_capacity = element['name'];
        }
    });

    stats = document.getElementById("stats");

    let template = '';

        template += `
            <ul class="list-group list-group-horizontal-md list-group-horizontal">
                <li class="col-lg-4 col-4 list-group-item border text-center border-dark">${name_event_higher} (${higher_percentage_attendance.toFixed(2)}%)</li>
                <li class="col-lg-4 col-4 list-group-item border text-center border-dark">${name_event_lowest} (${lowest_percentage_attendance.toFixed(2)}%)</li>
                <li class="col-lg-4 col-4 list-group-item border text-center border-dark">${name_event_capacity} (${larger_capacity})</li>
            </ul>
        `
    stats.innerHTML = template;
}

function orderStatistics(array,type){
    let ordered_array_stats;
    if(type == 'revenues'){
        //ORDENA LOS EVENTOS POR SU GANANCIA.
        ordered_array_stats = array.sort(function (a, b) {
        if (a.revenues > b.revenues) {
            return 1;
        }
        if (a.revenues < b.revenues) {
            return -1;
        }
            return 0;
        })
    }else if(type == 'percentage'){
        //ORDENA LOS EVENTOS POR SU PORCENTAJE.
        ordered_array_stats = array.sort(function (a, b) {
        if (a.percentage  > b.percentage) {
            return 1;
        }
        if (a.percentage < b.percentage) {
            return -1;
        }
            return 0;
        })
    }else{
        //ORDENA LOS EVENTOS POR SU CATEGORIA.
        ordered_array_stats = array.sort(function (a, b) {
        if (a.category  > b.category) {
            return 1;
        }
        if (a.category < b.category) {
            return -1;
        }
            return 0;
        })
    }
    return ordered_array_stats;
}

let data = {}
let array_stats_upcoming;
let array_stats_past;

async function getData() {
    data = await connectedApi()
    array_stats_upcoming = loadTableUpcoming(data);
    array_stats_past = loadTablePast(data);
}
getData();

const element_upcoming = document.querySelector("#select-upcoming");
element_upcoming.addEventListener('change', (event) => {
    deleteChildElements('stats-upcoming-events');
    let ordered_array_stats = orderStatistics(array_stats_upcoming,event.target.value);
    loadTable(ordered_array_stats,'upcoming');
});

const element_past = document.querySelector("#select-past");
element_past.addEventListener('change', (event) => {
    deleteChildElements('stats-past-events');
    let ordered_array_stats = orderStatistics(array_stats_past,event.target.value);
    loadTable(ordered_array_stats,'past');
});