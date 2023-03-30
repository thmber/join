

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
let firstname;
let lastname;


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


function generateLettersHTML(letter) {
        return `<div class="contact-list-letter">
                <span>${letter}</span>
            </div>
    `;
}


function editContact(firstname, lastname, email, phone, index, initiales, color){
    addNewContact();
    document.getElementById('new-contact-name').value = firstname+' '+lastname;
    document.getElementById('new-contact-mail').value = email;
    document.getElementById('new-contact-phone').value = phone;
    document.getElementById('contact-left-add').innerHTML = `Edit Contact`;
    document.getElementById('contact-left-tasks').style.color = "rgb(41, 54, 70)";
    document.getElementById('circle-new-contact').innerHTML = `${initiales}`;
    document.getElementById('circle-new-contact').classList.remove('bg0');
    document.getElementById('circle-new-contact').classList.add(`bg${color}`);
    document.getElementById('create-edit-content').innerHTML = getEditBottom();
    contacts.splice(index, 1);
    let notNeededLetter = neededLetters.indexOf(lastname.charAt(0));
    neededLetters.splice(notNeededLetter, 1);
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
                    <div class="edit-contact-box" onclick="editContact('${firstname}', '${lastname}', '${email}', '${phone}', ${index}, '${initiales}', ${color})">
                        <div class="add-new-contact-button">
                        </div>
                        <img src="assets/img/edit.png">
                        <span>Edit Contact</span>
                    </div>
                </div>
                <div class="mail-phone">
                    <span class="mail-phone-headline">Email</span>
                    <span>${email}</span>
                    <span class="mail-phone-headline">Phone</span>
                    <span>${phone}</span>
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


function addNewContact(){
    document.getElementById('overlay-box').classList.remove('d-none');
    document.getElementById('contact-left-add').innerHTML = `Add Contact`;
    document.getElementById('contact-left-tasks').style.color = "white";
    document.getElementById('create-edit-content').innerHTML = getCreateBottom();
    setTimeout(() => {
         
        document.getElementById('contact-new-img').classList.remove('d-none');
        document.getElementById('contact-left-add').classList.remove('d-none');
        document.getElementById('contact-left-tasks').classList.remove('d-none');
        document.getElementById('contact-new-inputs').classList.remove('d-none');
        

    }, 225);    
}


function checkOnlyOneName(newName){
    if (newName.indexOf(' ') == -1) {
        firstname = '';
        lastname = newName;
        checkCapitals(lastname);
    }
    else{
        let newNamesplitted = newName.split(" ");
        firstname = newNamesplitted[0];
        lastname = newNamesplitted[1];
        checkCapitals(firstname);
        checkCapitals(lastname);
    }
}


function checkCapitals(name){
    capitals = name.toUpperCase();
    name = capitals.charAt(0) + name.slice(1);
    
}


function saveNewContact(){
    let newName = document.getElementById('new-contact-name').value;
    if (newName.length == 0) {
        return;
    }
    checkOnlyOneName(newName);
    let initialesUnformatted = firstname.charAt(0) + lastname.charAt(0);
    let initiales = initialesUnformatted.toUpperCase();
    let newMail = document.getElementById('new-contact-mail').value;
    let newPhone = document.getElementById('new-contact-phone').value;
    let randomcolor = Math.floor((Math.random()) * 7) +1;
    let newContact = {'firstname': firstname, 'lastname': lastname, 'email': newMail, 'phone': newPhone, 'initials': initiales, 'color': randomcolor};
    contacts.push(newContact);
    if (neededLetters.indexOf(lastname.toUpperCase().charAt(0)) == -1) {
        neededLetters.push(lastname.toUpperCase().charAt(0))
    } 
    animateCloseContact(randomcolor, initiales);
    clearShowedContact();
    clearNewContact();
    clearContactList();
    renderContacts();
}

function clearShowedContact(){
    document.getElementById('show-contact-content').innerHTML = '';
}


function clearContactList(){
    let contactlist = document.getElementById('contact-list-content');
    contactlist.innerHTML = '';
}


function clearNewContact(){
    document.getElementById('new-contact-mail').value = '';
    document.getElementById('new-contact-phone').value = '';
    document.getElementById('new-contact-name').value = '';
}


function closeNewContact(){ 
    document.getElementById('overlay-box').classList.add('d-none');
    hideNewContactCard();

}


function hideNewContactCard(){
        document.getElementById('contact-new-img').classList.add('d-none');
        document.getElementById('contact-left-add').classList.add('d-none');
        document.getElementById('contact-left-tasks').classList.add('d-none');
        document.getElementById('contact-new-inputs').classList.add('d-none');
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
                document.getElementById('new-contact-left').style.transform = "scale(1)";
                document.getElementById('new-contact-circle-name').style.opacity = "1";
                document.getElementById('new-contact-right-content').style.width = "60%";
                document.getElementById('circle-new-contact').classList.add('bg0');
                document.getElementById('circle-new-contact').classList.remove(`bg${randomcolor}`)
                hideNewContactCard();
                document.getElementById('circle-new-contact').innerHTML = `
                <img src="assets/img/person-icon-big.png" alt="">`;
            }, 800); 
        }, 250);
    
}


function getCreateBottom(){
    return `                    <button class="contact-new-cancel" onclick="closeNewContact()">
                                    <span>Cancel  </span>
                                    <span>&#10005;</span>
                                </button>
                                <button class="contact-new-create" onclick="saveNewContact()">
                                    <span>Create Contact</span>
                                    <img src="assets/img/create-icon.png" alt="">
                                </button>
    `;

}


function getEditBottom(){
    return `                    <button class="contact-new-save" onclick="saveNewContact()">
                                    <span>Save</span>
                                    <img src="assets/img/create-icon.png" alt="">
                                </button>
    `;
}