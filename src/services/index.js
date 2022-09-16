//archivos donde se guardaran las peticiones
//una buena practica es guardar en una variable el archivo

const BASE_URL=`https://pokeapi.co/api/v2/pokemon?limit=200`

//se crea una funcion generica
//si es que no se pasa el parámetro, toma BASE_URL como principal

export const getDataFromPokemon = async (url=BASE_URL)=>{
    try{
        //para traer la informacion
        const response = await fetch(url);
        //para que deje de ser jsom
        const data = await response.json();
        console.log("data",data); 
        return data;
    }
    catch (error){
        console.log(error.message);
    }
}