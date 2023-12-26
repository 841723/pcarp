const forms = document.querySelector(".forms"),
pwShowHide = document.querySelectorAll(".eye-icon"),
links = document.querySelectorAll(".link");
buttons = document.querySelectorAll(".button-field");

pwShowHide.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    
    pwFields.forEach(password => {
        if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
        }
        password.type = "password";
        eyeIcon.classList.replace("bx-show", "bx-hide");
    })
  })
})      

function mostrarSignup() {
  var login = document.getElementById("login");
  var signup = document.getElementById("signup");
  var forgot = document.getElementById("forgot-password");
  login.style.display = "none";
  signup.style.display = "block";
  forgot.style.display = "none";
}

function mostrarLogin() {
  var login = document.getElementById("login");
  var signup = document.getElementById("signup");
  var forgot = document.getElementById("forgot-password");
  login.style.display = "block";
  signup.style.display = "none";
  forgot.style.display = "none";
}
 
function mostrarForgot() {
  var login = document.getElementById("login");
  var signup = document.getElementById("signup");
  var forgot = document.getElementById("forgot-password");
  login.style.display = "none";
  signup.style.display = "none";
  forgot.style.display = "block";
}

async function logUser(){
  event.preventDefault();
  const email = document.querySelector(".login .input[type='email']").value;
  const stringCodificado = encodeURIComponent(email);
  const url = `/user_mail?data=${stringCodificado}`;
  const passElement = document.getElementById('pass-login')
  contra = passElement.value
  if (contra == "") {
    alert("no se ha introducido ninguna contrasena");
    return;
  }
  
  await fetch(url)
  .then(response => response.json())
  .then(data => {
      if (data!=null) {
        console.log(data);
        if (contra == data.contrasena) {
          sessionStorage.setItem('userToken', true);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('id', data.id_usuario);
          alert("contrasena correcta");
          if (data.es_admin == true) {
            window.location.href = "/admin/admin.html";
          }
          else{
            window.location.href = "/";
          }
        }
        else { 
          alert("la contrasena es incorrecta");
        }
      }
      else {
        alert("usuario no encontrado");
      }
  })
  .catch(error => console.error('Error:', error));    
}

function signupUser() {
  event.preventDefault();
  const passElement = document.getElementById('pass-signup').value
  const passElement2 = document.getElementById('pass-signup-2').value
  const email = document.querySelector(".signup .input[type='email']").value;

  if (ExistsUserMail(email) == true) {
    alert("ya existe un usuario con ese email");
  } 
  else {
    if (passElement == "" || passElement2 == "" || email == "") {
      alert("no se ha introducido algun campo");
    }
    else if (passElement != passElement2) {
      alert("no coinciden las contraseñas");
    }
     else {
      const mailCodificado = encodeURIComponent(email);
      const passCodificado = encodeURIComponent(passElement);
      const url = `/create_user_by_mail?mail=${mailCodificado}&pass=${passCodificado}`;
      fetch(url)
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('userToken', true);
      const url2 = `/user_mail?data=${mailCodificado}`;
      fetch(url2)
      .then(response => response.json())
      .then(data => {
        if (data!=null) {
          sessionStorage.setItem('id', data.id_usuario);
        }
      })
      alert("usuario creado correctamente")
      window.location.href = "/";
    }
  }
}

function updatePass() {
  event.preventDefault();
  const passElement = document.getElementById('pass-forgot').value
  const passElement2 = document.getElementById('pass-forgot-2').value
  const email = document.getElementById('mail-forgot').value;
  if (ExistsUserMail(email)) {
    console.log("existe un usuario con ese email");
    if (passElement == "" || passElement2 == "" || email == "") {
      console.log("passElement: "+passElement);
      console.log("passElement2: "+passElement2);
      alert("no se ha introducido algun campo");
    }
    else if (passElement != passElement2) {
      alert("no coinciden las contraseñas");
    }
     else {
      const mailCodificado = encodeURIComponent(email);
      const passCodificado = encodeURIComponent(passElement);
      const url = `/update_pass_by_mail?mail=${mailCodificado}&pass=${passCodificado}`;
      fetch(url)
      alert("usuario actualizado correctamente")
    }
  }  else{
    console.log("no existe un usuario con ese email");
    alert("no existe un usuario con ese email");
  }
}

async function ExistsUserMail(email) {
  const stringCodificado = encodeURIComponent(email);
  const url = `/user_mail?data=${stringCodificado}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {

      if (data!=null) {
        return true;
      }
      else if (data==null){
        return false;
      }
  })
  .catch(error => console.error('Error:', error));    
}


mostrarLogin();
