let categoriesOpen = false;
let assignedToOpen = false;
let colorsOpen = false;
let subtasksOpen = false;
let chosenCategory;
let alreadyAssigned = false;
let assignedTo = [];
let prio = '';
let previousPrio = '';
let today = new Date().toISOString().split("T")[0];
let previousColorAvatar = 0;
let testtask = [];
let percentage;
let categories = [{'category': 'Design', 'color': 1}, 
                    {'category': 'Marketing', 'color': 2}, 
                    {'category': 'Sales', 'color': 3},
                    {'category': 'Customer-Briefing', 'color': 4}]
let subtasks = [{'subtask': 'Putzen', 'status': ''},
                    {'subtask': 'Kochen', 'status': ''},
                    {'subtask': 'Aufräumen', 'status': ''}
                        ];
    
        

function categoryChosen(color, category){
            let categoryBox = document.getElementById('categories-options-box');
            document.getElementById('categories-options-box').style.height = `36px`;
            chosenCategory = category;
            categoryBox.innerHTML = `
                        <div class="category-to-choose">
                            <div class="options-cancel">
                                <div class="category-to-choose">
                                    <span onclick="categoryChosen(color, category)">${category}</span>
                                    <div class="small-point bg${color}"></div>
                                </div>
                                <span class="cancel-new-category" onclick="closeOptions()">&#10005;</span>
                            </div>
                        </div>
            `;
}


        function generatCategoryOptions(color, category){
            return `
                        <div onclick="categoryChosen(${color}, '${category}')" class="category-to-choose">
                            <span>${category}</span>
                            <div class="small-point bg${color}"></div>
                        </div>
                       
            `;
        }
        
        function generateNewCategoryOption(){
            return `
                    <div class="new-category-option">
                        <input id="input-new-category" onfocus="showNewCategoryCheckmark(), showNewCategoryColorOptions()" placeholder="Add new category">
                        <div class="color-avatar" id="color-avatar"></div>
                        <span onclick="addNewCategory()" id="input-new-category-symbol" min-length="3">&#10004;</span>
                    </div>
                    <div class="choose-category-colors" id="color-options">
                    </div>
                    <div id="popup-new-category">
                    </div>
            `;
        }


function addNewCategory(){
    let addedCategory = document.getElementById('input-new-category').value;
    if (addedCategory.length < 1) {
        return;
    }
    let newpopup = document.getElementById('popup-new-category');
    newpopup.innerHTML += `<div class="popup-new-category">
                            ${addedCategory}
                            <div class="small-point bg${previousColorAvatar}"></div>
                          </div>

    `;
    document.getElementById('input-new-category').value = '';
    document.getElementById('color-options').innerHTML = '';
    document.getElementById('input-new-category-symbol').style.opacity = "0";
    colorsOpen = false;
    setTimeout(() => {
        categoriesOpen = false;
        newCategory = {'category': addedCategory, 'color': previousColorAvatar};
        categories.splice(0, 0, newCategory);
        showCategoryOptions();
    }, 800);

}

function showNewCategoryColorOptions(){
       if (colorsOpen == false) {
        let options = document.getElementById('color-options');
        for (let i = 1; i < 9; i++) {
         options.innerHTML += generatColorOptions(i);
        }
        colorsOpen = true;
        let neededLength = (categories.length+3) * 36;
        document.getElementById('categories-options-box').style.height = `${neededLength}px`;
        
       }         
}


function generatColorOptions(i){
    return `   <div class="one-color-option bg${i}" onclick="fillAvatarColor(${i})">   
               </div>
    `;
}


function fillAvatarColor(index){
    if (previousColorAvatar) {
        document.getElementById('color-avatar').classList.remove(`bg${previousColorAvatar}`);
    }
    document.getElementById('color-avatar').classList.add(`bg${index}`);
    previousColorAvatar = index;

}



function showNewCategoryCheckmark(){
    document.getElementById('input-new-category-symbol').style.opacity = "1";

}

