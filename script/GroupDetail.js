'use strict';
import {GetMusicGroupById} from "./HTTPClient.js";

const nameDiv = document.querySelector("#Name");
const genereDiv = document.querySelector("#genere");
const yearsDiv = document.querySelector("#years");
const artistDiv = document.querySelector("#artist");
const albumsDiv = document.querySelector("#albums");

//retrieve id from url:
let url = new URL(window.location);
let params = url.searchParams;
let id = params.get("id"); 
console.log(id);

//fetch group from api:
const group = await GetMusicGroupById(id);
console.log(group);

nameDiv.innerText = group.name;
genereDiv.innerText = "genere: " + group.strGenre;
yearsDiv.innerText = "year established: " + group.establishedYear;
artistDiv.innerText = "artists: " + group.artists.length;
albumsDiv.innerText = "albums: " + group.albums.length;