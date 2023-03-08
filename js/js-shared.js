function createCategories(events){
    let category = document.getElementById("categories");
    let div = document.createElement("div");
    div.className = "px-lg-5 px-md-2 px-3 row d-flex align-items-center";

    let template = '';
    let categories = [];

    for( const c of events){
        categories.push(c['category']);
    }

    //quitar categorias repetidas
    let unique_categories = [... new Set(categories)];

    for( const c of unique_categories){
        template += `
            <div class="col-lg-3 col-md-3 col-6 form-check">
                ${c}
                <input onclick="selectCategory(this)" class="form-check-input border border-dark" name="check" type="checkbox" value="${c}" >
                <label class="form-check-label" for="flexCheckDefault"></label>
            </div>
        `
    }

    div.innerHTML = template;
    category.appendChild(div);
}

function changeCardsForCategory(element, events){

    if (!element.checked){
        deleteChildElements('cards-event');
        createCards(events)
    }else{
        let array_events = [];

        for( const e of events){
            if(element.value == e['category']){
                array_events.push(e);
            }     
        }

        deleteChildElements('cards-event');
        createCards(array_events)
    }

    
}

function createCards(data){
    let cards = document.getElementById("cards-event");
    let div = document.createElement("div");
    div.className = "row d-flex justify-content-center";

    let template = '';

    for( const d of data){
        template += `
            <div class="col-lg-4 m-2 card border border-dark cards-events ">
                <img src=${d['image']} class="card-img-top p-1 " alt="...">
                <div class="card-body row align-items-end">
                    <div class="card-info">
                        <h5 class="card-title text-center">${d['name']}</h5>
                        <p class="card-text p-2">${d['description']}</p>
                    </div>
                    <div class="row align-items-center ">
                        <p class="col-lg-6 col-6 fw-bold price">price $${d['price']}</p>
                        <a href="./detail.html" type="button" class="col-lg-6 col-6 btn btn-dark ">See more</a>
                    </div>
                </div>
            </div>
        `
    }

    div.innerHTML = template;
    cards.appendChild(div);
}

//ELIMINA TODOS LOS ELEMENTOS HIJOS DE ELEMENTO SELECCIONADO 
function deleteChildElements(id){
    let element = document.getElementById(id);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function search(word, events){
    
    let array_events = [];

    
    
    events.forEach(element => {
      if(element['name'].substr(0,word.length).toLowerCase() == word.toLowerCase()){
        array_events.push(element);
      }
    });
    
    deleteChildElements('cards-event');

    createCards(array_events);
}