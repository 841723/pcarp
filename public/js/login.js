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

links.forEach(link => {
link.addEventListener("click", e => {
  e.preventDefault(); //preventing form submit
    forms.classList.toggle("show-signup");
  })
})

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.parentElement.parentElement.parentElement.classList.contains("login")) {
      
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
              window.location.href = "user.html";
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
    else if (button.parentElement.parentElement.parentElement.classList.contains("signup")) {
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