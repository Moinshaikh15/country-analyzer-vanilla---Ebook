let ranking = [];
let metered = true;
let showForm = false;
let selected = [];
let showErr = false;
let success = false;
let showInfo = null;

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

let allCountriesData =[
  {
      "country": "Albania",
      "Numbero Health Care EXP": 26.31675127,
      "Legatum Health": 66.66113744,
      "WHO Performance": 65.9,
      "Numbero Safety Index": 46.86148318,
      "Numbero Purchasing Power": 77.10003405,
      "Adventure index": 95.05,
      "lat": 41,
      "lng": 20
  },
  {
      "country": "Argentina",
      "Numbero Health Care EXP": 69.80304569,
      "Legatum Health": 75.39336493,
      "WHO Performance": 62.05,
      "Numbero Safety Index": 19.24109768,
      "Numbero Purchasing Power": 72.89426188,
      "Adventure index": 86.3875,
      "lat": -34,
      "lng": -64
  },
  {
      "country": "Armenia",
      "Numbero Health Care EXP": 39.49441624,
      "Legatum Health": 68.30331754,
      "WHO Performance": 70.3,
      "Numbero Safety Index": 87.70989873,
      "Numbero Purchasing Power": 79.29984676,
      "Adventure index": 25.75,
      "lat": 40,
      "lng": 45
  },
  {
      "country": "Australia",
      "Numbero Health Care EXP": 88.41928934,
      "Legatum Health": 83.21327014,
      "WHO Performance": 79.65,
      "Numbero Safety Index": 50.3868017,
      "Numbero Purchasing Power": 2.16311936,
      "Adventure index": 90.1,
      "lat": -27,
      "lng": 133
  },
  {
      "country": "Austria",
      "Numbero Health Care EXP": 85.03553299,
      "Legatum Health": 81.8056872,
      "WHO Performance": 92.85,
      "Numbero Safety Index": 79.51110748,
      "Numbero Purchasing Power": 37.95853908,
      "Adventure index": 70.3,
      "lat": 47.3333,
      "lng": 13.3333
  },
  {
      "country": "Azerbaijan",
      "Numbero Health Care EXP": 20.54314721,
      "Legatum Health": 65.46208531,
      "WHO Performance": 68.1,
      "Numbero Safety Index": 71.57105521,
      "Numbero Purchasing Power": 76.50161757,
      "Adventure index": 7.1875,
      "lat": 40.5,
      "lng": 47.5
  },
  {
      "country": "Bangladesh",
      "Numbero Health Care EXP": 9.710659898,
      "Legatum Health": 53.992891,
      "WHO Performance": 44.45,
      "Numbero Safety Index": 20.90672983,
      "Numbero Purchasing Power": 79.88983484,
      "Adventure index": 2.2375,
      "lat": 24,
      "lng": 90
  },
  {
      "country": "Belgium",
      "Numbero Health Care EXP": 83.30456853,
      "Legatum Health": 84.20379147,
      "WHO Performance": 85.7,
      "Numbero Safety Index": 47.34661875,
      "Numbero Purchasing Power": 28.53558658,
      "Adventure index": 46.7875,
      "lat": 50.8333,
      "lng": 4
  },
  {
      "country": "Bosnia And Herzegovina",
      "Numbero Health Care EXP": 40.30964467,
      "Legatum Health": 56.78199052,
      "WHO Performance": 62.6,
      "Numbero Safety Index": 53.81509311,
      "Numbero Purchasing Power": 62.04690959,
      "Adventure index": 61.6375,
      "lat": 44,
      "lng": 18
  },
  {
      "country": "Brazil",
      "Numbero Health Care EXP": 45.14517766,
      "Legatum Health": 61.91706161,
      "WHO Performance": 58.2,
      "Numbero Safety Index": 14.87487749,
      "Numbero Purchasing Power": 78.25472501,
      "Adventure index": 100,
      "lat": -10,
      "lng": -55
  },
  {
      "country": "Bulgaria",
      "Numbero Health Care EXP": 42.74416244,
      "Legatum Health": 68.8507109,
      "WHO Performance": 50.5,
      "Numbero Safety Index": 60.83338778,
      "Numbero Purchasing Power": 61.71820194,
      "Adventure index": 23.275,
      "lat": 43,
      "lng": 25
  },
  {
      "country": "Cambodia",
      "Numbero Health Care EXP": 27.77969543,
      "Legatum Health": 59.83175355,
      "WHO Performance": 14.75,
      "Numbero Safety Index": 39.24485462,
      "Numbero Purchasing Power": 89.48135536,
      "Adventure index": 17.0875,
      "lat": 13,
      "lng": 105
  },
  {
      "country": "Canada",
      "Numbero Health Care EXP": 75.31979695,
      "Legatum Health": 78.46919431,
      "WHO Performance": 81.85,
      "Numbero Safety Index": 52.32734401,
      "Numbero Purchasing Power": 15.5558488,
      "Adventure index": 78.9625,
      "lat": 60,
      "lng": -95
  },
  {
      "country": "Chile",
      "Numbero Health Care EXP": 60.61218274,
      "Legatum Health": 71.43127962,
      "WHO Performance": 88.45,
      "Numbero Safety Index": 31.49885658,
      "Numbero Purchasing Power": 71.08215563,
      "Adventure index": 49.2625,
      "lat": -30,
      "lng": -71
  },
  {
      "country": "China",
      "Numbero Health Care EXP": 63.78375635,
      "Legatum Health": 90.12085308,
      "WHO Performance": 67.55,
      "Numbero Safety Index": 76.2768703,
      "Numbero Purchasing Power": 53.84607526,
      "Adventure index": 19.5625,
      "lat": 35,
      "lng": 105
  },
  {
      "country": "Colombia",
      "Numbero Health Care EXP": 65.48121827,
      "Legatum Health": 79.45971564,
      "WHO Performance": 73.05,
      "Numbero Safety Index": 27.94119569,
      "Numbero Purchasing Power": 77.4203133,
      "Adventure index": 55.45,
      "lat": 4,
      "lng": -72
  },
  {
      "country": "Costa Rica",
      "Numbero Health Care EXP": 56.87106599,
      "Legatum Health": 78.52132701,
      "WHO Performance": 87.35,
      "Numbero Safety Index": 35.78422084,
      "Numbero Purchasing Power": 68.7222033,
      "Adventure index": 87.625,
      "lat": 10,
      "lng": -84
  },
  {
      "country": "Croatia",
      "Numbero Health Care EXP": 60.02030457,
      "Legatum Health": 72.5521327,
      "WHO Performance": 69.75,
      "Numbero Safety Index": 84.08755309,
      "Numbero Purchasing Power": 56.75387366,
      "Adventure index": 62.875,
      "lat": 45.1667,
      "lng": 15.5
  },
  {
      "country": "Cyprus",
      "Numbero Health Care EXP": 35.26192893,
      "Legatum Health": 80.31990521,
      "WHO Performance": 89,
      "Numbero Safety Index": 72.65452467,
      "Numbero Purchasing Power": 55.33790226,
      "Adventure index": 67.825,
      "lat": 35,
      "lng": 33
  },
  {
      "country": "Czech Republic",
      "Numbero Health Care EXP": 84.94619289,
      "Legatum Health": 80.08530806,
      "WHO Performance": 56.55,
      "Numbero Safety Index": 81.19291081,
      "Numbero Purchasing Power": 42.29916567,
      "Adventure index": 40.6,
      "lat": 49.75,
      "lng": 15.5
  },
  {
      "country": "Denmark",
      "Numbero Health Care EXP": 94.30456853,
      "Legatum Health": 84.33412322,
      "WHO Performance": 65.35,
      "Numbero Safety Index": 80.2873244,
      "Numbero Purchasing Power": 17.16567342,
      "Adventure index": 57.925,
      "lat": 56,
      "lng": 10
  },
  {
      "country": "Dominican Republic",
      "Numbero Health Care EXP": 38.82436548,
      "Legatum Health": 1,
      "WHO Performance": 78,
      "Numbero Safety Index": 23.44560601,
      "Numbero Purchasing Power": 83.02520007,
      "Adventure index": 76.4875,
      "lat": 19,
      "lng": -70.6667
  },
  {
      "country": "Ecuador",
      "Numbero Health Care EXP": 68.02741117,
      "Legatum Health": 64.23696682,
      "WHO Performance": 48.3,
      "Numbero Safety Index": 29.2995753,
      "Numbero Purchasing Power": 72.97011749,
      "Adventure index": 35.65,
      "lat": -2,
      "lng": -77.5
  },
  {
      "country": "Egypt",
      "Numbero Health Care EXP": 21.20203046,
      "Legatum Health": 49.30094787,
      "WHO Performance": 77.45,
      "Numbero Safety Index": 47.50833061,
      "Numbero Purchasing Power": 82.94091606,
      "Adventure index": 60.4,
      "lat": 27,
      "lng": 30
  },
  {
      "country": "Estonia",
      "Numbero Health Care EXP": 81.20507614,
      "Legatum Health": 75.60189573,
      "WHO Performance": 37.85,
      "Numbero Safety Index": 83.8449853,
      "Numbero Purchasing Power": 50.33143198,
      "Adventure index": 14.6125,
      "lat": 59,
      "lng": 26
  },
  {
      "country": "Finland",
      "Numbero Health Care EXP": 86.44263959,
      "Legatum Health": 86.39336493,
      "WHO Performance": 76.9,
      "Numbero Safety Index": 79.47876511,
      "Numbero Purchasing Power": 24.54895284,
      "Adventure index": 66.5875,
      "lat": 64,
      "lng": 26
  },
  {
      "country": "France",
      "Numbero Health Care EXP": 93.70152284,
      "Legatum Health": 84.02132701,
      "WHO Performance": 98.9,
      "Numbero Safety Index": 34.92714799,
      "Numbero Purchasing Power": 34.14890175,
      "Adventure index": 85.15,
      "lat": 46,
      "lng": 2
  },
  {
      "country": "Georgia",
      "Numbero Health Care EXP": 35.9319797,
      "Legatum Health": 60.14454976,
      "WHO Performance": 54.9,
      "Numbero Safety Index": 82.04998367,
      "Numbero Purchasing Power": 80.06683126,
      "Adventure index": 77.725,
      "lat": 42,
      "lng": 43.5
  },
  {
      "country": "Germany",
      "Numbero Health Care EXP": 77.26294416,
      "Legatum Health": 85.63744076,
      "WHO Performance": 78.55,
      "Numbero Safety Index": 63.03266906,
      "Numbero Purchasing Power": 14.64558147,
      "Adventure index": 41.8375,
      "lat": 51,
      "lng": 9
  },
  {
      "country": "Greece",
      "Numbero Health Care EXP": 43.76040609,
      "Legatum Health": 74.4028436,
      "WHO Performance": 95.05,
      "Numbero Safety Index": 45.30904933,
      "Numbero Purchasing Power": 68.89077133,
      "Adventure index": 96.2875,
      "lat": 39,
      "lng": 22
  },
  {
      "country": "Guatemala",
      "Numbero Health Care EXP": 63.73908629,
      "Legatum Health": 51.82938389,
      "WHO Performance": 46.65,
      "Numbero Safety Index": 29.10552107,
      "Numbero Purchasing Power": 78.59186106,
      "Adventure index": 22.0375,
      "lat": 15.5,
      "lng": -90.25
  },
  {
      "country": "Hungary",
      "Numbero Health Care EXP": 38.85786802,
      "Legatum Health": 72.99526066,
      "WHO Performance": 43.35,
      "Numbero Safety Index": 68.04573669,
      "Numbero Purchasing Power": 56.37459561,
      "Adventure index": 33.175,
      "lat": 47,
      "lng": 20
  },
  {
      "country": "Iceland",
      "Numbero Health Care EXP": 65.91675127,
      "Legatum Health": 88.58293839,
      "WHO Performance": 86.25,
      "Numbero Safety Index": 83.58624632,
      "Numbero Purchasing Power": 31.61195301,
      "Adventure index": 69.0625,
      "lat": 65,
      "lng": -18
  },
  {
      "country": "India",
      "Numbero Health Care EXP": 61.1035533,
      "Legatum Health": 49.01421801,
      "WHO Performance": 36.2,
      "Numbero Safety Index": 50.80725253,
      "Numbero Purchasing Power": 36.82070492,
      "Adventure index": 34.4125,
      "lat": 20,
      "lng": 77
  },
  {
      "country": "Indonesia",
      "Numbero Health Care EXP": 50.02538071,
      "Legatum Health": 63.63744076,
      "WHO Performance": 51.6,
      "Numbero Safety Index": 48.39774583,
      "Numbero Purchasing Power": 79.73812362,
      "Adventure index": 51.7375,
      "lat": -5,
      "lng": 120
  },
  {
      "country": "Ireland",
      "Numbero Health Care EXP": 35.80913706,
      "Legatum Health": 81.5450237,
      "WHO Performance": 83.5,
      "Numbero Safety Index": 48.70499837,
      "Numbero Purchasing Power": 37.86582666,
      "Adventure index": 81.4375,
      "lat": 53,
      "lng": -8
  },
  {
      "country": "Israel",
      "Numbero Health Care EXP": 80.85888325,
      "Legatum Health": 90.12085308,
      "WHO Performance": 79.1,
      "Numbero Safety Index": 70.84335185,
      "Numbero Purchasing Power": 39.26494126,
      "Adventure index": 5.95,
      "lat": 31.5,
      "lng": 34.75
  },
  {
      "country": "Italy",
      "Numbero Health Care EXP": 65.09035533,
      "Legatum Health": 85.55924171,
      "WHO Performance": 99.45,
      "Numbero Safety Index": 48.10666449,
      "Numbero Purchasing Power": 52.36267666,
      "Adventure index": 98.7625,
      "lat": 42.8333,
      "lng": 12.8333
  },
  {
      "country": "Japan",
      "Numbero Health Care EXP": 94.22639594,
      "Legatum Health": 100,
      "WHO Performance": 96.15,
      "Numbero Safety Index": 86.91751062,
      "Numbero Purchasing Power": 24.43938362,
      "Adventure index": 59.1625,
      "lat": 36,
      "lng": 138
  },
  {
      "country": "Jordan",
      "Numbero Health Care EXP": 60.50050761,
      "Legatum Health": 64.28909953,
      "WHO Performance": 46.1,
      "Numbero Safety Index": 56.56419471,
      "Numbero Purchasing Power": 74.08266644,
      "Adventure index": 18.325,
      "lat": 31,
      "lng": 36
  },
  {
      "country": "Kazakhstan",
      "Numbero Health Care EXP": 48.1715736,
      "Legatum Health": 66.58293839,
      "WHO Performance": 26.85,
      "Numbero Safety Index": 37.11025809,
      "Numbero Purchasing Power": 71.55414609,
      "Adventure index": 1,
      "lat": 48,
      "lng": 68
  },
  {
      "country": "Kenya",
      "Numbero Health Care EXP": 56.40203046,
      "Legatum Health": 42.62796209,
      "WHO Performance": 3.2,
      "Numbero Safety Index": 31.78993793,
      "Numbero Purchasing Power": 74.11638004,
      "Adventure index": 29.4625,
      "lat": 1,
      "lng": 38
  },
  {
      "country": "Latvia",
      "Numbero Health Care EXP": 56.92690355,
      "Legatum Health": 66.47867299,
      "WHO Performance": 34.55,
      "Numbero Safety Index": 60.63933355,
      "Numbero Purchasing Power": 59.240252,
      "Adventure index": 12.1375,
      "lat": 57,
      "lng": 25
  },
  {
      "country": "Lebanon",
      "Numbero Health Care EXP": 61.27106599,
      "Legatum Health": 55.76540284,
      "WHO Performance": 47.75,
      "Numbero Safety Index": 47.54067298,
      "Numbero Purchasing Power": 74.29337647,
      "Adventure index": 10.9,
      "lat": 33.8333,
      "lng": 35.8333
  },
  {
      "country": "Lithuania",
      "Numbero Health Care EXP": 79.02741117,
      "Legatum Health": 67.28672986,
      "WHO Performance": 49.95,
      "Numbero Safety Index": 70.24501797,
      "Numbero Purchasing Power": 54.32649413,
      "Adventure index": 9.6625,
      "lat": 56,
      "lng": 24
  },
  {
      "country": "Luxembourg",
      "Numbero Health Care EXP": 74.37055838,
      "Legatum Health": 86.73222749,
      "WHO Performance": 84.05,
      "Numbero Safety Index": 65.34514864,
      "Numbero Purchasing Power": 20.22518304,
      "Adventure index": 43.075,
      "lat": 49.75,
      "lng": 6.1667
  },
  {
      "country": "Malaysia",
      "Numbero Health Care EXP": 71.35532995,
      "Legatum Health": 74.79383886,
      "WHO Performance": 53.8,
      "Numbero Safety Index": 34.95949036,
      "Numbero Purchasing Power": 51.17427209,
      "Adventure index": 56.6875,
      "lat": 2.5,
      "lng": 112.5
  },
  {
      "country": "Malta",
      "Numbero Health Care EXP": 1,
      "Legatum Health": 87.0450237,
      "WHO Performance": 100,
      "Numbero Safety Index": 52.18180333,
      "Numbero Purchasing Power": 63.48816618,
      "Adventure index": 28.225,
      "lat": 35.8333,
      "lng": 14.5833
  },
  {
      "country": "Mexico",
      "Numbero Health Care EXP": 76.92791878,
      "Legatum Health": 63.63744076,
      "WHO Performance": 66.45,
      "Numbero Safety Index": 35.7195361,
      "Numbero Purchasing Power": 66.60667461,
      "Adventure index": 88.8625,
      "lat": 23,
      "lng": -102
  },
  {
      "country": "Morocco",
      "Numbero Health Care EXP": 18.76751269,
      "Legatum Health": 60.97867299,
      "WHO Performance": 91.75,
      "Numbero Safety Index": 46.27932048,
      "Numbero Purchasing Power": 73.71181679,
      "Adventure index": 65.35,
      "lat": 32,
      "lng": -5
  },
  {
      "country": "Nepal",
      "Numbero Health Care EXP": 43.13502538,
      "Legatum Health": 41.32464455,
      "WHO Performance": 47.2,
      "Numbero Safety Index": 61.80365893,
      "Numbero Purchasing Power": 84.41588626,
      "Adventure index": 4.7125,
      "lat": 28,
      "lng": 84
  },
  {
      "country": "Netherlands",
      "Numbero Health Care EXP": 84.80101523,
      "Legatum Health": 88.58293839,
      "WHO Performance": 90.65,
      "Numbero Safety Index": 78.29826854,
      "Numbero Purchasing Power": 17.31738464,
      "Adventure index": 83.9125,
      "lat": 52.5,
      "lng": 5.75
  },
  {
      "country": "New Zealand",
      "Numbero Health Care EXP": 78.16751269,
      "Legatum Health": 82.04028436,
      "WHO Performance": 57.1,
      "Numbero Safety Index": 50.74256779,
      "Numbero Purchasing Power": 29.58913673,
      "Adventure index": 92.575,
      "lat": -41,
      "lng": 174
  },
  {
      "country": "Pakistan",
      "Numbero Health Care EXP": 47.82538071,
      "Legatum Health": 29.41232227,
      "WHO Performance": 54.35,
      "Numbero Safety Index": 55.67477948,
      "Numbero Purchasing Power": 80.63996254,
      "Adventure index": 3.475,
      "lat": 30,
      "lng": 70
  },
  {
      "country": "Panama",
      "Numbero Health Care EXP": 50.96345178,
      "Legatum Health": 73.54265403,
      "WHO Performance": 64.25,
      "Numbero Safety Index": 52.35968638,
      "Numbero Purchasing Power": 73.72024519,
      "Adventure index": 45.55,
      "lat": 9,
      "lng": -80
  },
  {
      "country": "Peru",
      "Numbero Health Care EXP": 39.11472081,
      "Legatum Health": 73.30805687,
      "WHO Performance": 35.65,
      "Numbero Safety Index": 14.14717413,
      "Numbero Purchasing Power": 77.20960327,
      "Adventure index": 52.975,
      "lat": -10,
      "lng": -76
  },
  {
      "country": "Philippines",
      "Numbero Health Care EXP": 65.45888325,
      "Legatum Health": 55.76540284,
      "WHO Performance": 31.8,
      "Numbero Safety Index": 54.38108461,
      "Numbero Purchasing Power": 84.34003065,
      "Adventure index": 64.1125,
      "lat": 13,
      "lng": 122
  },
  {
      "country": "Poland",
      "Numbero Health Care EXP": 38.08730964,
      "Legatum Health": 70.31042654,
      "WHO Performance": 52.15,
      "Numbero Safety Index": 70.92420778,
      "Numbero Purchasing Power": 50.12915035,
      "Adventure index": 44.3125,
      "lat": 52,
      "lng": 20
  },
  {
      "country": "Portugal",
      "Numbero Health Care EXP": 76.52588832,
      "Legatum Health": 76.51421801,
      "WHO Performance": 93.95,
      "Numbero Safety Index": 71.89447893,
      "Numbero Purchasing Power": 60.88379023,
      "Adventure index": 91.3375,
      "lat": 39.5,
      "lng": -8
  },
  {
      "country": "Qatar",
      "Numbero Health Care EXP": 79.76446701,
      "Legatum Health": 76.48815166,
      "WHO Performance": 71.95,
      "Numbero Safety Index": 100,
      "Numbero Purchasing Power": 18.53950281,
      "Adventure index": 13.375,
      "lat": 25.5,
      "lng": 51.25
  },
  {
      "country": "Romania",
      "Numbero Health Care EXP": 41.45989848,
      "Legatum Health": 68.98104265,
      "WHO Performance": 40.05,
      "Numbero Safety Index": 70.3258739,
      "Numbero Purchasing Power": 60.08309212,
      "Adventure index": 38.125,
      "lat": 46,
      "lng": 25
  },
  {
      "country": "Saudi Arabia",
      "Numbero Health Care EXP": 51.85685279,
      "Legatum Health": 68.35545024,
      "WHO Performance": 95.6,
      "Numbero Safety Index": 83.06876838,
      "Numbero Purchasing Power": 22.64413417,
      "Adventure index": 8.425,
      "lat": 25,
      "lng": 45
  },
  {
      "country": "Singapore",
      "Numbero Health Care EXP": 77.37461929,
      "Legatum Health": 98.67061611,
      "WHO Performance": 93.4,
      "Numbero Safety Index": 78.86426005,
      "Numbero Purchasing Power": 21.47258641,
      "Adventure index": 71.5375,
      "lat": 1.3667,
      "lng": 103.8
  },
  {
      "country": "Slovakia",
      "Numbero Health Care EXP": 51.62233503,
      "Legatum Health": 74.87203791,
      "WHO Performance": 52.7,
      "Numbero Safety Index": 73.49542633,
      "Numbero Purchasing Power": 55.86889154,
      "Adventure index": 15.85,
      "lat": 48.6667,
      "lng": 19.5
  },
  {
      "country": "Slovenia",
      "Numbero Health Care EXP": 64.29746193,
      "Legatum Health": 83.18720379,
      "WHO Performance": 67,
      "Numbero Safety Index": 85.41359033,
      "Numbero Purchasing Power": 52.40481866,
      "Adventure index": 20.8,
      "lat": 46,
      "lng": 15
  },
  {
      "country": "South Africa",
      "Numbero Health Care EXP": 58.92588832,
      "Legatum Health": 21.61848341,
      "WHO Performance": 1,
      "Numbero Safety Index": 1,
      "Numbero Purchasing Power": 35.64072876,
      "Adventure index": 50.5,
      "lat": -29,
      "lng": 24
  },
  {
      "country": "South Korea",
      "Numbero Health Care EXP": 100,
      "Legatum Health": 93.30094787,
      "WHO Performance": 42.25,
      "Numbero Safety Index": 80.62691931,
      "Numbero Purchasing Power": 32.72450196,
      "Adventure index": 30.7,
      "lat": 37.5,
      "lng": 127.02
  },
  {
      "country": "Spain",
      "Numbero Health Care EXP": 90.64162437,
      "Legatum Health": 83.96919431,
      "WHO Performance": 97.8,
      "Numbero Safety Index": 66.33159098,
      "Numbero Purchasing Power": 36.10429082,
      "Adventure index": 97.525,
      "lat": 40,
      "lng": -4
  },
  {
      "country": "Sri Lanka",
      "Numbero Health Care EXP": 75.52081218,
      "Legatum Health": 75.70616114,
      "WHO Performance": 64.8,
      "Numbero Safety Index": 56.62887945,
      "Numbero Purchasing Power": 88.3688064,
      "Adventure index": 36.8875,
      "lat": 7,
      "lng": 81
  },
  {
      "country": "Sweden",
      "Numbero Health Care EXP": 70.7857868,
      "Legatum Health": 88.13981043,
      "WHO Performance": 89.55,
      "Numbero Safety Index": 44.01535446,
      "Numbero Purchasing Power": 21.23659118,
      "Adventure index": 72.775,
      "lat": 62,
      "lng": 15
  },
  {
      "country": "Switzerland",
      "Numbero Health Care EXP": 87.22436548,
      "Legatum Health": 86.60189573,
      "WHO Performance": 86.8,
      "Numbero Safety Index": 87.11156485,
      "Numbero Purchasing Power": 3.317810318,
      "Adventure index": 82.675,
      "lat": 47,
      "lng": 8
  },
  {
      "country": "Thailand",
      "Numbero Health Care EXP": 87.95025381,
      "Legatum Health": 81.07582938,
      "WHO Performance": 45,
      "Numbero Safety Index": 59.94397256,
      "Numbero Purchasing Power": 75.271071,
      "Adventure index": 93.8125,
      "lat": 15,
      "lng": 100
  },
  {
      "country": "Trinidad And Tobago",
      "Numbero Health Care EXP": 40.74517766,
      "Legatum Health": 67.39099526,
      "WHO Performance": 57.65,
      "Numbero Safety Index": 8.762169226,
      "Numbero Purchasing Power": 69.76732505,
      "Adventure index": 74.0125,
      "lat": 11,
      "lng": -61
  },
  {
      "country": "Tunisia",
      "Numbero Health Care EXP": 42.33096447,
      "Legatum Health": 60.27488152,
      "WHO Performance": 75.8,
      "Numbero Safety Index": 51.82603724,
      "Numbero Purchasing Power": 77.12531926,
      "Adventure index": 26.9875,
      "lat": 34,
      "lng": 9
  },
  {
      "country": "Turkey",
      "Numbero Health Care EXP": 72.2822335,
      "Legatum Health": 69.91943128,
      "WHO Performance": 82.95,
      "Numbero Safety Index": 58.37536753,
      "Numbero Purchasing Power": 77.61416652,
      "Adventure index": 80.2,
      "lat": 39,
      "lng": 35
  },
  {
      "country": "United Arab Emirates",
      "Numbero Health Care EXP": 73.47715736,
      "Legatum Health": 77.00947867,
      "WHO Performance": 92.3,
      "Numbero Safety Index": 98.83567462,
      "Numbero Purchasing Power": 1,
      "Adventure index": 24.5125,
      "lat": 24,
      "lng": 54
  },
  {
      "country": "United Kingdom",
      "Numbero Health Care EXP": 82.74619289,
      "Legatum Health": 79.61611374,
      "WHO Performance": 87.9,
      "Numbero Safety Index": 47.49215943,
      "Numbero Purchasing Power": 22.98127022,
      "Adventure index": 48.025,
      "lat": 54,
      "lng": -2
  },
  {
      "country": "United States",
      "Numbero Health Care EXP": 71.56751269,
      "Legatum Health": 66.9478673,
      "WHO Performance": 61.5,
      "Numbero Safety Index": 44.59751715,
      "Numbero Purchasing Power": 17.06453261,
      "Adventure index": 54.2125,
      "lat": 38,
      "lng": -97
  },
  {
      "country": "Uruguay",
      "Numbero Health Care EXP": 67.24568528,
      "Legatum Health": 77.66113744,
      "WHO Performance": 73.6,
      "Numbero Safety Index": 38.581836,
      "Numbero Purchasing Power": 77.10846246,
      "Adventure index": 31.9375,
      "lat": -33,
      "lng": -56
  },
  {
      "country": "Vietnam",
      "Numbero Health Care EXP": 45.64771574,
      "Legatum Health": 73.54265403,
      "WHO Performance": 29.6,
      "Numbero Safety Index": 48.88288141,
      "Numbero Purchasing Power": 77.49616891,
      "Adventure index": 39.3625,
      "lat": 21.02,
      "lng": 105.8
  },
  {
      "country": "Cuba",
      "Numbero Health Care EXP": 3.747208122,
      "Legatum Health": 80.21563981,
      "WHO Performance": 81.3,
      "Numbero Safety Index": 71.5872264,
      "Numbero Purchasing Power": 100,
      "Adventure index": 75.25,
      "lat": 21.5,
      "lng": -80
  }
]

//                   all html Elements from html page                       ///
let formEl = document.querySelector(".formEl");
let leftEl = document.querySelector(".left");
let countriesEl = document.querySelector(".countries");

// ---------------- APP -----------------

// ----------------------------HELPER FUNCTIONS------------------------//


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
          document.querySelector(".err-msg")?.remove();
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

  // fetch("./loc.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     loc = data;
  //   })
  //   .catch((error) => console.log(error));

  //load(); //load the countries data from csv

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
