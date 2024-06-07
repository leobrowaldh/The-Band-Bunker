'use strict';

import {GetMusicGroups} from "./HTTPClient.js";

const groupList = document.querySelector("#musik-groups");
const btnPrev = document.querySelector("#btnPrev");
const btnNext = document.querySelector("#btnNext");
const searchForm = document.querySelector("#searchForm");
let searchString = document.querySelector("#search").value;

let _currentPage = 0;
let _maxNrpages = 10; 

//Add event listeners
btnPrev.addEventListener("click", clickPrev);
btnNext.addEventListener("click", clickNext);
searchForm.addEventListener('submit', RenderSearchGroups);

//Declare event handlers
async function clickPrev (e){

    if (_currentPage > 0 ) {
        _currentPage--;
        await renderGroups(_currentPage, searchString);
    }
}

async function clickNext (e){
    if (_currentPage < _maxNrpages-1) {
        _currentPage++;
        await renderGroups(_currentPage, searchString);
    }
}

async function RenderSearchGroups(e) {
    // Prevent the form from submitting the traditional way
    e.preventDefault();
    _currentPage = 0;
    searchString = document.querySelector("#search").value;
    await renderGroups(_currentPage, searchString);
}

async function renderGroups(_currentPage, searchString) {
    
    //clear the list
    while (groupList.firstElementChild !== null) {
        groupList.removeChild(groupList.firstElementChild);
    }

    //fetch the data from api
    let data = await GetMusicGroups(_currentPage, searchString);
    console.log(data);
    //populate list
    data.pageItems.forEach(item => {
        addRow(item.name, item.strGenre, item.musicGroupId);
    });
    _maxNrpages = data.pageCount;
}

function addRow(groupName, genere, id) {
    let divRow = document.createElement(`div`);
    divRow.classList.add("trFluid");

    let divGroup2 = document.createElement(`div`);
    divGroup2.classList.add("trFluid_Grouping2");
    divRow.appendChild(divGroup2);


    let divGroup1_1 = document.createElement(`div`);
    divGroup1_1.classList.add("trFluid_Grouping1");
    let divGroup1_2 = document.createElement(`div`);
    divGroup1_2.classList.add("trFluid_Grouping1");
    divGroup2.appendChild(divGroup1_1);
    divGroup2.appendChild(divGroup1_2);


    //<div class="tdFluent"></div>
    
    let divFluent1 = document.createElement(`div`);
    divFluent1.classList.add("tdFluent");
    const a = document.createElement("a");
    a.innerText = groupName;
    a.href = `./GroupDetail.html?id=${id}`;
    divFluent1.appendChild(a);
    divGroup1_1.appendChild(divFluent1);

    let divFluent2 = document.createElement(`div`);
    divFluent2.classList.add("tdFluent");
    divFluent2.innerHTML = genere;

    divGroup1_2.appendChild(divFluent2);


    groupList.appendChild(divRow);
}


//init
await renderGroups(_currentPage, "");