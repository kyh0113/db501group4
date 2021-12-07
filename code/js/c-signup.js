const LOC_NEXT = "c-login.html";
const URL_SIGNUP = "php/c_signup.php";
const URL_USER_CHECK_ID = "php/c_checkid.php";
const SUCCESS = 0;

function setItems(){
}

function checkId() {
  var json = new Object();
  json.c_id = document.getElementById("c_id").value;
  if(json.c_id == ""){
    alert("Enter ID");
    return;
  }

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
     if(json.result == SUCCESS) {
        document.getElementById("checker").innerHTML = "Checked!";
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("POST", URL_USER_CHECK_ID, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(json));
}

function signup() {
  if(document.getElementById("checker").innerHTML != "Checked!"){
    alert("Check your ID first!");
    return;
  }
  var json = new Object();
  json.c_name = document.getElementById("c_name").value;
  json.c_id = document.getElementById("c_id").value;
  json.c_pw = document.getElementById("c_pw").value;
  json.c_birth = document.getElementById("c_birth").value;
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
        console.log("success");
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
  http.open("POST", URL_SIGNUP, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(json));
}

function checkedValue(name) {
  var element = document.getElementsByName(name);
  for(i = 0; i < element.length; i++) {
    if(element[i].checked) {
      return element[i].value;
    }
  }
  return "";
}
