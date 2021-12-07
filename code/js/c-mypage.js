const LOC_C_HOME = "c-home.html";
const URL_LOGIN = "php/c_login.php";
const URL_PROFILE = "php/c_profile.php";
const SUCCESS = 0;

var Customer;

function setItems(){
  var item = sessionStorage.getItem("customer");
  if(item != null) {
    Customer = JSON.parse(item);
    document.getElementById("c_name").value = Customer.c_name;
    document.getElementById("c_id").value = Customer.c_id;
    document.getElementById("c_pw").value = Customer.c_pw;
    document.getElementById("c_birth").value = Customer.c_birth;
    document.getElementById("c_phonenumber").value = Customer.c_phonenumber;
    document.getElementById("c_address_si").value = Customer.c_address_si;
    document.getElementById("c_address_gu").value = Customer.c_address_gu;


  }
  else {
    location.assign(LOC_LOGIN);
  }
}

function profile() {
  var json = new Object();
  json.c_name = document.getElementById("c_name").value;
  json.c_id = document.getElementById("c_id").value;
  json.c_pw = document.getElementById("c_pw").value;
  json.c_phonenumber = document.getElementById("c_phonenumber").value;
  json.c_address_si = document.getElementById("c_address_si").value;
  json.c_address_gu = document.getElementById("c_address_gu").value;

  var c_repeatpw = document.getElementById("c_repeatpw").value;
  if(c_repeatpw != json.c_pw) {
    alert("Please Repeat Your Password");
    return;
  }

  if (json.c_pw.length < 4 ){
    alert("Please Enter At Least 4 Characters");
    return;
  }

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == 0) {
        sessionStorage.setItem("customer", JSON.stringify(json.body));
        alert("Update Profile SUCCESS!");
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
  http.open("POST", URL_PROFILE, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(json));
}

function refresh() {
  var body = new Object();
  body.c_id = Customer.c_id;
  body.c_pw = Customer.c_pw;

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