function showCategoryOptions(){
            let options = document.getElementById('category-options');
            if (categoriesOpen == false) {
                let neededLength = (categories.length+2) * 36;
                document.getElementById('categories-options-box').style.height = `${neededLength}px`;
                document.getElementById('category-options-triangle').style.transform = "translateX(-10px) rotate(180deg)"

                setTimeout(() => {
                    options.innerHTML = generateNewCategoryOption();
                    for (let i = 0; i < categories.length; i++) {
                        let category = categories[i]['category'];
                        let color = categories[i]['color'];
                        options.innerHTML += generatCategoryOptions(color, category);
                    }
                }, 200);
                categoriesOpen = true;
            } else {
                document.getElementById('category-options-triangle').style.transform = "rotate(0deg)"
                document.getElementById('categories-options-box').style.height = `36px`;
                options.innerHTML = '';
                categoriesOpen = false;
                colorsOpen = false;
            }
        }
        
        function showSubTasks(){
            let content = document.getElementById('subtask-options');
            content.innerHTML = '';
            for (let i = 0; i < subtasks.length; i++) {
                let subtask = subtasks[i]['subtask'];
                content.innerHTML += generateSubtasks(i);
            }
            checkSubtasksDoneLine();

        }

        function createNewSubtask(){
            let content = document.getElementById('new-subtask-box');
            let input = document.getElementById('new-subtask').value;
            if (input.length < 1) {
                return;
            }
            content.innerHTML = `<div class="each-subtask new-sub-animation">
                                    <span>${input}</span> 
                                    <div>
                                        <input type="checkbox">
                                        <label>&#10005;</label>
                                    </div>
                                </div>
            `;
            let newsub = {'subtask': input, 'status': ''}
            subtasks.splice(0, 0, newsub);
            document.getElementById('new-subtask').value = '';
            setTimeout(() => {
                content.innerHTML = '';
                showSubTasks();
                checkSubtasksDoneLine(0);
            }, 625);
            
        }

        function deleteSub(index){
            subtasks.splice(index, 1);
            showSubTasks();
        }


        function generateSubtasks(index){
            return `
                <div class="each-subtask">
                    <span>${subtasks[index]['subtask']}</span> 
                    <div>
                        <input onchange="checkSubtask(${index})" ${subtasks[index]['status']} id="subtask${index}" type="checkbox">
                        <label onclick="deleteSub(${index})">&#10005;</label>
                    </div>
                </div>
            `;
        }
    


        function checkSubtask(index){
            if (subtasks[index]['status'] == '') {
                subtasks[index]['status'] = 'checked';
            }
            else{
                subtasks[index]['status'] = ''
            }
            checkSubtasksDoneLine();
        }

        function checkSubtasksDoneLine(){
            let line = document.getElementById('done-subtasks-line');
            let noti = document.getElementById('done-of');
            let subtasksDone = 0;
             for (let i = 0; i < subtasks.length; i++) {
                if (subtasks[i]['status'] == 'checked') {
                    subtasksDone++
                }
            }
            percentage = subtasksDone / subtasks.length * 100
            line.style.width = `${percentage}%`;
            noti.innerHTML = `Subtasks done (${subtasksDone} of ${subtasks.length})`;
            setTimeout(() => {
                if (percentage == 100) {
                showCoffee('flex');
                line.style.backgroundColor = "rgb(41, 54, 70)";
            }
            else{
                showCoffee('none');
                line.style.backgroundColor = "rgb(11, 173, 221)";
            }
            }, 250);

        }

        function showCoffee(param){
            document.getElementById('coffee-container').style.display = `${param}`;
        }


        function closeOptions(){
            categoriesOpen = false;
            chosenCategory = [];
            document.getElementById('categories-options-box').style.height = `36px`
            let options = document.getElementById('categories-options-box');
            options.innerHTML = `
                         <div onclick="showCategoryOptions()" class="categories-options-headline" id="options1">
                            <span>Choose category</span>
                            <span class="options-triangle" id="category-options-triangle">&#x25BE;</span>
                        </div>
                        <div class="category-options" id="category-options">
                        </div>
            `;
        }

        function showAssignedToOptions(){
            let options = document.getElementById('assigned-options');
            if (assignedToOpen == false) {
                let neededLength = (contacts.length+1) * 36;
                document.getElementById('assigned-options-box').style.height = `${neededLength}px`;
                document.getElementById('assigned-options-triangle').style.transform = "translateX(-10px) rotate(180deg)"

                setTimeout(() => {
                    for (let i = 0; i < contacts.length; i++) {
                    let name = contacts[i]['firstname']+ ' ' + contacts[i]['lastname'];
                    let color = contacts[i]['color'];
                    options.innerHTML += generateAssignedToOptions(color, name, i);
                }  
                }, 200);
                assignedToOpen = true;
            } else {
                document.getElementById('assigned-options-triangle').style.transform = "rotate(0)"

                document.getElementById('assigned-options-box').style.height = `36px`;
                options.innerHTML = '';
                assignedToOpen = false;
            }
        }


