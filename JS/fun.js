function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/doctors");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML +=
          '<td><img width="50px" src="' +
          object["Photo"] +
          '" class="avatar"></td>';
        trHTML += "<td>" + object["DoctorName"] + "</td>";
        trHTML += "<td>" + object["Specialization"] + "</td>";
        trHTML += "<td>" + object["Experience"] + "</td>";
        trHTML += "<td>" + object["ContactNo"] + "</td>"
        trHTML += "<td>" + object["EmailID"] + "</td>";

        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
          object["id"] +
          ')">Edit</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function createpop() {
  //https://sweetalert2.github.io/v9.html
  Swal.fire({
    title: "Create user",
    showCancelButton: true,
    html:
      '<input id="id" type="hidden">' +
      '<input id="name" class="swal2-input" placeholder="First">' +
      '<input id="spec" class="swal2-input" placeholder="specilization">' +
      '<input id="exp" class="swal2-input" placeholder="Experience">' +
      '<input id="cnum" class="swal2-input" placeholder="ContactNo">' +
      '<input id="email" class="swal2-input" placeholder="EmailID" type="email">'+
      '<input  id="image" type="file" class="swal2-input">',
    preConfirm: () => {
      userCreate();
    },
  });
}


function userCreate() {
  const name = document.getElementById("name").value.toUpperCase();
  const spec = document.getElementById("spec").value.toUpperCase();
  const exp = document.getElementById("exp").value;
  const num = document.getElementById("cnum").value;
  const email = document.getElementById("email").value;
  const imageInput = document.getElementById("image");
  const filename = "ASSETS/IMAGES/" + imageInput.files[0].name;
  

  if (create_validate() == true) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/doctors/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        DoctorName: name,
        Specialization: spec,
        Experience: exp,
        ContactNo: num,
        EmailID: email,
        Photo:filename
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        var message = "DATA ADDED SUCCESSFULLY ";
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }
}


function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/doctors/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      //const user = objects["objects"];
      console.log(objects);
      Swal.fire({
        title: "Edit User",
        showCancelButton: true,
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="name" class="swal2-input" placeholder="name" value="' +
          objects["DoctorName"] +
          '">' +
          '<input id="spec" class="swal2-input" placeholder="Specilization" value="' +
          objects["Specialization"] +
          '">' +
          '<input id="exp" class="swal2-input" placeholder="Experience" value="' +
          objects["Experience"] +
          '">' +
          '<input id="cnum" class="swal2-input" placeholder="Contact number" value="' +
          objects["ContactNo"] + '">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="' +
          objects["EmailID"] + '">' +
          '<input  id="image" type="file" class="swal2-input">',
        preConfirm: () => {
          userEdit(id);
        },
      });
    }
  };
}

function userEdit(id) {
  //const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const spec = document.getElementById("spec").value;
  const exp = document.getElementById("exp").value;
  const num = document.getElementById("cnum").value;
  const email = document.getElementById("email").value;
  const imageInput = document.getElementById("image");
  const filename = "ASSETS/IMAGES/" + imageInput.files[0].name;

  var message = "change successful";
  console.log(id);
  console.log(name);
  if(edit_validate()==true){
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/doctors/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      // id: id,
      DoctorName: name.toUpperCase(),
      Specialization: spec,
      Experience: exp,
      ContactNo: num,
      EmailID: email,
      Photo:filename
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        message.toUpperCase());

      loadTable();
    }
  };
}
}


function userDelete(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:3000/doctors/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'Delete!',
    icon: "warning",



  }).then((result) => {
    if (result.value) {
      xhttp.send(
        JSON.stringify({
          id: id,
        })
      );
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          swal.fire({
            title: "Deleted Successfully",
            icon: "success",
            showConfirmButton:true,
            confirmButtonText: "OK",
            showCloseButton: true,
            focusConfirm: false,
          })
          loadTable();
        }
      };
    }
  });
}

function create_validate() {
  const name = document.getElementById("name").value;
  const spec = document.getElementById("spec").value;
  const exp = document.getElementById("exp").value;
  const num = document.getElementById("cnum").value;
  const email = document.getElementById("email").value;
  //regular expression
  const numreg = /^[0-9]{10}$/;
  const mailreg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;


  if (name == "" || spec == "" || exp == "" || num == "" || email == "") {
    Swal.fire({
      title: "Fields should not be empty",
      showConfirmButton: true,
      icon: "error"
    })
    return false;
  }

  if (!num.match(numreg)) {

    Swal.fire({
      title: "Invalid Input",
      text: "Contact Number should contain 10 digits",
      icon: "error",
      showConfirmButton: true,

    })
    return false;

  }
  if (!email.match(mailreg)) {
    Swal.fire({
      title: "Invalid Input",
      text: "Enter a valid email",
      icon: "error",
      showConfirmButton: true,

    })
    return false;

  }
  if (num.match(numreg) && email.match(mailreg)) {
    Swal.fire({
      title: "Successfully Created",
      icon: "success",
      showConfirmButton: true
    })
    return true;
  }
}


function edit_validate(){
  const name = document.getElementById("name").value;
  const spec = document.getElementById("spec").value;
  const exp = document.getElementById("exp").value;
  const num = document.getElementById("cnum").value;
  const email = document.getElementById("email").value;
  //regular expression
  const numreg = /^[0-9]{10}$/;
  const mailreg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;


  if (name == "" || spec == "" || exp == "" || num == "" || email == "") {
    Swal.fire({
      title: "Fields should not be empty",
      showConfirmButton: true,
      icon: "error"
    })
    return false;
  }

  if (!num.match(numreg)) {

    Swal.fire({
      title: "Invalid Input",
      text: "Contact Number should contain 10 digits",
      icon: "error",
      showConfirmButton: true,

    })
    return false;

  }
  if (!email.match(mailreg)) {
    Swal.fire({
      title: "Invalid Input",
      text: "Enter a valid email",
      icon: "error",
      showConfirmButton: true,

    })
    return false;

  }
  if (num.match(numreg) && email.match(mailreg)) {
    Swal.fire({
      title: "Successfully Created",
      icon: "success",
      showConfirmButton: true
    })
    return true;
  }
}



