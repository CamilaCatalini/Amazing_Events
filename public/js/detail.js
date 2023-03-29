//getEventById: TOMA EL ID PASADO POR URL Y DEVUELVE EL EVENTO CORRESPONDIENTE. 
function getEventById(events){
    let params = new URLSearchParams(location.search);
    var id = params.get('q');
    var eventx = {};
    //BUSCA EN DATA EL EVENTO QUE COINCIDA CON EL ID.
    events.forEach(element => {
        if(element['_id'] == id){
          eventx = element;
        }
    });
    return (eventx)
}

//loadDataInView: CARGA LA VISTA DETALLE CON LOS DATOS DEL EVENTO CORRESPONDIENTE.
function loadDataInView(event){
    var str=event['name']; 
    document.getElementById('event-name').innerHTML=str; 

    str=event['description']; 
    document.getElementById('event-description').innerHTML=str; 

    str=event['image']; 
    document.getElementById('event-image').src=str; 

    str=event['capacity']; 
    document.getElementById('event-capacity').innerHTML='Capacity: ' + str; 

    str=event['place']; 
    document.getElementById('event-place').innerHTML='Place: ' + str; 

    str=event['assistance']; 
    //COMO DATA TIENE EVENTOS QUE CONTIENEN estimate O assistance, TOMO SOLO EL VALOR
    //QUE TIENE event['assistance'] SI ESTE ES undefined SIGNIFICA QUE ESTE EVENTO NO TIENE
    //EL CAMPO assistance SINO QUE TIENE estimate.
    if(str == undefined){
        document.getElementById('event-assistance').innerHTML='Estimate: ' + event['estimate']; 
    }else{
        document.getElementById('event-assistance').innerHTML='Assistance: ' + str; 
    }

    str=event['date']; 
    document.getElementById('event-date').innerHTML=str; 

    str=event['price']; 
    document.getElementById('event-price').innerHTML='Price: ' + str; 
}

//createCardsRelatedEvents: MUESTRA LOS EVENTOS RELACIONADOS. 
function createCardsRelatedEvents(events){
    element = document.getElementById("related-events");
    let div = document.createElement("div");
    div.className = "col-lg-12 row mx-lg-3 mx-md-3";
    let template = '<p>Upcoming related events</p>';
    let description;
    for( const d of events){
      if(d['description'].length>=70){
        description = d['description'].slice(0,80) + '...';
      }else{
        description = d['description']
      }
      template += `
        <div class="col-lg-3 col-2 m-lg-2 m-md-2 m-1 card border border-dark cards-events-detail ">
          <img src=${d['image']} class="card-img-top p-1 " alt="...">
          <span id="sold-out-${d['_id']}" class="sold-out position-absolute badge rounded-pill bg-danger">
              SOLD OUT
              <span class="visually-hidden ">unread messages</span>
          </span>
          <div class="row align-items-end">
              <div class="card-info-detail">
                  <h5 class="card-title text-center ">
                      ${d['name']}
                  </h5>
                  <p class="card-text px-2">${description}</p>
              </div>
              <div class="row align-items-center px-2">
                  <p class="col-lg-6 col-6 fw-bold fs-lg-5 price ">price $${d['price']}</p>
                  <a href="./detail.html?q=${d['_id']}" type="button" class="col-lg-6 col-6 btn btn-dark see-more">See more</a>
              </div>
          </div>
        </div>
        `
    }
    div.innerHTML = template;
    element.appendChild(div);
}

//loadRelatedEvents: CREA UN ARRAY CON LOS EVENTOS FUTUROS DE UNA CATEGORIA, EXCEPTO EL EVENTO
//QUE TENGA EL MISMO _id QUE EL EVENTO QUE SE MUESTRA EN DETALLE(esto para que cuando muestre 
//los eventos relacionados al seleccionado, no muestre este mismo). LUEGO, CREA LOS EVENTOS
//RELACIONADOS POR LA MISMA CATEGORIA.  
function loadRelatedEvents(events, category, id){
  let array_events = [];
  
  events.forEach(element => {
    if((element['category'] == category)&&(element['_id'] != id)){
      array_events.push(element);
    }
  });

  //SI EL ARRAY CREADO TIENE MAS DE 3 EVENTOS, LO CORTO Y SOLO ME QUEDO CON LOS 3 PRIMEROS.
  //EN EL CASO DE NO HABER EVENTOS FUTUROS CON ESA CATEGORIA, NO SE CREA LA SECCION DE
  //EVENTOS RELACIONADOS.
  if(array_events.length > 3){
    createCardsRelatedEvents(array_events.slice(0,3));
  }else if(array_events.length != 0){
    createCardsRelatedEvents(array_events);
  }
 
}

let data = {}
let upcoming_events = {}
async function getData(){
  data = await connectedApi()
  //eventx CONTIENE EL EVENTO QUE CORRESPONDE AL ID OBTENIDO DE LA URL. 
  let event = getEventById(data.events);
  loadDataInView(event); 
  upcoming_events = getUpcomingEvents(data);
  loadRelatedEvents(upcoming_events, event['category'], event['_id']);
}
getData();




