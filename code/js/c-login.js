const LOC_C_HOME = "c-home.html";
const URL_LOGIN = "php/c_login.php";
const SUCCESS = 0;

function setItems() {
  var item = localStorage.getItem("remember");
  if(item != null) {
    var remember = JSON.parse(item);
    document.getElementById("c_id").value = remember.c_id;
    document.getElementById("c_pw").value = remember.c_pw;
    document.getElementById("remember").checked = true;
  }
  else {
   document.getElementById("remember").checked = false;    
  }
}

function login() {
  var body = new Object();
  body.c_id = document.getElementById("c_id").value;
  body.c_pw = document.getElementById("c_pw").value;

  if (document.getElementById("remember").checked) {
    console.log("set Remember!!");
    localStorage.setItem("remember", JSON.stringify(body));
  }
  else {
    localStorage.removeItem("remember");
  }

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Log In Success!!");
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