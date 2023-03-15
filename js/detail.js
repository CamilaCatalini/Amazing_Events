//getEventById: TOMA EL ID PASADO POR URL Y DEVUELVE EL EVENTO CORRESPONDIENTE. 
function getEventById(){
    let params = new URLSearchParams(location.search);
    var id = params.get('q');
    var eventx = {};
    //BUSCA EN DATA EL EVENTO QUE COINCIDA CON EL ID.
    data.events.forEach(element => {
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

    str=event['price']; 
    document.getElementById('event-price').innerHTML='Price: ' + str; 
}

//eventx CONTIENE EL EVENTO QUE CORRESPONDE AL ID OBTENIDO DE LA URL. 
let eventx = getEventById();
loadDataInView(eventx); 
