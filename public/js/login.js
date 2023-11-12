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
      console.log(url);
      fetch(url)
      var contra = document.getElementById('pass-login').value
      
      .then(response => response.json())
      .then(data => {
          console.log(data);  
          if (data!=null) {
                      
            const pw = document.querySelector(".login .password[type='password']");
            console.log(pw);
            console.log(pw.value);
            // if (data.contrasena == pw.value) {
            if (contra == pw.value) {
              console.log("contraseña correcta");
              window.location.href = "user.html";
            }
            else { 
              console.log("contraseña incorrecta");
            }
          }
          else {
            console.log("usuario no encontrado");
          }
      })
      .catch(error => console.error('Error:', error));    
    }
  })
})


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