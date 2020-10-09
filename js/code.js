


var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var myBtn = document.getElementById('mybtn');
var myDiv = document.getElementById('showing');
var searchBar = document.getElementById('searchBar')
var sites;
var globalindex;

if (localStorage.getItem('mysites') == null) {
    sites = [];
}
else {
    sites = JSON.parse(localStorage.getItem('mysites'));
    show();

}


myBtn.onclick = function () {

    if (myBtn.innerHTML == 'Submit') {
        if(siteName.value.length > 0 && siteURL.value.length > 0){
            add();
        }
    }
    else {
        addupdate(globalindex);
    }

    show();
}

function add() {
    var site = {
        name: siteName.value,
        link: siteURL.value
    }
    sites.push(site);
    localStorage.setItem('mysites', JSON.stringify(sites));

    siteURL.value = '';   
    siteName.value = '';  
}

function show() {
    myDiv.innerHTML = null;
    for (var i = 0; i < sites.length; i++) {
        myDiv.innerHTML += `<div class='style'> 
                              <p>` + sites[i].name + `</P>
                              <div>
                                 <button class='btn btn-info' onclick='visit(` + i + `)'>visit</button>
                                 <button class='btn btn-warning' onclick='updat(` + i + `)'>update</button>
                                 <button class='btn btn-danger' onclick='delet(` + i + `)'>delete</button>
                              </div>
                           </div>`
    }
}

function delet(index) {

    sites.splice(index, 1);
    localStorage.setItem('mysites', JSON.stringify(sites));
    show();

}

function updat(index) {
    siteName.value = sites[index].name;
    siteURL.value = sites[index].link;
    myBtn.innerHTML = 'update';
    globalindex = index;
}

function addupdate(globalindex) {
    sites[globalindex].name = siteName.value;
    sites[globalindex].link = siteURL.value;
    localStorage.setItem('mysites', JSON.stringify(sites));
    myBtn.innerHTML = 'Submit'; 

    siteURL.value = '';       
    siteName.value = ''; 
}

function visit(index) {
    window.open(sites[index].link, "_blank");

}


function searchfor(term) {
    myDiv.innerHTML = null;
    for (var i = 0; i < sites.length; i++) {

        if (sites[i].name.includes(term.trim()) == true) {
            myDiv.innerHTML += `<div class='style'> 
                                 <p>` + sites[i].name + `</P>
                                 <div>
                                   <button class='btn btn-info' onclick='visit(` + i + `)'>visit</button>
                                   <button class='btn btn-warning' onclick='updat(` + i + `)'>update</button>
                                   <button class='btn btn-danger' onclick='delet(` + i + `)'>delete</button>
                                 </div>
                                </div>`
        }
    }
}
