function getPastEvents(){
    let cards = document.getElementById("cards-event");
    let div = document.createElement("div");
    div.className = "row d-flex justify-content-center";

    let template = '';

    for( const d of data.events){
        if(data.currentDate > d['date']){
            template += `
            <div class="col-lg-4 m-2 card border border-dark cards-events ">
                <img src=${d['image']} class="card-img-top p-1" alt="...">
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
    }
    div.innerHTML = template;
    cards.appendChild(div);
}

getPastEvents();
createCategories(data.events)