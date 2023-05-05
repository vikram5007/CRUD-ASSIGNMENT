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
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')">Edit</button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')">Del</button></td>';
        trHTML +="<td>" + object["EmailID"] + "</td>";
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
        '<input id="cnum" class="swal2-input" placeholder="ContactNo">'+
        '<input id="email" class="swal2-input" placeholder="EmailID" type="email">',
      preConfirm: () => {
        userCreate();
      },
    });
  }


  function userCreate() {
    const name = document.getElementById("name").value;
    const spec= document.getElementById("spec").value;
    const exp = document.getElementById("exp").value;
    const num = document.getElementById("cnum").value;
    const email = document.getElementById("email").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/doctors/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        DoctorName: name,
        Specialization:spec,
        Experience: exp,
        ContactNo:num,
        EmailID: email,
        Photo: "https://www.melivecode.com/users/1.png",
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }
