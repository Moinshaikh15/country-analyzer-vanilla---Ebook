let ranking = [];
let metered = true;
let showForm = false;
let selected = [];
let showErr = false;
let success = false;
let showInfo = null;
let loc = {};
let list = ["Health Quality", "Cost", "Safety", "Travel Time", "Adventure"]; /// features to loop
let optionsArr = [
  "Your Score Here",
  "Very Important(5)",
  "Fairly Important(4)",
  "Important(3)",
  "Slightly Important(2)",
  "Least Important(1)",
]; // option to loop
let rankObj = {
  1: "Your Score Here",
  2: "Your Score Here",
  3: "Your Score Here",
  4: "Your Score Here",
  5: "Your Score Here",
}; //to show the selected options value in the select input
let values = {
  "Very Important(5)": 5,
  "Fairly Important(4)": 4,
  "Important(3)": 3,
  "Slightly Important(2)": 2,
  "Least Important(1)": 1,
}; // to get value from selected options
let optionsObj = {
  "Health Quality": 1,
  Safety: 1,
  Adventure: 1,
  Cost: 1,
  "Travel Time": 1,
}; // to assign value of feature with selected options value
let info = {
  "Health Quality":
    "Quality and performance of healthcare in a specific country, as rated by Legatum Health Index, World Health Organization and citizen surveys. Better Quality is the #2 cited reason people seek medical tourism.",
  Safety:
    "Safety within a specific country. If you do not plan to rent a car or adventure beyond your provider facility, score lower. Based upon citizen surveys in 2022. ",
  Adventure:
    "Quantity of tourist/adventure attractions and opportunities in a specific country. Plan on staying a while? Score higher for more adventurous locations.",
  Cost: "Cost of living in a specific country. While medical procedure cost is a component, other costs include lodging, food, and transportation. Based upon citizen surveys in 2022. Cost is the #1 cited reason people seek medical tourism.",
  "Travel Time":
    "Healthy Tourist uses your IP address to find the nearest airport to you to calculate flight times to various countries.",
};
let allCountriesData = [];

//                   all html Elements from html page                       ///
let formEl = document.querySelector(".formEl");
let leftEl = document.querySelector(".left");
let countriesEl = document.querySelector(".countries");

// ---------------- APP -----------------

// ----------------------------HELPER FUNCTIONS------------------------//
//get data from csv and call rankCountries
const load = function () {
  let countryData = [];

  fetch("./Book2.csv")
    .then((response) => response.text())
    .then((responseText) => {
      var data = Papa.parse(responseText);
      let result = setCountryData(data.data);
      allCountriesData = result;
    });
};

function haversine(lat1, lon1, lat2, lon2) {
  // distance between latitudes
  // and longitudes
  let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  // convert to radiansa
  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  // apply formulae
  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  let rad = 6371;
  let c = 2 * Math.asin(Math.sqrt(a));
  return (rad * c) / 460;
}

//convert array data of countries to an object data
let setCountryData = (data) => {
  let countryObjArr = [];
  for (let i = 6; i < data.length; i++) {
    if (data[i][0] !== "" && data[i][0] !== " ") {
      let obj = {
        country: data[i][0],
        "Numbero Health Care EXP": Number(data[i][1]),
        "Legatum Health": Number(data[i][2]),
        "WHO Performance": Number(data[i][3]),
        "Numbero Safety Index": Number(data[i][4]),
        "Numbero Purchasing Power": Number(data[i][5]),
        "Adventure index": Number(data[i][7]),
        lat: loc[data[i][0]].latitude,
        lng: loc[data[i][0]].longitude,
      };
      countryObjArr.push(obj);
    }
  }
  return countryObjArr;
};

