const LOC_LOGIN = "s-login.html";
const URL_S_HOME = "php/s_home.php";

const SUCCESS = 0;

var Shop;
var todayReservations = new Array();

function setItems() {
  showShop();
  showTodayReservations();

}

function getShop() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Get Salon Home Success!!");
        Shop = json.body;
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_S_HOME + "?s_id=" + Shop.s_id, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function showShop() {
  var item = sessionStorage.getItem("shop");
  if(item != null) {
    Shop = JSON.parse(item);
    document.getElementById("shop_name").innerHTML = "<h2><b>" + Shop.s_name + "'s HOME</b></h2>";
  }
  else {
    location.assign(LOC_LOGIN);
  }  
}

function showTodayReservations() {
  var item = sessionStorage.getItem("todayReservations");
  if(item != null) {
    todayReservations = JSON.parse(item);
    getTodayReservation();
  }
  else {
    location.assign(LOC_LOGIN);
  }
}


function getTodayReservation() {

   var buff = '<table class="w3-table w3-bordered w3-striped w3-border test w3-hoverable">';
   buff += '<tr class="w3-black">';
   buff += '<th>CUSTOMER</th>';
   buff += '<th>STYLE</th>';
   buff += '<th>DATE</th>';
   buff += '<th>TIME</th></tr>';

   for (todayreservations of todayReservations) {
      buff += '<tr>';
      buff += '<td>' + todayreservations.c_id + '</td>';
      buff += '<td>' + todayreservations.r_style + '</td>';
      buff += '<td>' + todayreservations.r_date + '</td>';
      buff += '<td>' + todayreservations.r_time + '</td>';
      buff += '</tr>';
   }
   buff += '</table>';

   document.getElementById("s_today_reservation").innerHTML = buff; 
}


/*
function showTodayReservations() {
  var buff = '';
  var item = sessionStorage.getItem("tmrwReservations");
  var buff = '<table class="w3-table w3-bordered w3-striped w3-border test w3-hoverable">';
  buff += '<tr class="w3-black">';
  buff += '<th>CUSTOMER</th>';
  buff += '<th>STYLE</th>';
  buff += '<th>DATE</th>>';
  buff += '<th>TIME</th>> </tr>';
  for(tmrwreservations of tmrwReservations) {
    buff += '<tr>';
    buff += '<td>' + tmrwreservations.c_id + '</td>';
    buff += '<td>' + tmrwreservations.r_style + '</td>';
    buff += '<td>' + tmrwreservations.r_date + '</td>';
    buff += '<td>' + tmrwreservations.r_time + '</td></tr>';
  }
  buff += '</table>'
  document.getElementById("s_tmrw_reservation").innerHTML =  buff;
}
*/