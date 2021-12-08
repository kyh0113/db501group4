const LOC_NEXT = "c-home.html";
const LOC_C_HOME = "c-home.html";

const URL_LOGIN = "php/c_login.php";
const URL_C_RESERVATION = "php/c_reservation.php";
const SUCCESS = 0;

var sShop;
var tTeacher;
var pPrices;
var cCustomer;
var teacher;
var rStyle;
var rTime;
var rDate;

function setItems() {
  var item = sessionStorage.getItem("shop");
  if(item != null) {
    sShop = JSON.parse(item);
    document.getElementById("shop_name").innerHTML = "<h2><b>" + sShop.s_name + "'s TEACHER</b></h2>";
  }
  else {
    location.assign(LOC_LOGIN);
  }

  item = sessionStorage.getItem("customer");
  if(item != null) {
    cCustomer = JSON.parse(item);
  }
  else {
    location.assign(LOC_LOGIN);
  }

  item = sessionStorage.getItem("teachers");
  if(item != null) {
    tTeacher = JSON.parse(item);
    showTeachers();
  }
  else {
    location.assign(LOC_LOGIN);
  }

  item = sessionStorage.getItem("price");
  if(item != null) {
    pPrices = JSON.parse(item);
    showPrice(pPrices);
  }
  else {
    location.assign(LOC_LOGIN);
  }
}

function showTeachers() {
    /* css 수정 필요 (w3파일 없음) 만들어야함*/ 
   var buff = '<table class="w3-table w3-bordered w3-striped w3-border test w3-hoverable">';
   buff += '<tr class="w3-black">';
   buff += '<th>TEACHER</th>';


   for (teacher of tTeacher) {
      buff += '<tr onclick=popupReservation("'+teacher.h_id+'")>';
      buff += '<td>' + teacher.t_name + '</td>';
   }
   buff += '</table>';

   document.getElementById("teacher").innerHTML = buff; 
}

function showPrice(pPrices) {
    /* css 수정 필요 (w3파일 없음) 만들어야함*/ 
   var buff = '<table class="w3-table w3-bordered w3-striped w3-border test w3-hoverable">';
   buff += '<tr class="w3-black">';
   buff += '<th>PERM</th>';
   buff += '<th>EXTENSION</th>';
   buff += '<th>CARE</th></tr>';
   buff += '<tr>';
   buff += '<td>' + pPrices.perm + '</td>';
   buff += '<td>' + pPrices.extension + '</td>';
   buff += '<td>' + pPrices.care+'</td></tr>';
   buff += '</table>';

   document.getElementById("price").innerHTML = buff; 
}

function popupReservation(t_id){
  teacher.t_id = t_id;
  document.getElementById('reservation').style.display='block';
}

function hideReservation(){
  document.getElementById('reservation').style.display='none';
}

function styleChanged() {
  var e = document.getElementById("style");
  rStyle = e.options[e.selectedIndex].value;
}
function timeChanged() {
  var e = document.getElementById("time");
  rTime = e.options[e.selectedIndex].value;
}

function makeReservation() {
  rDate = document.getElementById("date").value;
  var year = rDate.substr(0,4);
  var month = rDate.substr(5,2);
  var day = rDate.substr(8,2);

  console.log(year);
  console.log(month);
  console.log(day);

  var json = new Object();
  json.c_id = cCustomer.c_id;
  json.h_id = teacher.t_id;
  json.r_style = rStyle;
  json.r_date = year + month + day;
  json.r_time = rTime

  checktime = parseInt(json.r_time);

  if(checktime>=900 && checktime<=2200){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        if(json.result == 0) {
          alert("Reservation Complete!")
          refresh();
        }
        else {
          alert("Service Error\n" + json.error);
        }
      }
      else if (this.readyState == 4 && this.status != 200){
        alert("Connection Error\n" + this.responseText);
      }
    };
    http.open("POST", URL_C_RESERVATION, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(json));
  }
  else {
    alert("Shops Open From 09:00 To 22:00");
  }
}

function refresh() {
  var body = new Object();
  body.c_id = cCustomer.c_id;
  body.c_pw = cCustomer.c_pw;

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Refresh Success!!");
        sessionStorage.setItem("customer", JSON.stringify(json.customer));
        sessionStorage.setItem("nearShops", JSON.stringify(json.nearShops));
        sessionStorage.setItem("myReservations", JSON.stringify(json.myReservations));
        location.assign(LOC_C_HOME);
      }
      else {
        sessionStorage.removeItem("customer");
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("POST", URL_LOGIN, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(body));
}