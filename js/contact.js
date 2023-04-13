

let contacts = [];
let neededLetters = [];
let onlyLastnames = [];
let onlyFirstnames = [];
let sortedContacts = [];
let same = false;


function getNeededLetters(){
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i]['lastname'];
        let neededLetter = contact.charAt(0).toUpperCase();
        if (neededLetters.indexOf(neededLetter) == -1) {
            neededLetters.push(neededLetter)
        }
    }
}


async function saveContactsToBackend(){
    await backend.setItem('contacts', JSON.stringify(contacts));
    
    
}


async function renderContacts() {
        await init();
        getNeededLetters();
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
        let id = contact.id
        contactlist.innerHTML += generateContactHTML(firstname, lastname, email, initiales, color, phone, j, id);
    }
}


function getOnlyLastnamesAndSort(){
    for (let i = 0; i < contacts.length; i++) {
        let lastname = contacts[i]['lastname'] + contacts[i]['firstname'];
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
            let element = contacts[j]['lastname'] + contacts[j]['firstname']
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

function checkIfLetterIsUsedForName(letter){
    let letterposition = neededLetters.indexOf(`${letter}`);
    let letterIsNeeded = 0;
    for (let i = 0; i < contacts.length; i++) {
        lastname = contacts[i]['lastname'];
        if (lastname.charAt(0) == letter) {
            letterIsNeeded++
        }
    }
    if (letterIsNeeded < 2) {
        neededLetters.splice(letterposition, 1);
    }
}


async function saveEditedContact(color, index){
    let newName = document.getElementById('new-contact-name').value;
    let newMail = document.getElementById('new-contact-mail').value;
    let newPhone = document.getElementById('new-contact-phone').value;
    if (newName.length == 0 || newName.indexOf(' ') == -1) {
        return;
    }
    let letter = contacts[index].lastname.charAt(0);
    checkIfLetterIsUsedForName(letter);
    let newAndOldID = contacts[index]['id'];
    contacts.splice(index, 1);
    let newNamesplitted = newName.split(' ');
    let firstname = newNamesplitted[0].toUpperCase().charAt(0) + newNamesplitted[0].substring(1);
    let lastname = newNamesplitted[1].toUpperCase().charAt(0) + newNamesplitted[1].substring(1);
    let initials = firstname.charAt(0) + lastname.charAt(0);
    
    let newContact = {'firstname': firstname, 'lastname': lastname, 'email': newMail, 'phone': newPhone, 'initials': initials, 'color': color, 'id': newAndOldID};
    contacts.push(newContact);
    await saveContactsToBackend();
    showContact(firstname, lastname, initials, newMail, color, newPhone, index, newAndOldID);
    clearAndPush(lastname, color, initials);
    renderContacts();
}


function clearAndPush(lastname, color, initials){
    pushNewNeedLetter(lastname);
    animateCloseContact(color, initials);
    clearNewContactInput();
    clearContactList();

}


async function saveNewContact(){
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
    if (onlyLastnames.indexOf(lastname+firstname) > -1) {
        alert('cannnot create contact that already exists');
        return;
    }
    let initials = firstname.charAt(0) + lastname.charAt(0);
    let randomcolor = Math.floor((Math.random()) * 11) + 1;
    let newContact = {'firstname': firstname, 'lastname': lastname, 'email': newMail, 'phone': newPhone, 'initials': initials, 'color': randomcolor, 'id': contacts.length};    
    contacts.push(newContact);
    await saveContactsToBackend();
    clearAndPush(lastname, randomcolor, initials);
    showContact(firstname, lastname, initials, newMail, randomcolor, newPhone, (contacts.length-1), contacts.length-1);
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


function backToContactListMobile(){
    document.getElementById('contact-list-content').style.display = "flex";
    document.getElementById('contact-main-box').style.display = "none";
}


window.addEventListener("resize", backToNotMobile);


function backToNotMobile() {
    if (window.innerWidth > 750) {
        this.document.getElementById('contact-list-content').style.display = "flex";
         this.document.getElementById('contact-main-box').style.display = "flex";
    }
    else{
        document.getElementById('contact-list-content').style.display = "flex";
        document.getElementById('contact-main-box').style.display = "none";
    }
}