// calculate the countries ranks based  on importance given to the options
let rankCountries = (data) => {
  for (let i = 0; i < data.length; i++) {
    let total =
      data[i]["Adventure index"] * optionsObj["Adventure"] +
      data[i]["Numbero Safety Index"] * optionsObj["Safety"] +
      ((data[i]["Numbero Health Care EXP"] +
        data[i]["Legatum Health"] +
        data[i]["WHO Performance"]) /
        3) *
        optionsObj["Health Quality"];

    // check if it is metered or not
    if (!metered) {
      let nearestAirport = JSON.parse(
        localStorage.getItem("HealthyTourist")
      ).nearestAirport;

      let time = haversine(
        nearestAirport.lat,
        nearestAirport.lng,
        data[i]["lat"],
        data[i]["lng"]
      ); //get time
      let proximity =
        100 - ((time - 3) * (100 - optionsObj["Travel Time"])) / (51.1 - 3);
      total +=
        proximity + data[i]["Numbero Purchasing Power"] * optionsObj["Cost"];
    }
    data[i].total = total;
  }
  data.sort((a, b) => b.total - a.total);
  ranking = data;
  countries(data);
};

let handleChange = (id, value, selectedOpt) => {
  //---------------------------------options Objs--------------------------------
  //set the options obj with options as key and id i.e importance number as value
  let optionsObjCopy = optionsObj;

  //check for the option which has same value before and change it to 1
  Object.keys(optionsObjCopy).map((key) => {
    if (optionsObjCopy[key] === values[selectedOpt]) optionsObjCopy[key] = 1;
  });
  optionsObjCopy[value] = values[selectedOpt];
  optionsObj = optionsObjCopy;

  // ---------------------------------Rank Obj --------------------------------
  //set the Rank obj with id i.e importance number as key and value i.e option as value
  let objCopy = rankObj;

  //check for the selected option was selected before if yes then make it "Your score here"
  Object.keys(objCopy).map((key) => {
    if (objCopy[key] === selectedOpt) objCopy[key] = "Your Score Here";
  });
  objCopy[id] = selectedOpt;
  rankObj = objCopy;

  // ---------------------------------Selected arr----------------------------------
  //add the value of selected option in selected arr
  let copy2 = selected.slice();
  for (let i = 0; i < copy2.length; i++) {
    let found = false;
    Object.keys(objCopy).map((key) => {
      if (objCopy[key] === copy2[i]) {
        found = true;
      }
    });
    if (!found) {
      copy2.splice(i, 1);
      i--;
    }
  }
  copy2.push(selectedOpt);
  //   setSelected(() => copy2);
  selected = copy2;

  formEl.innerHTML = "";
  addToForm();
};

//get users location
let getLocation = () => {
  fetch("https://ipinfo.io/json?token=e001e610573355")
    .then((response) => response.json())
    .then((jsonResponse) => {
      let loc = jsonResponse.loc.split(",");
      let location = {
        country: jsonResponse.country,
        city: jsonResponse.city,
        lat: Number(loc[0]),
        lng: Number(loc[1]),
      };

      userCity = location;
      localStorage.setItem("userLocation", JSON.stringify(location));
      getAirports(location);
    });
};

//get airports
let getAirports = (userLoc) => {
  fetch(
    `https://airlabs.co/api/v9/nearby?lat=${userLoc.lat}&lng=${userLoc.lng}&distance=500&api_key=73d40f17-7ee1-4920-a557-7efc0219902d`
  )
    .then((response) => response.json())
    .then((jsonResponse) => {
      let airportsArr = [];
      let respAirports = jsonResponse.response.airports;
      // console.log(respAirports);
      let count = 0;
      for (let i = 0; i < respAirports.length; i++) {
        if (
          !respAirports[i].name.includes("Municipal") &&
          !respAirports[i].name.includes("Air Force Base")
        ) {
          airportsArr.push(respAirports[i]);
          count++;
        }
        if (count === 6) {
          break;
        }
      }
      localStorage.setItem("AirportsList", JSON.stringify(airportsArr));
    });
};
// ^^^----------------------------HELPER FUNCTIONS------------------------^^^//

let reset = () => {
  selected = [];
  formEl.innerHTML = "";
  addToForm();
};

let addToForm = () => {
  list.forEach((el, indx) => {
    let disabled =
      metered && (el === "Travel Time" || el === "Cost") ? true : false;
    customSelect(indx + 1, disabled, el);
  });

  let cGetCountryBtn = document.createElement("button");
  cGetCountryBtn.innerHTML = "Get Countries";
  cGetCountryBtn.type = "submit";
  cGetCountryBtn.classList.add("submit-btn");
  cGetCountryBtn.style.marginTop = "10px";
  cGetCountryBtn.style.fontSize = "17px";
  cGetCountryBtn.onclick = () => {
    rankCountries(allCountriesData);
    reset();
  };

  formEl.append(cGetCountryBtn);
};

