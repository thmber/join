


let allCounts = [];
let dates = [];


async function getSummary(){
    await init();
    getNumberofTasks('status', 'inProgress');
    getNumberofTasks('status', 'awaitingFeedback');
    getNumberofTasks('priority', 'urgent');
    getNumberofTasks('status', 'todo');
    getNumberofTasks('status', 'done');
    getLatestDueDate();
    generateSummaryHTML();
}


function getLatestDueDate(){
    for (let i = 0; i < tasks.length; i++) {
        let duedate = tasks[i]['duedate'];
        dates.push(duedate);
    }
    dates.sort();
}

function getNumberofTasks(category, status){
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i]
        if (task[`${category}`] == `${status}`) {
            count++;
        }
    }
    allCounts.push(count)
}




function generateSummaryHTML(){
    let content = document.getElementById('summary-content');
    content.innerHTML = `
        <div class="summary-headline">
            <h1>Summary</h1>
            <div class="summary-line"></div>
            <span>Everything in a nutshell</span>
        </div>
        <div class="summary-and-greeting-box">
            <div class="summary-box">
                <div class="summary-row">
                    <div class="single-box single-first-row">
                        <span class="big-number">${tasks.length}</span>
                        <span>Tasks in <br>Board</span>
                    </div>
                    <div class="single-box single-first-row">
                        <span class="big-number">${allCounts[0]}</span>
                        <span>Tasks in <br>Progress</span>
                    </div>
                    <div class="single-box single-first-row">
                        <span class="big-number">${allCounts[1]}</span>
                        <span>Awaiting <br> Feedback</span>
                    </div>
                </div>
                <div class="summary-row">
                    <div class="single-box single-second-row">
                        <div class="urgent-box">
                            <div class="second-line-urgent-box">
                                <img src="assets/img/urgent_icon.svg" alt="">
                            </div>
                            <div class="urgent-and-number">
                                <span class="big-number">${allCounts[2]}</span>
                                <span>Urgent</span> 
                            </div>
                        </div>
                        <div class="middle-row-line">
                        </div>
                        <div class="deadline-text">
                            <span class="deadline-headline">${dates[0]}</span>
                            <span>Upcoming Deadline</span>
                        </div>
                    </div>
                </div>
                <div class="summary-row">
                    <div class="single-box single-third-row">
                        <div class="summary-img-box">
                            <img class="summary-icon" src="assets/img/edit_white.png" alt="">
                        </div>
                        <div class="summary-todo-done">
                            <span class="big-number">${allCounts[3]}</span>
                            <span>To-do</span>
                        </div>
                    </div>
                    <div class="single-box single-third-row">
                        <div class="summary-img-box">
                            <img class="summary-icon" src="assets/img/icon-done.svg" alt="">
                        </div>
                        <div class="summary-todo-done">
                            <span class="big-number">${allCounts[4]}</span>
                            <span>Done</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="greeting-box">
                <span class="greeting" id="greeting">Good morning</span>
                <span class="greeting-user" id="greeting-user">User</span>
            </div>
        </div>

    
    `;
}