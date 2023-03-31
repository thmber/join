

let contacts = [{
        'firstname': 'Timotheus',
        'lastname': 'Höttges',
        'email': 'telefonieren@gmx.de',
        'phone': '+49 172 927 860 29',
        'initials': 'TH',
        'color': 1
    },
    {
        'firstname': 'Christian',
        'lastname': 'Sewing',
        'email': 'pleite@yahoo.com',
        'phone': '+49 171 987 872 29',
        'initials': 'CS',
        'color': 2
    },
    {
        'firstname': 'Jennifer',
        'lastname': 'Morgan',
        'email': 'tippen@web.de',
        'phone': '+49 176 911 222 69',
        'initials': 'JM',
        'color': 3
    },
    {
        'firstname': 'Carla',
        'lastname': 'Krivet',
        'email': 'drkrivet@telekom.com',
        'phone': '+49 174 993 445 22',
        'initials': 'CK',
        'color': 4
    },
    {
        'firstname': 'Herbert',
        'lastname': 'Diess',
        'email': 'rasen@web.de',
        'phone': '+49 170 222 345 44',
        'initials': 'HD',
        'color': 5
    },
    {
        'firstname': 'Niklas',
        'lastname': 'Östberg',
        'email': 'sofa@gmx.de',
        'phone': '+49 177 232 454 99',
        'initials': 'NÖ',
        'color': 6
    },
    {
        'firstname': 'Rolf',
        'lastname': 'Buch',
        'email': 'energyundkraft@web.de',
        'phone': '+49 86 - 353 874 35',
        'initials': 'RB',
        'color': 7
    },
    {
        'firstname': 'Simone',
        'lastname': 'Bagel-Trah',
        'email': 'klebestark@gmail.com',
        'phone': '+49 175 - 393 234 99',
        'initials': 'SB',
        'color': 8
    }
];


let neededLetters = ['H', 'S', 'M', 'K', 'D', 'Ö', 'B'];
let onlyLastnames = [];
let sortedContacts = [];


function renderContacts() {
        sortNeededLetters();
        sortContactsAlphabeticallyByLastName();
        let contactlist = document.getElementById('contact-list-content');
        for (let i = 0; i < neededLetters.length; i++) {
            let letter = neededLetters[i];
            contactlist.innerHTML += generateLettersHTML(letter);
            for (let j = 0; j < contacts.length; j++) {
                generateContactForEachLetter(letter, j, contactlist);
            }
        }
}


function sortNeededLetters(){
    neededLetters.sort(function (a, b) {
        return a.localeCompare(b);
        });
}


function generateContactForEachLetter(letter, j, contactlist){
    if (contacts[j].lastname.toUpperCase().charAt(0) == letter) {
        let contact = contacts[j];
        let firstname = contact.firstname;
        let lastname = contact.lastname;
        let email = contact.email;
        let initiales = contact.initials;
        let color = contact.color;
        let phone = contact.phone;
        contactlist.innerHTML += generateContactHTML(firstname, lastname, email, initiales, color, phone, j);
    }
}


function sortContactsAlphabeticallyByLastName(){
    onlyLastnames = [];
    sortedContacts = [];
    for (let i = 0; i < contacts.length; i++) {
        let lastname = contacts[i]['lastname'];
        onlyLastnames.push(lastname);
    }
    onlyLastnames.sort(function (a, b) {
        return a.localeCompare(b);
        });
    for (let i = 0; i < onlyLastnames.length; i++) {
        let name = onlyLastnames[i];
        for (let j = 0; j < contacts.length; j++) {
            element = contacts[j]['lastname'];
            if (name == element) {
                sortedContacts.push(contacts[j]);
            }
        }   
    }
    contacts = sortedContacts;
}


function popUpEditContact(firstname, lastname, email, phone, initials, color, index){
    clearContactCard();
    document.getElementById('overlay-box').classList.remove('d-none');
    setTimeout(() => {
        let contentleft = document.getElementById('new-contact-left');
        contentleft.innerHTML += generateLeftSideEditContact();
        let contentright = document.getElementById('new-contact-right-content');
        contentright.innerHTML += generateRightSideEditContact(firstname, lastname, email, phone, initials, color, index);
    }, 225);
}


function addNewContact(){
    clearContactCard();
    document.getElementById('overlay-box').classList.remove('d-none');
    setTimeout(() => {
        let contentleft = document.getElementById('new-contact-left');
        contentleft.innerHTML += generateLeftSideNewContact();
        let contentright = document.getElementById('new-contact-right-content');
        contentright.innerHTML += generateRightSideNewContact();
    }, 225);
}


function saveEditedContact(color, index){
    let newName = document.getElementById('new-contact-name').value;
    let newMail = document.getElementById('new-contact-mail').value;
    let newPhone = document.getElementById('new-contact-phone').value;
    if (newName.length == 0 || newName.indexOf(' ') == -1) {
        return;
    }
    let letter = contacts[index].lastname.charAt(0);
    let letterposition = neededLetters.indexOf(`${letter}`);
    neededLetters.splice(letterposition,1);
    contacts.splice(index, 1);
    let newNamesplitted = newName.split(' ');
    let firstname = newNamesplitted[0].toUpperCase().charAt(0) + newNamesplitted[0].substring(1);
    let lastname = newNamesplitted[1].toUpperCase().charAt(0) + newNamesplitted[1].substring(1);
    let initials = firstname.charAt(0) + lastname.charAt(0);
    let newContact = {'firstname': firstname, 'lastname': lastname, 'email': newMail, 'phone': newPhone, 'initials': initials, 'color': color};
    contacts.push(newContact);
    pushNewNeedLetter(lastname);
    animateCloseContact(color, initials);
    clearNewContactInput();
    clearContactList();
    showContact(firstname, lastname, initials, newMail, color, newPhone, index);
    renderContacts();
}


