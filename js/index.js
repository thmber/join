let newUser;
let activeUser = [];
let users = [];
let userExists = false;
let rememberedID;
let mailTaken = false;
const urlParams = new URLSearchParams(window.location.search);
const msg = +urlParams.get('msg');
loadRememberedUser();


async function signUp(){
    let newName = document.getElementById('signup-name').value;
    let newNamesplitted = newName.split(' ');
    let newFirstname = newNamesplitted[0].toUpperCase().charAt(0) + newNamesplitted[0].substring(1);
    let newLastname = newNamesplitted[1].toUpperCase().charAt(0) + newNamesplitted[1].substring(1);  
    let newMail = document.getElementById('signup-email').value;
    checkIfMailIsAlreadyUsed(newMail);
    if (mailTaken == true) {
        showMailTakenWarning();
        return;
    }
    let newPassword = document.getElementById('signup-password').value;
    newUser = {'firstname': newFirstname, 
                'lastname': newLastname, 
                'email': newMail, 
                'password': newPassword,
                'id': users.length};
    activeUser = newUser;
    users.push(newUser)
    await saveUser(newUser);
    window.location.href = 'summary.html';
}


function checkIfMailIsAlreadyUsed(email){
    let found = users.find(u => u.email == email);
    if (found) {
        mailTaken = true;
    }
}


function showMailTakenWarning(){
    let messageBox = document.getElementById('error-message-login');
    messageBox.style.display = "flex";
    messageBox.innerHTML = `email is already taken`;
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 1000);
}

function resetPassword(){
    let newPass = document.getElementById('new-password').value;
    let newPassConfirmed = document.getElementById('new-password-confirmed').value;
    let user = users[`${msg}`]
    if (newPass == newPassConfirmed) {
        user['password'] = newPass;
        saveNewPassword();
       
    }
}


async function saveNewPassword(){
    await backend.setItem('users', JSON.stringify(users));
    let messageBox = document.getElementById('you-reset');
    messageBox.style.display = "flex"
   setTimeout(() => {
     messageBox.style.display = "none";
     window.location.href = "index.html";
   }, 1000);

}


function sendMailForgotPassword(){
    let userMail = document.getElementById('mail-user-forgot').value;
    let user = users.find(u => u.email == userMail);
    let id = user['id'];
    window.location.href = `./success_mail.html?msg=${id}`
    
}



async function deleteUsers(){
    users = [];
    await backend.setItem('users', JSON.stringify(users));
}



function loadRememberedUser(){
    let rememberedUserID = localStorage.getItem('rememberedUserID');
    if (rememberedUserID) {
        rememberedID = JSON.parse(rememberedUserID);
    }
}


async function fillLoginForm(){
    await init();
    if (rememberedID == undefined) {
        return;
    }
    else{
    document.getElementById('login-input-email').value = `${users[rememberedID]['email']}`;
    document.getElementById('login-input-password').value = `${users[rememberedID]['password']}`;
    document.getElementById('remember').checked = `true`;
    }
}


function saveUserIDToLocalStorage(userID){
    let userIDasText = JSON.stringify(userID);
    localStorage.setItem('rememberedUserID', userIDasText);
    
}


function login(){
    checkIfUserExists();
    if (userExists == true) {
        saveUserIDToLocalStorage(activeUser.id)
        setActiveUser(activeUser);
    }
    else{
        document.getElementById('error-message-login').style.display = "block";
        setTimeout(() => {
            document.getElementById('error-message-login').style.display = "none";
        }, 1000);
    }
}


function rememberMe(){
    let checkInput = document.getElementById('remember');
    if (checkInput.checked == false) {
        localStorage.clear();
        document.getElementById('login-input-email').value = ``;
        document.getElementById('login-input-password').value = ``;
    } 
}


function checkIfUserExists(){
    userExists = false;
    passWordCorrect = false;
    let inputMail = document.getElementById('login-input-email').value;
    let inputPassword = document.getElementById('login-input-password').value
    for (let i = 0; i < users.length; i++) {
        let email = users[i]['email'];
        let password = users[i]['password']
        if (inputMail == email  && inputPassword == password) {
            userExists = true;
            activeUser = users[i];
        }
    }   
}


