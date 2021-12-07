const LOC_NEXT = "c-hairdresser.html";
const LOC_LOGIN = "c-login.html";
const LOC_C_HOME = "c-home.html";

const URL_LOGIN = "php/c_login.php";
const URL_C_HAIRDRESSER = "php/c_hairdresser.php";
const URL_C_RESERVATION_CANCEL = "php/c_reservation_cancel.php"
const SUCCESS = 0;

var cCustomer;
var cHome;
var nearSalons
var myReservations;

function setItems() {
  var item = sessionStorage.getItem("customer");
  if(item != null) {
    cCustomer = JSON.parse(item);
    document.getElementById("customer_name").innerHTML = "<h2><b>" + cCustomer.c_name + "'s HOME</b></h2>";
  }
  else {
    location.assign(LOC_LOGIN);
  }

  item = sessionStorage.getItem("nearSalons");
  if(item != null) {
    nearSalons = JSON.parse(item);
    showNearSalons();
  }
  else {
    location.assign(LOC_LOGIN);
  }
  item = sessionStorage.getItem("myReservations");
  if(item != null) {
    myReservations = JSON.parse(item);
    showMyReservation();
  }
  else {
    location.assign(LOC_LOGIN);
  }
}

function showNearSalons() {

   var buff = '<table class="w3-table w3-bordered w3-striped w3-border test w3-hoverable">';
   buff += '<tr class="w3-black">';
   buff += '<th>SALON</th>';
   buff += '<th>PHONENUMBER</th>';
   buff += '<th>ADDRESS</th></tr>';

   for (nearsalon of nearSalons) {
      buff += '<tr onclick=goToHairdresser("'+nearsalon.s_id+'")>';
      buff += '<td>' + nearsalon.s_name + '</td>';
      buff += '<td>' + nearsalon.s_phonenumber + '</td>';
      buff += '<td>' + nearsalon.s_address_si+ ' ' + nearsalon.s_address_gu + ' ' + nearsalon.s_address_detail+'</td></tr>';
   }
   buff += '</table>';

   document.getElementById("near_salons").innerHTML = buff; 
}

function showMyReservation() {

   var buff = '<table class="w3-table w3-bordered w3-striped w3-border test w3-hoverable">';
   buff += '<tr class="w3-black">';
   buff += '<th>SALON</th>';
   buff += '<th>LOCATION</th>';
   buff += '<th>HAIRDRESSER</th>';
   buff += '<th>DATE</th>';
   buff += '<th>TIME</th>';
   buff += '<th></th></tr>';

   for (myreservation of myReservations) {
      buff += '<tr>';
      buff += '<td>' + myreservation.s_name + '</td>';
      buff += '<td>' + myreservation.s_address_si + ' ' + myreservation.s_address_gu + ' ' + myreservation.s_address_detail + '</td>';
      buff += '<td>' + myreservation.h_name + '</td>';
      buff += '<td>' + myreservation.r_date + '</td>';
      buff += '<td>' + myreservation.r_time + '</td>';
      buff += '<td><button class="w3-button w3-grey" type="submit" onclick=confirmCancelReservation("'+myreservation.r_id+'")>CANCEL</button></td></tr>';
   }
   buff += '</table>';

   document.getElementById("c_reservations").innerHTML = buff; 
}

function goToHairdresser(s_id) {
  var body = new Object();
  body.s_id = s_id;

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == 0) {
        sessionStorage.setItem("hairdressers", JSON.stringify(json.hairdressers));
        sessionStorage.setItem("price", JSON.stringify(json.price));
        sessionStorage.setItem("salon", JSON.stringify(json.salon));
        location.assign(LOC_NEXT);
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("POST", URL_C_HAIRDRESSER, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(body));
}

function cancelReservation(r_id) {
  var body = new Object();
  body.r_id = r_id;

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == 0) {
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
  http.open("POST", URL_C_RESERVATION_CANCEL, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(body));
}

function confirmCancelReservation(r_id) {
  if (confirm('Are You Sure You Want To Cancel it?')) {
       cancelReservation(r_id);
  } else {
      
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
        sessionStorage.setItem("nearSalons", JSON.stringify(json.nearSalons));
        sessionStorage.setItem("myReservations", JSON.stringify(json.myReservations));
        setItems();
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