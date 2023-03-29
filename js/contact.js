let colors = ['#f99090', '#ff1717', '#fac66e', '#845400', '#b6fa81', '#07ab1d', '#81adfd', '#0048cd', '#ffb0f7', '#f500dc', ''];


let contacts = [{
        'firstname': 'Timotheus',
        'lastname': 'Höttges',
        'email': 'telefonieren@gmx.de',
        'phone': '+49 172 927 860 29',
        'color': 1
    },
    {
        'firstname': 'Christian',
        'lastname': 'Sewing',
        'email': 'pleite@yahoo.com',
        'phone': '+49 171 987 872 29',
        'color': 2
    },
    {
        'firstname': 'Jennifer',
        'lastname': 'Morgan',
        'email': 'tippen@web.de',
        'phone': '+49 176 911 222 69',
        'color': 3
    },
    {
        'firstname': 'Carla',
        'lastname': 'Krivet',
        'email': 'drkrivet@telekom.com',
        'phone': '+49 174 993 445 22',
        'color': 4
    },
    {
        'firstname': 'Herbert',
        'lastname': 'Diess',
        'email': 'rasen@web.de',
        'phone': '+49 170 222 345 44',
        'color': 5
    },
    {
        'firstname': 'Niklas',
        'lastname': 'Östberg',
        'email': 'sofa@gmx.de',
        'phone': '+49 177 232 454 99',
        'color': 6
    },
    {
        'firstname': 'Rolf',
        'lastname': 'Buch',
        'email': 'energyundkraft@web.de',
        'phone': '+49 86 - 353 874 35',
        'color': 7
    },
    {
        'firstname': 'Simone',
        'lastname': 'Bagel-Trah',
        'email': 'klebestark@gmail.com',
        'phone': '+49 175 - 393 234 99',
        'color': 8
    }
];

let neededLetters = ['T', 'C', 'J', 'H', 'N', 'R', 'S'];


function renderContacts() {
        neededLetters.sort();
        let contactlist = document.getElementById('contact-list-content');
        for (let i = 0; i < neededLetters.length; i++) {
            let letter = neededLetters[i];
            contactlist.innerHTML += generateLettersHTML(letter);
            for (let j = 0; j < contacts.length; j++) {
                if (contacts[j].firstname.toUpperCase().charAt(0) == letter) {
                    let contact = contacts[j];
                    let firstname = contact.firstname;
                    let lastname = contact.lastname;
                    let email = contact.email;
                    let initialesUnformatted = firstname.charAt(0) + lastname.charAt(0);
                    let initiales = initialesUnformatted.toUpperCase();
                    let color = contact.color;
                    let phone = contact.phone;
                    contactlist.innerHTML += generateContactHTML(firstname, lastname, email, initiales, color, phone);
                }

            }
        }
}


function generateLettersHTML(letter) {
        return `<div class="contact-list-letter">
                <span>${letter}</span>
            </div>
    `;
}


function showContact(firstname, lastname, initiales, email, color, phone) {
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
                    <div class="edit-contact-box">
                        <img src="edit.png">
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

function generateContactHTML(firstname, lastname, email, initiales, color, phone) {
        return `<div class="contact-card" onclick="showContact('${firstname}', '${lastname}', '${initiales}', '${email}', ${color}, '${phone}')">
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
    document.getElementById('new-contact-overlay').classList.add('new-contact-animation')
    setTimeout(() => {
        document.getElementById('contact-new-img').classList.remove('d-none');
        document.getElementById('contact-left-add').classList.remove('d-none');
        document.getElementById('contact-left-tasks').classList.remove('d-none');
    }, 225);

    
}