function guestLogin(){
    let guest = {'firstname': 'Guest', 
    'lastname': '', 
    'email': 'guest-login@join.com', 
    'password': 12345, 
    'remember': false};
    let inputmail = document.getElementById('login-input-email');
    inputmail.value = guest['firstname'];
    let inputpass = document.getElementById('login-input-password');
    inputpass.value = guest['password']
    setTimeout(() => {
        setActiveUser(guest);
    }, 300);
}


async function setActiveUser(user){
    activeUser = user;
    await backend.setItem('activeUser', JSON.stringify(activeUser));
    window.location.href = 'summary.html'

}

async function saveUser(){
    await backend.setItem('activeUser', JSON.stringify(activeUser));
    await backend.setItem('users', JSON.stringify(users));
}


function showSignUp(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
        <span onclick="showLogin()" class="arrow-left">&#10132;</span>
        <span class="login-headline" id="login-headline">Sign Up</span>
        <div class="underline-login" id="login-underline">
        </div>
        <form onsubmit="signUp(); return false;" class="login-form" id="signup-form">
             <div class="login-box">
                <input type="text" required placeholder="Name" id="signup-name">
                <img src="assets/img/icon_person.png" alt="">
            </div>
            <div class="login-box">
                <input type="email" required minlength="5" placeholder="Email" id="signup-email">
                <img src="assets/img/icon-email.svg" alt="">
            </div>
            <div class="error-message-login" id="error-message-login">
            </div>
            <div class="login-box">
                <input required minlength="5" type="password" placeholder="Password" id="signup-password">
                <img src="assets/img/icon-password.svg" alt="">
            </div>
            <div class="login-and-guest">
                <input type="submit" value="Sign up" class="signup-save">
            </div>
        </form>
    `;
}


function showForgotPassword(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
        <span onclick="showLogin()" class="arrow-left">&#10132;</span>
        <span class="login-headline-password" id="login-headline">I forgot my password</span>
        <div class="underline-login" id="login-underline">
        </div>
        <div class="worry-not">
                 <span>Don't worry! 
                    We will send you an email with the instructions to reset your password.</span>
            </div>
        <div class="login-form">
            <div class="login-box">
                <input type="email" required minlength="5" placeholder="Email" id="mail-user-forgot">
                <img src="assets/img/icon-email.svg" alt="">
            </div>
            <div class="login-and-guest">
                <button onclick="sendMailForgotPassword()" class="login" id="forgotten-mail-button">Send me the email</button>
            </div>
        </div>
    `;
}


function showLogin(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
                <div class="sign-box" id="sign-box">
                <span class="login-headline" id="login-headline">Log In</span>
                <div class="underline-login" id="login-underline">
                </div>
                <form onsubmit="login(); return false;" class="login-form">
                    <div class="login-box">
                        <input type="email" required minlength="5" placeholder="Email" id="login-input-email">
                        <img src="assets/img/icon-email.svg" alt="">
                    </div>
                    <div class="error-message-login" id="error-message-login">
                        email or password is incorrect
                    </div>
                    <div class="login-box">
                        <input type="password" required minlength="5" placeholder="Password" id="login-input-password">
                        <img src="assets/img/icon-password.svg" alt="">
                    </div>
                    <div class="remember-forgot-box">
                        <div class="remember-check">
                            <input type="checkbox" id="remember">
                            <label for="remember">Remember Me</label>
                        </div>
                        <a onclick="showForgotPassword()">Forgot my password</a>
                    </div>
                    <div class="login-and-guest">
                        <input type="submit" value="Log in" class="input-submit">
                        <div class="guest-login" onclick="guestLogin()">Guest Log in</div>
                    </div>
                </form>
            </div>
            <div class="forgot-container d-none" id="forgot-container">   
            </div>
    `;
}