function checkIfAssigned(name){
            for (let i = 0; i < assignedTo.length; i++) {
                let element = assignedTo[i]['firstname'] + " " + assignedTo[i]['lastname'];
                if (element == name) {
                    return `checked`;
                }
            }
}


function generateAssignedToOptions(color, name, index){
            return `
                            <div class="assigned-option category-to-choose">
                                <label for="name">${name}</label>
                                <input ${checkIfAssigned(name)} onchange="addAssignmentsto(${index})" type="checkbox" id="assignedToName${index}">
                            </div>
            `;
}


function addAssignmentsto(index){
            let newlyAssignedName = contacts[index]['firstname'] + ' ' + contacts[index]['lastname'];
            for (let i = 0; i < assignedTo.length; i++) {
                let element = assignedTo[i]['firstname'] + " " + assignedTo[i]['lastname'];
                if (newlyAssignedName == element) {
                    assignedTo.splice(i, 1);
                    renderChosenCircles();
                    return;
                } 
            }
            assignedTo.push(contacts[index]);
            renderChosenCircles();
}

        
function generateAssignedToCircles(initials, color, index){
            return `
                    <div class="each-chosen-circle bg${color}">
                        ${initials}
                    </div>  
            `;
}


function renderChosenCircles(){
            let content = document.getElementById('chosen-circles');
            content.innerHTML = '';
            for (let i = 0; i < assignedTo.length; i++) {
                let initials = assignedTo[i]['initials'];
                let color = assignedTo[i]['color'];
                content.innerHTML += generateAssignedToCircles(initials, color, i);
            }
}

      

function definePrio(chosenPrio){
                if (previousPrio) {
                    document.getElementById(`${previousPrio}-box`).classList.remove(`${previousPrio}-clicked`);
                    document.getElementById(`${previousPrio}-symbol`).classList.remove('symbol-clicked');
                }
                document.getElementById(`${chosenPrio}-box`).classList.toggle(`${chosenPrio}-clicked`);
                document.getElementById(`${chosenPrio}-symbol`).classList.toggle('symbol-clicked');
                previousPrio = chosenPrio;
                prio = chosenPrio;                       
}


function saveNewTask(){
            let taskTitle = document.getElementById('add-task-title').value;
            let taskdescription = document.getElementById('add-task-description').value;
            let taskduedate = document.getElementById('due-date-input').value;
            let newTask = {'id': '',
                            'status': 'todo', 
                            'title': taskTitle, 
                            'description': taskdescription,
                            'duedate': taskduedate,
                            'priority': prio, 
                            'assignedTo': assignedTo, 
                            'category': chosenCategory, 
                            'subtasks': subtasks,
                            'subtasksdone': percentage};
            testtask.push(newTask);
            document.getElementById('card').classList.add('close-card-animation');
            resetInputs();
            setTimeout(() => {
                let content = document.getElementById('container-content');
                content.style.display = "none";
            }, 525);
}


        
function getDueDate() {
        let todayasnumber = today.charAt(today.length-2)+today.charAt(today.length-1);
        duedateday = +todayasnumber +7;
        duedate = `2023-${today.charAt(5)}${today.charAt(6)}-${duedateday}`
        return duedate;       
}