// ----------------Custom select-----------------
function customSelect(id, disabled, feature) {
  let createdSelectedDiv = document.createElement("div");
  let createdLabel = document.createElement("Label");
  let createdH4 = document.createElement("h4");
  let createdImg = document.createElement("img");
  let createdSelect = document.createElement("select");

  //create i btn to show info about the option
  createdImg.src = "./i-btn.png";
  createdImg.classList.add("i-btn");
  createdImg.onclick = () => (showInfo = showInfo === feature ? null : feature);

  createdH4.innerHTML = feature;

  //extra info about options
  //if (showInfo === feature && showInfo !== null) {
  let createdInfo = document.createElement("div");
  createdInfo.classList.add("info");
  createdInfo.style.display = "none";
  let createdP = document.createElement("p");
  let createdB = document.createElement("b");
  createdB.innerHTML = " Register for Access";
  createdP.innerHTML = info[feature];
  if (feature === "Cost" || feature === "Travel Time") {
    createdP.append(createdB);
  }

  createdInfo.append(createdP);
  createdSelectedDiv.append(createdInfo);
  //}

  //      on hover show info         //
  createdImg.onmouseenter = () => {
    showInfo = feature;
    createdInfo.style.display = "flex";
  };
  createdImg.onmouseleave = () => {
    showInfo = null;
    createdInfo.style.display = "none";
  };

  createdH4.append(createdImg);
  createdLabel.append(createdH4);

  createdSelectedDiv.classList.add("select-div");

  createdSelect.onchange = (e) => {
    if (e.target.value !== "Your Score Here")
      handleChange(id, feature, e.target.value); //does not change the actual values of select option
  };

  optionsArr
    .filter((el) => !selected.includes(el) || rankObj[id] === el)
    .forEach((el, indx) => {
      let createdOption = document.createElement("option");
      createdOption.innerHTML = el;
      createdOption.value = el;
      createdOption.disabled =
        metered && (el === "Very Important(5)" || el === "Fairly Important(4)");
      createdSelect.append(createdOption);
    });
  createdSelect.disabled = disabled;
  createdSelect.value = rankObj[id];
  createdSelect.classList.add(id);
  createdSelectedDiv.append(createdLabel, createdSelect);
  if (metered && (feature === "Cost" || feature === "Travel Time")) {
    let createdHideSelect = document.createElement("div");
    createdHideSelect.classList.add("hide-select");
    createdHideSelect.onclick = (e) => {
      showForm = true;
      e.stopPropagation();
    };
  }

  formEl.append(createdSelectedDiv);
}

