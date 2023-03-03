let category = document.getElementById("categories");
let div2 = document.createElement("div");
div2.className = "px-lg-5 px-md-2 px-3 row d-flex align-items-center";

let template2 = '';
let categories = [];

for( const c of data.events){
    categories.push(c['category']);
}

//quitar categorias repetidas
let unique_categories = [... new Set(categories)];

for( const c of unique_categories){
    template2 += `
        <div class="col-lg-3 col-md-3 col-6 form-check">
            ${c}
            <input class="form-check-input border border-dark" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault"></label>
        </div>
    `
}

div2.innerHTML = template2;
category.appendChild(div2);


let cards = document.getElementById("cards-event");
let div = document.createElement("div");
div.className = "row d-flex justify-content-center";

let template = '';

for( const d of data.events){
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

div.innerHTML = template;
cards.appendChild(div);

