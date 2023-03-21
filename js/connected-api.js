const urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

async function connectedApi(){
    try{
        const d = await fetch(urlApi); 
        data = await d.json();
        return data;
    }
    catch{
        return dataJson;
    }   
}