// check options and set localstorage to default
const setDefaultOptions = () => {
    defaultOptions.forEach(item => {
        if (!keyExists(item[0])) {
            localStorage.setItem(item[0], item[1]);
        }
    });
}

// check if key exists
const keyExists = (key) => {
    if (localStorage.getItem(key) == null) {
        return false;
    } else {
        return true;
    }
}

// onLoad function
const loadConfig = () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("searchInput").focus();

    startTime();
    loadSettings();
    adjustSearchbarWidth();
    configureSearchEngine();
}

// load settings
const loadSettings = () => {
    defaultOptions.forEach(item => {
        if (item[2] == "checkbox") {
            if (localStorage.getItem(item[0]) == "off") {
                document.getElementById(item[3]).checked = false;
            } else {
                document.getElementById(item[3]).checked = localStorage.getItem(item[0]);
            }
            
        } else if (item[2] == "select") {
            document.getElementById(item[3]).value = localStorage.getItem(item[0]);
        }
        item[4]();
    });
}

// toggle seconds
const toggleSeconds = () => {
    if (document.getElementById("showSeconds").checked) {
        localStorage.setItem("sec", true);
    } else {
        localStorage.setItem("sec", "");
    }
}

// toggle logo
const toggleLogo = () => {
    if (document.getElementById("showLogo").checked) {
        document.getElementById("logo").style.display = "block";
        localStorage.setItem("logo", true);
    } else {
        document.getElementById("logo").style.display = "none";
        localStorage.setItem("logo", "");
    }
} 

// toggle edit
const toggleEdit = () => {
    if (document.getElementById("editLinks").checked) {
        // action
        localStorage.setItem("edit", true);
    } else {
        // action
        localStorage.setItem("edit", "");
    }
}

// toggle autocomplete
const toggleAutocomplete = () => {
    if (document.getElementById("autocomplete").checked) {
        document.getElementById("searchbar").autocomplete = "on";
        localStorage.setItem("autocomplete", "on");
    } else {
        document.getElementById("searchbar").autocomplete = "off";
        localStorage.setItem("autocomplete", "off");
    }
}

// change search engine
const changeSearch = () => {
    localStorage.setItem("search", document.getElementById("chooseSearch").value);
    document.getElementById("logo").src = "assets/img/" + localStorage.getItem("search").split("/")[0] + ".svg";
    configureSearchEngine();
}

const configureSearchEngine = () => {
    document.getElementById("searchInput").name = "q";
    switch (localStorage.getItem("search")) {
        case "duckduckgo.com":
            document.getElementById("logo").style.width = "30px";
            break;

        case "searx.org/search":
            document.getElementById("logo").style.width = "22px";
            break;

        case "wikipedia.org/wiki/Special:Search":
            document.getElementById("searchInput").name = "search";

        case "yandex.com/search":
            document.getElementById("searchInput").name = "text";
    
        default:
            document.getElementById("logo").style.width = "20px";
            break;
    }
    document.getElementById("searchbar").action = "https://" + localStorage.getItem("search");
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

// set default options
const defaultOptions = [
    // key-0, value-1, type-2, id-3, function-4
    ["sec", "", "checkbox", "showSeconds", toggleSeconds], // empty String = false, opt-0
    ["logo", true, "checkbox", "showLogo", toggleLogo], // true, opt-1
    ["edit", "", "checkbox", "editLinks", toggleEdit], // false, opt-2
    ["autocomplete", "off", "checkbox", "autocomplete", toggleAutocomplete], // opt-3
	["search", "duckduckgo.com", "select", "chooseSearch", changeSearch] // opt-4
];

setDefaultOptions();

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
    if (localStorage.getItem("sec")) {
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