function cancelNewTask(){
            let content = document.getElementById('container-content');
            content.style.display = "none";
            resetInputs();
            
}


function resetInputs(){
    assignedTo = [];
    chosenCategory = '';
    subtasks = [];
}


function generateCardHTML(index){
            assignedTo.push(contacts[index])
            let content = document.getElementById('container-content');
            content.style.display = "flex";
            content.innerHTML = `
            <div class="card" id="card">
            <form action="#" onsubmit="saveNewTask()" autocomplete="off">
                 <div class="card-left">
                    <span class="add-task-head-title">Add Task</span>
                    <label for="add-task-title">Title</label>
                    <input required id="add-task-title" placeholder="Enter a title"></input>
                    <label for="add-task-description">Description</label>
                    <textarea placeholder="Enter a description" required class="task-textarea" type="text" id="add-task-description"></textarea>
                    <label for="add-task-category">Category</label>
                    <div class="categories-options-box" id="categories-options-box">
                        <div onclick="showCategoryOptions()" class="categories-options-headline">
                            <span>Choose category</span>
                            <span class="options-triangle" id="category-options-triangle">&#x25BE;</span>
                        </div>
                        <div class="category-options" id="category-options">
                        </div>
                    </div>     
                    <label for="assigned-options-box">Assigned to</label>               
                    <div class="assigned-options-box" id="assigned-options-box">
                        <div onclick="showAssignedToOptions()" class="categories-options-headline">
                            <span>Select contact to assign</span>
                            <span class="options-triangle" id="assigned-options-triangle">&#x25BE;</span>
                        </div>
                        <div class="assigned-options" id="assigned-options">
                        </div>  
                    </div>  
                    <div class="chosen-circles" id="chosen-circles">
                        <div class="each-chosen-circle bg${contacts[index]['color']}">
                        ${contacts[index]['initials']}
                        </div>  
                    </div>     
                </div>
                <div class="card-middle-box">
                    <div class="middle-line">
                    </div>
                </div>
                <div class="card-right">
                    <label for="add-task-duedate">Due date</label>
                    <input min="${today}" id="due-date-input" value="${getDueDate()}" type="date" id="add-task-duedate" required>
                    <label for="add-task-prio">Prio</label>
                    <div class="add-task-prio" id="add-task-prio">
                        <div onclick="definePrio('urgent')" class="prio-box urgent-box" id="urgent-box">
                            <span>urgent</span>
                            <img id="urgent-symbol" src="assets/img/urgent.svg">
                        </div>
                        <div onclick="definePrio('medium')" class="prio-box medium-box" id="medium-box">
                            <span>medium</span>
                            <img id="medium-symbol" src="assets/img/medium.svg">
                        </div>
                        <div onclick="definePrio('low')" class="prio-box low-box" id="low-box">
                            <span>low</span>
                            <img id="low-symbol" src="assets/img/low.svg">
                        </div>
                    </div>
                    <label for="add-task-subtasks1">Subtasks</label>
                    <div class="subtask-options-box" id="subtask-options-box">
                        <div class="categories-options-headline">
                            <input type="text" min-length="4" placeholder="Add new subtask" id="new-subtask">
                            <span onclick="createNewSubtask()" class="options-triangle">&#xFE62;</span>
                        </div>
                    </div>  
                    <div class="new-subtask-box" id="new-subtask-box">
                    </div>
                    <div class="subtask-options" id="subtask-options">
                    </div> 
                    <div class="subtasks-done-box" id="done-of">Subtasks done
                    </div>
                    <div class="subtasks-done-line">
                        <div class="subtasks-really-done" id="done-subtasks-line"></div>
                        <div class="coffee-container" id="coffee-container">
                            <img src="assets/img/cup_join.png" class="cup">
                            <img src="assets/img/cup-steam.png" class="steam">
                        </div> 
                    </div>   
                    <div class="save-task-button">
                        <span class="cancel-new-task" onclick="cancelNewTask()">Cancel</span>
                        <input type="submit" value="Create Task" id="add-task-submit">
                    </div>                    
                </div>
            </form>
        </div>
            
            `;
        showSubTasks();
}