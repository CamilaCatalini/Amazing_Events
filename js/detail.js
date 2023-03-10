let params = new URLSearchParams(location.search);
var id = params.get('q');

console.log(id);

let eventx = {};

data.events.forEach(element => {
    if(element['_id'] == id){
      eventx = element;
    }
});

var str=eventx['name']; 
document.getElementById('event-name').innerHTML=str; 

str=eventx['description']; 
document.getElementById('event-description').innerHTML=str; 

str=eventx['image']; 
document.getElementById('event-image').src=str; 

str=eventx['capacity']; 
document.getElementById('event-capacity').innerHTML='Capacity: ' + str; 

str=eventx['place']; 
document.getElementById('event-place').innerHTML='Place: ' + str; 


str=eventx['assistance']; 

if(str == undefined){
    document.getElementById('event-assistance').innerHTML='Estimate: ' + eventx['estimate']; 
}else{
    document.getElementById('event-assistance').innerHTML='Assistance: ' + str; 
}


str=eventx['price']; 
document.getElementById('event-price').innerHTML='Price: ' + str; 