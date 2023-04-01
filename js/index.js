        
function showSignUp(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
        <span class="login-headline" id="login-headline">Sign Up</span>
        <div class="underline-login" id="login-underline">
        </div>
        <form onsubmit="login()" class="login-form">
             <div class="login-box">
                <input type="text" required minlength="5" placeholder="Name">
                <img src="assets/img/icon_person.png" alt="">
            </div>
            <div class="login-box">
                <input type="email" required minlength="5" placeholder="Email">
                <img src="assets/img/icon-email.svg" alt="">
            </div>
            <div class="login-box">
                <input type="password" required minlength="5" placeholder="Password">
                <img src="assets/img/icon-password.svg" alt="">
            </div>
            <div class="login-and-guest">
                <button class="login">Save</button>
            </div>
        </form>
    `;
}

function showForgotPassword(){
    let loginBox = document.getElementById('log-in-content');
    loginBox.innerHTML = `
        <span class="login-headline" id="login-headline">I forgot my password</span>
        <div class="underline-login" id="login-underline">
        </div>
        <div class="worry-not">
                 <span>Don't worry! 
                    We will send you and email with the instructions to reset your password.</span>
            </div>
        <form onsubmit="login()" class="login-form">
            <div class="login-box">
                <input type="email" required minlength="5" placeholder="Email">
                <img src="icon-email.svg" alt="">
            </div>
            <div class="login-and-guest">
                <button class="login">Send me the email</button>
            </div>
        </form>
    `;
}