// ---------------- Opt IN Form -----------------
let showInput = false;
let airportList = {};
let error = "";
let specialties = [
  "Please select",
  "Addiction Treatment",
  "Fertility",
  "Stem Cell",
  "Dentistry",
  "Cosmetic Surgery",
  "Endocrinology",
  "Neurology",
  "Orthopedics",
  "Weight loss",
  "Surgery",
  "Other (specify)",
];
function optInForm() {
  airportList = JSON.parse(localStorage.getItem("AirportsList"));

  let cOptInForm = document.createElement("div");
  let cImg = document.createElement("img");
  let cP = document.createElement("p");
  let cForm = document.createElement("form");

  ///classes
  cOptInForm.classList.add("opt-in-form");
  cImg.classList.add("close");

  cImg.src = "./close.png";
  cImg.onclick = () => {
    document.querySelector(".opt-in-form")?.remove()((showForm = false));
  };
  cP.style.marginBottom = "20px";
  cP.innerHTML =
    "Gain FULL access, including COST and TRAVEL TIME by registering below.";

  cForm.onsubmit = (e) => {
    e.preventDefault();
    submitForm(e);
  };

  // ------------- Speciality----------- //

  let cSpecialityMainDiv = document.createElement("div");
  let cSpecInputDiv = document.createElement("div");
  let cSpecLabel = document.createElement("label");
  let cSpecSelect = document.createElement("select");

  //classes
  cSpecialityMainDiv.classList.add("speciality-mainDiv");
  cSpecInputDiv.classList.add("input-div");
  cSpecialityMainDiv.id = "Speciality-main";

  cSpecLabel.htmlFor = "speciality";
  cSpecLabel.innerHTML = "You are seeking which medical specialty?";

  cSpecSelect.name = "speciality";
  cSpecSelect.id = "speciality";
  cSpecSelect.onchange = (e) => {
    if (error === "speciality") {
      document.querySelector(".err-msg")?.remove();
      error = "";
    }

    if (e.target.value === "Other (specify)") {
      showInput = true;
      let cSpecInput = document.createElement("input");
      cSpecInput.type = "text";
      cSpecInput.name = "spec";
      cSpecInput.id = "spec";
      cSpecInput.placeholder = "Please specify";
      cSpecInput.classList.add("spec-input");
      cSpecInput.onclick = () => {
        if (error === "speciality") {
          error = "";
        }
      };
      cSpecialityMainDiv.append(cSpecInput);
    } else {
      showInput = false;
      document.querySelector("#spec")?.remove();
    }
  };

  for (let i = 0; i < specialties.length; i++) {
    let cOption = document.createElement("option");
    cOption.classList.add("option");
    cOption.value = specialties[i];
    cOption.innerHTML = specialties[i];
    cSpecSelect.append(cOption);
  }

  //append
  cSpecInputDiv.append(cSpecLabel, cSpecSelect);
  cSpecialityMainDiv.append(cSpecInputDiv);

  // ^^^------------- Speciality-----------^^^ //

  // ------------- Nearest Airport ----------- //

  let cAirInputDiv = document.createElement("div");
  let cAirLabel = document.createElement("label");
  let cAirSelect = document.createElement("select");

  cAirInputDiv.classList.add("input-div");
  cAirInputDiv.id = "Airport";
  cAirLabel.htmlFor = "airport";
  cAirLabel.innerHTML = "Nearest Airport";

  cAirSelect.name = "airport";
  cAirSelect.id = "airport";
  cAirSelect.onchange = () => {
    if (error === "airport") {
      document.querySelector(".err-msg")?.remove();
      error = "";
    }
  };
  let cOption = document.createElement("option");
  cOption.value = "Please select";
  cOption.innerHTML = "Please select";
  cAirSelect.append(cOption);
  for (let i = 0; i < airportList.length; i++) {
    let cOption = document.createElement("option");
    cOption.classList.add("option");
    cOption.value = airportList[i].name;
    cOption.innerHTML = airportList[i].name;
    cAirSelect.append(cOption);
  }
  cAirInputDiv.append(cAirLabel, cAirSelect);

  // ^^^------------- Nearest Airport --------^^^ //

  let cSubmitBtn = document.createElement("button");
  cSubmitBtn.type = "submit";
  cSubmitBtn.classList.add("submit-btn");
  cSubmitBtn.innerHTML = "Submit";

  cForm.append(cSpecialityMainDiv, cAirInputDiv, cSubmitBtn);
  cOptInForm.append(cImg, cP, cForm);
  leftEl.append(cOptInForm);
}

