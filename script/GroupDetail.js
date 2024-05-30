'use strict';

//retrieve id from url:
let url = new URL(window.location);
let params = url.searchParams;
let id = params.get("id"); 

console.log(id);

