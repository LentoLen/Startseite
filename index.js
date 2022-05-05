//settings

const defaultSettings = {
    seconds: false,
    searchLogo: true,
    editMode: true,
    searchEngine: "ddg",
    links: [],
    linkNames: [],
    autocomplete: false
};

if (localStorage.getItem("settings") == null) {
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

const setSetting = (setting, val) => {
    let settings = JSON.parse(localStorage.getItem("settings"));
    settings[setting] = val;
    localStorage.setItem("settings", JSON.stringify(settings));
}

const getSetting = (setting) => {
    return JSON.parse(localStorage.getItem("settings"))[setting];
}

// url

const urlSubmit = () => {
    event.preventDefault();
    location.href = `https://duckduckgo.com/?q=${document.getElementById("searchInput").value}!${getSetting("searchEngine")}`;
}

// body load

const bodyLoad = () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("searchInput").focus();
    
    loadSettings();
    updateSettings();
    showLinks();
    startTime();
}

// time and date

const startTime = () => {
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

    if (getSetting("seconds")) {
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
const checkTime = (i) => {
    if (i < 10) {i = "0" + i};
    return i;
}

const loadSettings = () => {
    // sync buttons
    document.getElementById("showSeconds").checked = getSetting("seconds");
    document.getElementById("autocomplete").checked = getSetting("autocomplete");
    document.getElementById("editLinks").checked = getSetting("editMode");
    document.getElementById("showLogo").checked = getSetting("searchLogo");
    document.getElementById("chooseSearch").value = getSetting("searchEngine");

    if (getSetting("searchEngine") == "ddg") {
        document.getElementById("logo").style.width = "30px";
    } else {
        document.getElementById("logo").style.width = "20px"
    }

    document.getElementById("logo").src = `assets/img/${getSetting("searchEngine")}.svg`;
}

const showHideElement = (id, disp) => {
    document.getElementById(id).style.display = disp;
}

const changeSearchEngine = () => {
    setSetting("searchEngine", document.getElementById("chooseSearch").value)
    loadSettings()
}

const toggleSetting = (setting, id) => {
    setSetting(setting, document.getElementById(id).checked)
    updateSettings()
}

const updateSettings = () => {
    document.getElementById("searchbar").autocomplete = (getSetting("autocomplete") ? "on":"off");
    document.getElementById("logo").style.display = (getSetting("searchLogo") ? "block":"none");

    if (getSetting("editMode")) {
        if (getSetting("links").length < 6) {
            document.getElementById("add").style.display = "inline-block";
        }
        Array.from(document.getElementsByClassName("rmbtn")).forEach(element => {
            element.classList.add("edit")
        });
    } else {
        document.getElementById("add").style.display = "none";
        Array.from(document.getElementsByClassName("rmbtn")).forEach(element => {
            element.classList.remove("edit")
        });
    }
}

const editrmOverlay = () => {
    document.querySelectorAll(".editLinkMenu").forEach(element => {
        element.style.display = "none";
    });
    showHideElement("hideEditDeleteLinkMenu", "none");
}

const deleteLink = (link) => {
    let links =  getSetting("links");
    links.splice(link, 1);
    setSetting("links", links);

    //update links
    showLinks();
    editrmOverlay();
}

const showLinks = () => {
    if (getSetting("links").length > 5) {
        document.getElementById("add").style.display = "none";
    } else if (getSetting("editMode")) {
        document.getElementById("add").style.display = "inline-block";
    }

    document.querySelectorAll(".linkbox").forEach(box => {
        box.style.display = "none";
    });
    let links = getSetting("links");
    links.forEach((element, i) => {
        document.getElementById(`linkURL_${i}`).href = element[0];
        document.getElementById(`linkText_${i}`).innerHTML = element[1];
        document.getElementById(`linkImg_${i}`).src = getLinkImg(i);

        document.getElementById(`link_${i}`).style.display = "inline-block";
    });
}

const getLinkImg = (linkId) => {
    let url = getSetting("links")[linkId][0];
    let icon = getSetting("links")[linkId][2];

    let a = document.createElement("a");
    a.href = url;
    a.style.display="none";
    document.body.appendChild(a)

    if (icon == "clearbit") {
        return `https://logo.clearbit.com/${a.hostname}?size=128`;
    } else {
        return `${a.protocol}//${a.hostname}/favicon.ico`;
    }
}

const addLink = () => {
    if (getSetting("links").length < 6) {
        document.getElementById("add").style.display = "inline-block";
        
        showHideElement("linkMenuOverlay", "block");

        document.getElementById("linkMenuHeader").innerHTML = "add link";

        document.getElementById("linkName").value = "";
        document.getElementById("linkURL").value = "";
        document.getElementById("iconMode").value = "clearbit";
        document.getElementById("linkId").value = getSetting("links").length;

        enableOkBtn();

    }
}

const editLink = (link) => {
    editrmOverlay();
    showHideElement("linkMenuOverlay", "block");

    document.getElementById("linkMenuHeader").innerHTML = "edit link";

    document.getElementById("linkName").value = getSetting("links")[link][1];
    document.getElementById("linkURL").value = getSetting("links")[link][0];
    document.getElementById("iconMode").value = getSetting("links")[link][2];
    document.getElementById("linkId").value = link;

    enableOkBtn();
}

const enableOkBtn = () => {
    if (document.querySelector(".validation:invalid") == null) {
        document.getElementById("ok").disabled = false;
    } else {
        document.getElementById("ok").disabled = true;
    }
}

const submitEditLink = () => {
    event.preventDefault();

    let links = getSetting("links");
    let linkId = document.getElementById("linkId").value;
    let link = [document.getElementById("linkURL").value, document.getElementById("linkName").value, document.getElementById("iconMode").value]

    if (links[linkId] == undefined) {
        links.push(link);
        setSetting("links", links);
    } else {
        links[linkId] = link;
        setSetting("links", links);
    }
    showHideElement("linkMenuOverlay", "none")
    showLinks();
}