function saveNewContact(){
    let newName = document.getElementById('new-contact-name').value;
    let newMail = document.getElementById('new-contact-mail').value;
    let newPhone = document.getElementById('new-contact-phone').value;
    if (newName.length == 0 || newName.indexOf(' ') == -1) {
        showWarningName();
        return;
    }
    let newNamesplitted = newName.split(' ');
    let firstname = newNamesplitted[0].toUpperCase().charAt(0) + newNamesplitted[0].substring(1);
    let lastname = newNamesplitted[1].toUpperCase().charAt(0) + newNamesplitted[1].substring(1);
    let initials = firstname.charAt(0) + lastname.charAt(0);
    let randomcolor = Math.floor((Math.random()) * 7) + 1;
    let newContact = {'firstname': firstname, 'lastname': lastname, 'email': newMail, 'phone': newPhone, 'initials': initials, 'color': randomcolor};
    contacts.push(newContact);
    pushNewNeedLetter(lastname);
    animateCloseContact(randomcolor, initials);
    clearNewContactInput();
    clearContactList();
    renderContacts();
}


function showWarningName(){
    document.getElementById('new-contact-name').style.color = "red";
    document.getElementById('new-contact-name').value = "first and last name";
    setTimeout(() => {
        document.getElementById('new-contact-name').style.color = "rgb(11, 173, 221)";
        document.getElementById('new-contact-name').value = ""; 
    }, 320);
}

function pushNewNeedLetter(lastname){
    if (neededLetters.indexOf(lastname.toUpperCase().charAt(0)) == -1) {
        neededLetters.push(lastname.toUpperCase().charAt(0))
    } 
}


function clearShowedContact(){
    document.getElementById('show-contact-content').innerHTML = '';
}


function clearContactList(){
    let contactlist = document.getElementById('contact-list-content');
    contactlist.innerHTML = '';
}


function clearNewContactInput(){
    document.getElementById('new-contact-mail').value = '';
    document.getElementById('new-contact-phone').value = '';
    document.getElementById('new-contact-name').value = '';
}


function closeNewContact(){ 
    document.getElementById('overlay-box').classList.add('d-none');
    clearContactCard();
    editing = false;
}


function clearContactCard(){
    document.getElementById('new-contact-left').innerHTML = '';    
    document.getElementById('new-contact-right-content').innerHTML = '';
}


function changeCircleColorNewContact(randomcolor, initiales){
        document.getElementById('circle-new-contact').classList.remove('bg0');
        document.getElementById('circle-new-contact').classList.add(`bg${randomcolor}`)
        document.getElementById('circle-new-contact').innerHTML = `${initiales}`;
}
    


function animateCloseContact(randomcolor, initiales){
        changeCircleColorNewContact(randomcolor, initiales);
        setTimeout(() => {
            document.getElementById('new-contact-right-content').style.width = "0";
            document.getElementById('new-contact-circle-name').style.opacity = "0";
            document.getElementById('new-contact-left').style.transform = "scale(0)";

            setTimeout(() => {
                document.getElementById('overlay-box').classList.add('d-none');
                document.getElementById('new-contact-right-content').style.width = "60%";
                document.getElementById('new-contact-circle-name').style.opacity = "1";
                document.getElementById('new-contact-left').style.transform = "scale(1)";
                clearNewContactInput();
            }, 800); 
        }, 250);
    
}


function generateLettersHTML(letter) {
    return `<div class="contact-list-letter">
            <span>${letter}</span>
        </div>
`;
}


function generateContactHTML(firstname, lastname, email, initiales, color, phone, index) {
    return `<div class="contact-card" onclick="showContact('${firstname}', '${lastname}', '${initiales}', '${email}', ${color}, '${phone}', ${index})">
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


function showContact(firstname, lastname, initiales, email, color, phone, index) {
    document.getElementById('show-contact-content').innerHTML = `
            <div class="contact-main-name">
                <div class="contact-circle-big bg${color}">
                    ${initiales}
                </div>
                <div class="name-add-task">
                    <span class="name-main">${firstname} ${lastname}</span>
                    <span class="add-task-main">+ Add Task</span>
                </div>
            </div>
            <div class="contact-information-box">
                <span>Contact Information</span>
                <div class="edit-contact-box" onclick="popUpEditContact('${firstname}', '${lastname}', '${email}', '${phone}', '${initiales}', ${color}, ${index})">
                    <div class="add-new-contact-button">
                    </div>
                    <img src="assets/img/edit.png">
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
                                    <input type="text" id="new-contact-name" placeholder ="first and last name">
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
                                <button class="contact-new-cancel" onclick="closeNewContact()">
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