// submit form to the pipeline.
let submitForm = (e) => {
  let country = JSON.parse(localStorage.getItem("userLocation")).country;

  let nearestAirInfo;
  airportList.map((el) => {
    if (el.name === e.target.airport.value) {
      nearestAirInfo = el;
    }
  });

  let info = {
    speciality: showInput ? e.target.spec.value : e.target.speciality.value,
    nearestAirport: nearestAirInfo,
  };

  let cErrMsgDiv = document.createElement("div");
  let cErrP = document.createElement("div");
  let cSquare = document.createElement("div");
  cErrMsgDiv.classList.add("err-msg");
  cSquare.classList.add("square");
  //check if all field are field and then submit form otherwise give error msg
  if (info.speciality === "Please select" || info.speciality === "") {
    cErrP.innerHTML = `Please select speciality`;
    cErrMsgDiv.append(cErrP, cSquare);
    let inputDivEl = document.getElementById("Speciality-main");
    inputDivEl.append(cErrMsgDiv);
    error = "speciality";
  } else if (info.nearestAirport === undefined) {
    cErrP.innerHTML = `Please select nearest Airport`;
    cErrMsgDiv.append(cErrP, cSquare);
    let inputDivEl = document.getElementById("Airport");
    inputDivEl.append(cErrMsgDiv);
    error = "airport";
  } else {
    showForm = false;
    metered = false;
    localStorage.setItem("HealthyTourist", JSON.stringify(info));

    success = true;
    //show if the form submission was successful

    let cSuccess = document.createElement("div");
    let cSuccessP = document.createElement("p");
    cSuccessP.innerHTML = "Now You Have Full Access";
    cSuccess.classList.add("success");

    cSuccess.append(cSuccessP);
    document.querySelector(".App").append(cSuccess);
    setTimeout(() => {
      success = false;
      document.querySelector(".success")?.remove();
    }, 2500);
    formEl.innerHTML = "";
    addToForm();
    document.querySelector(".opt-in-form")?.remove();
    document.querySelector(".fullAccess-btn")?.remove();
  }
};
//^^^ ---------------- Opt IN Form -----------------^^^//

function countries(ranking) {
  countriesEl.innerHTML = "";

  let createdCountryMain = document.createElement("div");
  createdCountryMain.classList.add("country-main");

  for (let i = 0; i < 20; i++) {
    let item = ranking[i];
    let cCountryInfo = document.createElement("div");
    let cHighRank = document.createElement("span");
    let cImg = document.createElement("img");
    let cH3 = document.createElement("h3");

    cCountryInfo.classList.add("country-info");

    if (i === 0) {
      cCountryInfo.classList.add("firstCountry");
    }
    cHighRank.classList.add("high-rank");
    cHighRank.innerHTML = `#${i + 1}`;

    cImg.src = `../images/${item.country}.jpg`;
    cImg.classList.add("img");

    cH3.innerHTML = item.country;

    cCountryInfo.append(cHighRank, cImg, cH3);
    createdCountryMain.append(cCountryInfo);
  }

  // ranking.map((item, indx) => {
  //   let cCountryInfo = document.createElement("div");
  //   let cHighRank = document.createElement("span");
  //   let cImg = document.createElement("img");
  //   let cH3 = document.createElement("h3");

  //   cCountryInfo.classList.add("country-info");

  //   if (indx === 0) {
  //     cCountryInfo.classList.add("firstCountry");
  //   }
  //   cHighRank.classList.add("high-rank");
  //   cHighRank.innerHTML = `#${indx + 1}`;

  //   cImg.src = `../images/${item.country}.jpg`;
  //   cImg.classList.add("img");

  //   cH3.innerHTML = item.country;

  //   cCountryInfo.append(cHighRank, cImg, cH3);
  //   createdCountryMain.append(cCountryInfo);
  // });
  countriesEl.append(createdCountryMain);
}

// -------------ON page Load -------------- //
let onPageLoad = () => {
  if (localStorage.getItem("userLocation") === null) {
    getLocation();
  }
  if (localStorage.getItem("HealthyTourist")) {
    metered = false;
  }

  fetch("./loc.json")
    .then((response) => response.json())
    .then((data) => {
      loc = data;
    })
    .catch((error) => console.log(error));

  load(); //load the countries data from csv

  //text that tell how many elements you can choose 3 or 5 based on metered
  let pEl = document.querySelector(".left-p");
  if (metered) {
    pEl.innerHTML =
      "Rank these three features of Medical Tourism (3-1) 3 being most important.";
  } else
    pEl.innerHTML =
      "Rank these five features of Medical Tourism (5-1) 5 being most important.";

  addToForm(); // add options form to select ranks
  if (!localStorage.getItem("HealthyTourist")) {
    let createdButtonEl = document.createElement("button");
    createdButtonEl.innerHTML = "Get Full Access";
    createdButtonEl.classList.add("fullAccess-btn");
    createdButtonEl.onclick = () => {
      showForm = true;
      optInForm();
    };

    leftEl.append(createdButtonEl);
  } else {
    document.querySelector(".fullAccess-btn")?.remove();
  }
};

onPageLoad();
