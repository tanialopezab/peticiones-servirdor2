'use strict';

//PASOS

//RECOJO LOS ELEMENTOS HTML
//LOS PRUEBO CON CONSOLE LOG
//PONGO UN LISTENER AL BOTON
//CREO LA FUNCION
//la funcion recogerá el valor del input
//guardo el valor del resultado
//Hago fetch a la API con la varialbe que ha escrito
//lo paso a JSON
//La promesa que devuelve la miro y veo que pasos hacer 
const btn = document.querySelector('.btn');
const input = document.getElementById('insert__info');
const list = document.getElementById('info');


//funcion que dada una url API devuelve un vector con personajes de starwars
function getStarWarsChar(urlAPI, name){
    let arrResult = [];
    fetch(urlAPI)
    .then(function (response){
        return response.json();
    })
    .then(function (jsonData){
        arrResult = jsonData.results;
        printChar(arrResult, name);//Rellenamos el ul
        return jsonData.count;//Devuelvo .count el numero de personajes que hay
    })
}


//Funcion que crea un array con los personajes de starwars
function createStarWarsArr(name){
    let nPaginas = 0;
    let starWarsChar = [];//En este array vamos a guardar los personajes de star wars que obtengamos

    fetch('https://swapi.co/api/people/')
    .then(function (response){
        return response.json();
    })
    .then(function (jsonData){
        starWarsChar = starWarsChar.concat(jsonData.results); //asignamos a nuestro vector los 10 primeros resultados que hemos obtenido del fetch
        printChar(starWarsChar, name);//Rellenamos el ul
        //Con el numero de personajes recibido calculamos cuantas paginas mas esta el total de personajes
        nPaginas = (jsonData.count / 10) + 1;
        
        //llamemos una vez a la funcion que nos añade 10 personajes al array, por cada pagina que nos falta
        for(let i=2; i<= nPaginas; i++){
            getStarWarsChar('https://swapi.co/api/people/?page=' + i, name);
        }
        return jsonData.count;
    })
}

//Funcion que dado un array y un nombre añade los elementos que coincidan ul en formato li
function printChar(arrChar, name){
    for (let i=0; i<arrChar.length; i++){
        if (0 <= arrChar[i].name.search(name)){//Nuestro nombre esta contenido en el elemento
            list.innerHTML = list.innerHTML + `<li>${arrChar[i].name} ${arrChar[i].gender} </li>`;
        }
    }
}

function startSearch(){
    let inputName = input.value;
    list.innerHTML = "";
    createStarWarsArr(inputName);
}

btn.addEventListener('click', startSearch);

