'use strict';

import {GetMusicGroups} from "./HTTPClient.js";

const groupList = document.querySelector("#musik-groups");
const btnPrev = document.querySelector("#btnPrev");
const btnNext = document.querySelector("#btnNext");

let _currentPage = 0;
let _maxNrpages = 10; 

//Add event listeners
btnPrev.addEventListener("click", clickPrev);
btnNext.addEventListener("click", clickNext);

//Declare event handlers
async function clickPrev (e){

    if (_currentPage > 0 ) {
        _currentPage--;
        await renderGroups(_currentPage);
    }
}

async function clickNext (e){
    if (_currentPage < _maxNrpages-1) {
        _currentPage++;
        await renderGroups(_currentPage);
    }
}

async function renderGroups(_currentPage) {
    
    //clear the list
    while (groupList.firstElementChild !== null) {
        groupList.removeChild(groupList.firstElementChild);
    }

    //fetch the data from api
    let data = await GetMusicGroups(_currentPage);
    console.log(data);
    //populate list
    data.pageItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = item.name;
        a.href = `./GroupDetail.html?id=${item.musicGroupId}`;

        li.appendChild(a);
        groupList.appendChild(li);
    });
}

//init
await renderGroups(_currentPage);