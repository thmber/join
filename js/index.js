let users = [{'firstname': 'Anna', 
                'lastname': 'Haland', 
                'email': 'haland@web.de', 
                'password': 'Mobi19', 
                'remember': false}, 
                {'firstname': 'Kim', 
                'lastname': 'Sonnemann', 
                'email': 'kimsonne@gmx.de', 
                'password': 'sonnenschein00', 
                'remember': true}];
let newUser;


function signUp(){
    let newName = document.getElementById('signup-name').value;
    let newNamesplitted = newName.split(' ');
    let newFirstname = newNamesplitted[0];
    let newLastname = newNamesplitted[1];
    let newMail = document.getElementById('signup-email').value;
    let newPassword = document.getElementById('signup-password').value;
    newUser = {'firstname': newFirstname, 
                'lastname': newLastname, 
                'email': newMail, 
                'password': newPassword};
    saveUser();
}


function login(){


}


function saveUser(){
    users.push(newUser);
}


function showSignUp(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
        <span onclick="showLogin()" class="arrow-left">&larr;</span>
        <span class="login-headline" id="login-headline">Sign Up</span>
        <div class="underline-login" id="login-underline">
        </div>
        <form onsubmit="signUp()" class="login-form" action="#" id="signup-form">
             <div class="login-box">
                <input type="text" required placeholder="Name" id="signup-name">
                <img src="assets/img/icon_person.png" alt="">
            </div>
            <div class="login-box">
                <input type="email" required minlength="5" placeholder="Email" id="signup-email">
                <img src="assets/img/icon-email.svg" alt="">
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
        <span onclick="showLogin()" class="arrow-left">&larr;</span>
        <span class="login-headline-password" id="login-headline">I forgot my password</span>
        <div class="underline-login" id="login-underline">
        </div>
        <div class="worry-not">
                 <span>Don't worry! 
                    We will send you an email with the instructions to reset your password.</span>
            </div>
        <form onsubmit="login()" class="login-form">
            <div class="login-box">
                <input type="email" required minlength="5" placeholder="Email">
                <img src="assets/img/icon-email.svg" alt="">
            </div>
            <div class="login-and-guest">
                <button class="login">Send me the email</button>
            </div>
        </form>
    `;
}


function showLogin(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
                <div class="sign-box" id="sign-box">
                <span class="login-headline" id="login-headline">Log In</span>
                <div class="underline-login" id="login-underline">
                </div>
                <form onsubmit="login()" class="login-form">
                    <div class="login-box">
                        <input type="email" required minlength="5" placeholder="Email">
                        <img src="assets/img/icon-email.svg" alt="">
                    </div>
                    <div class="login-box">
                        <input type="password" required minlength="5" placeholder="Password">
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
                        <a class="guest-login" href="summary.html">Guest Log in</a>
                    </div>
                </form>
            </div>
            <div class="forgot-container d-none" id="forgot-container">   
            </div>
    `;
}