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

// links.forEach(link => {
// link.addEventListener("click", e => {
//   e.preventDefault(); //preventing form submit
//     forms.classList.toggle("show-signup");
//   })
// })

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


buttons.forEach(button => {
  button.addEventListener("submit", () => {
    if (button.parentElement.parentElement.parentElement.parentElement.classList.contains("form login")) {
      
      const email = document.querySelector(".login .input[type='email']").value;
      const stringCodificado = encodeURIComponent(email);
      const url = `/user_mail?data=${stringCodificado}`;
      const passElement = document.getElementById('pass-login')
      contra = passElement.value
      if (contra == "") {
        alert("no se ha introducido ninguna contrasena");
        return;
      }
      
      fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data!=null) {
            if (contra == data.contrasena) {
              alert("contrasena correcta");
              sessionStorage.setItem('userToken', true);
              window.location.href = "/";
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
    else if (button.parentElement.parentElement.parentElement.parentElement.classList.contains("signup")) {
      const passElement = document.getElementById('pass-signup').value
      const passElement2 = document.getElementById('pass-signup-2').value
      const email = document.querySelector(".signup .input[type='email']").value;

      if (ExistsUserMail(email)) {
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
          alert("usuario creado correctamente")

        }
      }
    }
  })
})

function logUser(){
  const email = document.querySelector(".login .input[type='email']").value;
  const stringCodificado = encodeURIComponent(email);
  const url = `/user_mail?data=${stringCodificado}`;
  const passElement = document.getElementById('pass-login')
  contra = passElement.value
  if (contra == "") {
    alert("no se ha introducido ninguna contrasena");
    return;
  }
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
      if (data!=null) {
        if (contra == data.contrasena) {
          alert("contrasena correcta");
          sessionStorage.setItem('userToken', true);
          window.location.href = "/";
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

function ExistsUserMail(email) {
  const stringCodificado = encodeURIComponent(email);
  const url = `/user_mail?data=${stringCodificado}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
      if (data!=null) {
        return true;
      }
      else {
        return false;
      }
  })
  .catch(error => console.error('Error:', error));    
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login form');
  const signupForm = document.querySelector('.signup form');

  loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('pass-login').value;

      // Aquí debes realizar una consulta a tu base de datos para verificar el usuario y la contraseña
      // Si la consulta es exitosa, puedes generar un token y almacenarlo en una variable global

      // EJEMPLO: Supongamos que la consulta fue exitosa
      const userToken = generateToken(); // Implementa tu función para generar un token
      console.log('Login successful. Token:', userToken);
  });

  signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const signupEmail = document.getElementById('signup-email').value;
      const signupPassword = document.getElementById('pass-signup').value;
      const signupPassword2 = document.getElementById('pass-signup-2').value;

      // Verificar que las contraseñas coincidan
      if (signupPassword !== signupPassword2) {
          alert('Las contraseñas no coinciden');
          return;
      }

      // Aquí debes realizar una operación de inserción en tu base de datos con los datos del usuario
      // EJEMPLO: Supongamos que la inserción fue exitosa
      sessionStorage.setItem('userToken', userToken);
      console.log('Registro exitoso');
  });

});


/* <div class="form login">
<div class="form-content">
    <header>Login</header>
    <form action="#">
        <div class="field input-field">
            <input type="email" placeholder="Email" class="input">
        </div>

        <div class="field input-field">
            <input type="password" placeholder="Password" class="password">
            <i class='bx bx-hide eye-icon'></i>
        </div>

        <div class="form-link">
            <a href="#" class="forgot-pass">Forgot password?</a>
        </div>

        <div class="field button-field">
            <button>Login</button>
        </div>
    </form>
   

    <div class="form-link">
        <span>Don't have an account? <a href="#" class="link signup-link">Signup</a></span>
    </div>
</div>


</div> */

mostrarLogin();
