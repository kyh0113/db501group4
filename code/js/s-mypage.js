const LOC_S_HOME = "s-home.html";
const URL_LOGIN = "php/s_login.php";
const URL_PROFILE = "php/s_profile.php";
const SUCCESS = 0;

var Shop;
var Price;
var Teacher1;
var Teacher2;
var t_id_1;
var t_id_2;

function setItems(){
  showPrice();
  showProfile(); 
  showTeacher1();
  showTeacher2();
}

function showProfile(){
  var item = sessionStorage.getItem("shop");
  if(item != null) {
    Shop = JSON.parse(item);
    document.getElementById("s_name").value = Shop.s_name;
    document.getElementById("s_id").value = Shop.s_id;
    document.getElementById("s_password").value = Shop.s_pw;
    document.getElementById("s_phonenumber").value = Shop.s_phonenumber;
    document.getElementById("s_address_si").value = Shop.s_address_si;
    document.getElementById("s_address_gu").value = Shop.s_address_gu;
    document.getElementById("s_address_detail").value = Shop.s_address_detail;
  }
}

function showPrice(){
  var item = sessionStorage.getItem("price");
  if(item != null) {
    Price = JSON.parse(item);
    document.getElementById("perm").value = Price.perm;
    document.getElementById("extension").value = Price.extension;
    document.getElementById("care").value = Price.care;
  }
}

function showTeacher1(){
  var item = sessionStorage.getItem("Teacher1");
  if(item != null) {
    Teacher1 = JSON.parse(item);
    t_id_1 = Teacher1.t_id;
    document.getElementById("t_name_1").value = Teacher1.t_name;
  }
}

function showTeacher2(){
  var item = sessionStorage.getItem("Teacher2");
  if(item != null) {
    Teacher2 = JSON.parse(item);
    t_id_2 = Teacher2.t_id;
    document.getElementById("t_name_2").value = Teacher2.t_name;

  }
}


function updateProfile() {
  var json = new Object();
  json.s_name = document.getElementById("s_name").value;
  json.s_id = document.getElementById("s_id").value;
  json.s_pw = document.getElementById("s_pw").value;
  json.s_shopnumber = document.getElementById("s_shopnumber").value;
  json.s_address_si = document.getElementById("s_address_si").value;
  json.s_address_gu = document.getElementById("s_address_gu").value;
  json.s_address_detail = document.getElementById("s_address_detail").value;
  json.t_id_1 = t_id_1;
  json.t_name_1 = document.getElementById("t_name_1").value;
  json.t_id_2 = t_id_2;
  json.t_name_2 = document.getElementById("t_name_2").value;
  json.perm = document.getElementById("perm").value;
  json.extension = document.getElementById("extension").value;
  json.care = document.getElementById("care").value;

  var s_repeatpw = document.getElementById("s_repeatpw").value;
  if(s_repeatpw != json.s_pw) {
    alert("Please Repeat Your Password");
    return;
  }

  if (json.s_pw.length < 4 ){
    alert("Please Enter At Least 4 Characters");
    return;
  }

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == 0) {
        sessionStorage.setItem("shop", JSON.stringify(json.body));
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
  body.s_id = Shop.s_id;
  body.s_pw = Shop.s_pw;

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Log In Success!!");
        sessionStorage.setItem("shop", JSON.stringify(json.shop));
        sessionStorage.setItem("Teacher1", JSON.stringify(json.Teacher1));
        sessionStorage.setItem("Teacher2", JSON.stringify(json.Teacher2));
        sessionStorage.setItem("price", JSON.stringify(json.price));
        sessionStorage.setItem("Reservations", JSON.stringify(json.Reservations));
        location.assign(LOC_S_HOME);
      }
      else {
        sessionStorage.removeItem("shop");
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


