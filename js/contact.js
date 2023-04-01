

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
let same = false;


function renderContacts() {
        sortNeededLetters();
        if (same == false) {
            sortContactsAlphabeticallyByLastName();
        }
        same = false;
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


function getOnlyLastnamesAndSort(){
    for (let i = 0; i < contacts.length; i++) {
        let lastname = contacts[i]['lastname'];
        onlyLastnames.push(lastname);
    }
    onlyLastnames.sort(function (a, b) {
        return a.localeCompare(b);
        });

}


function sortContactsAlphabeticallyByLastName(){
    onlyLastnames = [];
    sortedContacts = [];
    getOnlyLastnamesAndSort();
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


function checkSameLastname(lastname){
     if (onlyLastnames.indexOf(lastname) > -1) {
        same = true;
    }
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
    checkSameLastname(lastname);
    let initials = firstname.charAt(0) + lastname.charAt(0);
    let newContact = {'firstname': firstname, 'lastname': lastname, 'email': newMail, 'phone': newPhone, 'initials': initials, 'color': color};
    if (same == false) {
        contacts.push(newContact);
    }
    else{
        contacts.splice(index, 0, newContact);
    }
    showContact(firstname, lastname, initials, newMail, color, newPhone, index);
    clearAndPush(lastname, color, initials);
    renderContacts();
}


function clearAndPush(lastname, color, initials){
    pushNewNeedLetter(lastname);
    animateCloseContact(color, initials);
    clearNewContactInput();
    clearContactList();

}

function getIndex(lastname){
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (contact['lastname'] == lastname) {
            return i
        }
        
    }
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
    checkSameLastname(lastname);
    let initials = firstname.charAt(0) + lastname.charAt(0);
    let randomcolor = Math.floor((Math.random()) * 7) + 1;
    let newContact = {'firstname': firstname, 'lastname': lastname, 'email': newMail, 'phone': newPhone, 'initials': initials, 'color': randomcolor};
    if (same == false) {
        contacts.push(newContact);
    }
    else{
        contacts.splice(getIndex(lastname), 0, newContact);
    }
    clearAndPush(lastname, randomcolor, initials)
    showContact(firstname, lastname, initials, newMail, randomcolor, newPhone, (contacts.length-1));
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
