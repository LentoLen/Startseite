// defining variables
let query;
let sec;
let logo;
let autocomplete;

// setting up local storage for settings

    // search engine option
if (localStorage.getItem("search") == null) {
    sec = false;
    localStorage.setItem("search", "duckduckgo");
}
    // show seconds option
if (localStorage.getItem("sec") == null) {
    sec = false;
    localStorage.setItem("sec", false);
} else if (localStorage.getItem("sec") == "true"){
    sec = true;
} else {
    sec = false;
}
    // show logo option
if (localStorage.getItem("logo") == null) {
    logo = false;
    localStorage.setItem("logo", false);
} else if (localStorage.getItem("logo") == "true"){
    logo = true;
} else {
    logo = false;
}

    // show autocomplete option
if (localStorage.getItem("autocomplete") == null) {
    autocomplete = false;
    localStorage.setItem("autocomplete", false);
} else if (localStorage.getItem("autocomplete") == "true"){
    autocomplete = true;
} else {
    autocomplete = false;
}

// load settings after doccument loaded
function loadSettings() {
    document.getElementById("searchInput").value = ""
    adjustSearchbarWidth();
    document.getElementById("searchInput").focus();
    document.getElementById("showLogo").checked = logo;
    if (logo) {
        document.getElementById("logo").style.display = "block";
    } else {
        document.getElementById("logo").style.display = "none";
    }
    document.getElementById("showSeconds").checked = sec;
    document.getElementById("autocomplete").checked = autocomplete;
    if (autocomplete) {
        document.getElementById("searchbar").autocomplete = "on";
    } else {
        document.getElementById("searchbar").autocomplete = "off";
    }
    document.getElementById("chooseSearch").value = localStorage.getItem("search");
    document.getElementById("logo").src = "img/" + localStorage.getItem("search") + ".svg"
    configureSearchEngine()
}

// adjust searchbar width
function adjustSearchbarWidth() {
    let w = document.documentElement["scrollWidth"];
    if (w > 1400) {
        document.getElementById("searchDiv").style.width = "60%";
    } else {
        document.getElementById("searchDiv").style.width = "80%";
        if (w > 462) {
            document.getElementById("settingsMenuIcon").style.color = "white";
        } else {
            document.getElementById("settingsMenuIcon").style.color = "transparent";
        }
    }
}

// configure search engine
function configureSearchEngine() {
    document.getElementById("searchInput").name = "q"
    switch (localStorage.getItem("search")) {
        case "duckduckgo":
            document.getElementById("logo").style.width = "30px";
            extra = ".com";
            break;

        case "startpage":
            document.getElementById("logo").style.width = "20px";
            extra = ".com/sp/search?query=";
            break;

        case "searx":
            document.getElementById("logo").style.width = "22px";
            extra = ".org/search";
            break;

        case "wikipedia":
            document.getElementById("searchInput").name = "search";
            document.getElementById("logo").style.width = "20px";
            extra = ".org/wiki/Special:Search";
            break;

        case "yandex":
            document.getElementById("searchInput").name = "text";
    
        default:
            document.getElementById("logo").style.width = "20px";
            extra = ".com/search";
            break;
    }
    document.getElementById("searchbar").action = "https://" + localStorage.getItem("search") + extra;
}

// update time and date
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let month = today.toLocaleString("default", {month: "long"});
    let mday = today.toLocaleDateString("default", {day: "numeric"});
    let wday = today.toLocaleString("default", {weekday: "long"});
    let y = today.getFullYear()
    m = checkTime(m);
    s = checkTime(s);
    if (sec) {
      document.getElementById("time").style.fontSize = "75px";
      document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
    } else {
      document.getElementById("time").style.fontSize = "119px";
      document.getElementById('time').innerHTML =  h + ":" + m;
    }
    document.getElementById("date").innerHTML = mday + " " + month + ", " + y;
    document.getElementById("weekDay").innerHTML = wday;
  
    setTimeout(startTime, 1000);   
}

// format time to always have two digit numbers
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// show settings overlay
function showSettings() {
    document.getElementById("settingsOverlay").style.display = "block";
}

// hide settings overlay
function hideSettings() {
    document.getElementById("settingsOverlay").style.display = "none";
}

// toggle seconds
function secondsToggle() {
    if (document.getElementById("showSeconds").checked) {
      sec = true;
    } else {
      sec = false;
    }
    localStorage.setItem("sec", sec);
}

// toggle autocomplete
function autocompleteToggle() {
    if (document.getElementById("autocomplete").checked) {
        autocomplete = true;
        document.getElementById("searchbar").autocomplete = "on";
    } else {
        autocomplete = false;
        document.getElementById("searchbar").autocomplete = "off";
    }
    localStorage.setItem("autocomplete", autocomplete);
}

// change search engine
function changeSearch() {
    localStorage.setItem("search", document.getElementById("chooseSearch").value);
    configureSearchEngine()
    document.getElementById("logo").src = "img/" + localStorage.getItem("search") + ".svg";
  }

// toggle logo
function toggleLogo() {
    if (document.getElementById("showLogo").checked) {
        logo = true;
        document.getElementById("logo").style.display = "block"
    } else {
        logo = false;
        document.getElementById("logo").style.display = "none"
    }
    localStorage.setItem("logo", logo)
}

function addTest() {
    document.getElementById("links").innerHTML += '<a href="https://google.com" class="link"><img src="https://google.com/favicon.ico" alt="logo"><br>Google</a>'
}


