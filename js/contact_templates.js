

function generateLettersHTML(letter) {
    return `<div class="contact-list-letter">
            <span>${letter}</span>
        </div>
`;
}


function generateContactHTML(firstname, lastname, email, initiales, color, phone, index, id) {
    return `<div class="contact-card" onclick="showContact('${firstname}', '${lastname}', '${initiales}', '${email}', ${color}, '${phone}', ${index}, ${id})">
                <div class="contact-list-circle bg${color}">
                    ${initiales}
                </div>
                <div class="contact-list-name-mail">
                    <span class="contact-list-name">${firstname} ${lastname}</span>
                    <span class="contact-list-mail">${email}</span>
                </div>
            </div>
           `;
}


function showContact(firstname, lastname, initiales, email, color, phone, index, id) {
    document.getElementById('show-contact-content').innerHTML = `
            <div class="contact-main-name">
                <div class="contact-circle-big bg${color}">
                    ${initiales}
                </div>
                <div class="name-add-task">
                    <span class="name-main">${firstname} ${lastname}</span>
                    <span class="add-task-main" onclick=generateCardHTML(${id})>+ Add Task</span>
                </div>
            </div>
            <div class="contact-information-box">
                <span>Contact Information</span>
                <div class="edit-contact-box" onclick="popUpEditContact('${firstname}', '${lastname}', '${email}', '${phone}', '${initiales}', ${color}, ${index})">
                    <div class="add-new-contact-button">
                    </div>
                    <span class="pen">&#9998;</span>
                    <span>Edit Contact</span>
                </div>
            </div>
            <div class="mail-phone">
                <span class="mail-phone-headline">Email</span>
                <a href="mailto:${email}">${email}</a>
                <span class="mail-phone-headline">Phone</span>
                <span>${phone}</span>
            </div>
`;
}


function generateLeftSideNewContact(){
    return `
                    <div class="new-contact-left-img-box" id="contact-new-img">
                        <img src="assets/img/Capa_white.png" alt="">
                    </div>
                    <span class="contact-left-headline" id="contact-left-add">Add Contact</span>
                    <span class="contact-left-better" id="contact-left-tasks">Tasks are better with a team!</span>
                    <div class="new-contact-left-line" id="blue-line">
                    </div>
    `;
}


function generateRightSideNewContact(){
    return        ` <div class="new-contact-circle-name" id="new-contact-circle-name">
                         <div class="edit-contact-circle">
                            <div class="contact-circle-big contact-circle-card bg0" id="circle-new-contact">
                                <img src="assets/img/person-icon-big.png" alt="">
                            </div>  
                        </div>
                        <div class="contact-new-inputs" id="contact-new-inputs">
                            <span onclick="closeNewContact()" class="close-contact-cross">&#10005;</span>
                                <div class="input-form-new-contact">
                                    <input type="text" id="new-contact-name" placeholder ="first and last name" pattern="^\S+\s\S+$" >
                                    <img src="assets/img/icon_person.png" alt="">
                                </div>
                                <div class="input-form-new-contact">
                                    <input type="email" id="new-contact-mail" placeholder ="e-mail">
                                    <img src="assets/img/icon-email.svg" alt="">
                                </div>
                                <div class="input-form-new-contact">
                                    <input type="text" id="new-contact-phone" placeholder ="phone">
                                    <img src="assets/img/icon-phone.png" alt="">
                                </div>
                            <div class="create-cancel-box" id="create-edit-content">
                                <button class="contact-new-cancel" id="contact-new-cancel" onclick="closeNewContact()">
                                    <span>Cancel</span>
                                    <span>&#10005;</span>
                                </button>
                                <button class="contact-new-create" onclick="saveNewContact()">
                                    <span>Create Contact</span>
                                    <img src="assets/img/create-icon.png" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
    `;
}


function generateLeftSideEditContact(){
    return `
                    <div class="new-contact-left-img-box" id="contact-new-img">
                        <img src="assets/img/Capa_white.png" alt="">
                    </div>
                    <span class="contact-left-headline" id="contact-left-add">Edit Contact</span>
                    <span class="contact-left-better darkblue" id="contact-left-tasks">Tasks are better with a team!</span>
                    <div class="new-contact-left-line" id="blue-line">
                    </div>
    `;
}


function generateRightSideEditContact(firstname, lastname, email, phone, initials, color, index){
    return        ` <div class="new-contact-circle-name" id="new-contact-circle-name">
                        <div class="edit-contact-circle">
                            <div class="contact-circle-big contact-circle-card bg${color}" id="circle-new-contact">
                             ${initials}
                            </div>  
                        </div>
                        <div class="contact-new-inputs" id="contact-new-inputs">
                            <span onclick="closeNewContact()" class="close-contact-cross">&#10005;</span>
                                <div class="input-form-new-contact">
                                    <input value="${firstname} ${lastname}" type="text" id="new-contact-name" placeholder ="first and last name">
                                    <img src="assets/img/icon_person.png" alt="">
                                </div>
                                <div class="input-form-new-contact">
                                    <input value="${email}" type="email" id="new-contact-mail" placeholder ="e-mail">
                                    <img src="assets/img/icon-email.svg" alt="">
                                </div>
                                <div class="input-form-new-contact">
                                    <input value="${phone}" type="text" id="new-contact-phone" placeholder ="phone">
                                    <img src="assets/img/icon-phone.png" alt="">
                                </div>
                            <div class="create-cancel-box" id="create-edit-content">
                                 <button class="contact-new-save" onclick="saveEditedContact(${color}, ${index})">
                                    <span>Save</span>
                                    <img src="assets/img/create-icon.png" alt="">
                                </button>
                            </div>
                        </div>
                    </div>
    `;
}