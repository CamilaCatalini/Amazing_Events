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
                <input class="form-check-input border border-dark" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault"></label>
            </div>
        `
    }

    div.innerHTML = template;
    category.appendChild(div);
}
