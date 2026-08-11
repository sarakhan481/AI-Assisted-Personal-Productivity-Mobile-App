function loadData(key) {
    try {
        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading saved data:", error);

        return [];
    }
}

let tasks = loadData("productivityTasks");
let weeklyTasks = loadData("weeklyTasks");
let goals = loadData("productivityGoals");

const homeNav = document.getElementById("homeNav");
const tasksNav = document.getElementById("tasksNav");
const goalsNav = document.getElementById("goalsNav");
const progressNav = document.getElementById("progressNav");


const homePage = document.getElementById("homePage");
const tasksPage = document.getElementById("tasksPage");
const goalsPage = document.getElementById("goalsPage");
const progressPage = document.getElementById("progressPage");

const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const progressText = document.getElementById("progressText");
const progressNumber = document.getElementById("progressNumber");


const addWeeklyTaskBtn =
    document.getElementById("addWeeklyTaskBtn");

const weeklyTaskList =
    document.getElementById("weeklyTaskList");


const addGoalBtn =
    document.getElementById("addGoalBtn");

const goalList =
    document.getElementById("goalList");


const todayProgressSummary =
    document.getElementById("todayProgressSummary");

const weeklyProgressSummary =
    document.getElementById("weeklyProgressSummary");

const goalProgressSummary =
    document.getElementById("goalProgressSummary");

const progressMessage =
    document.getElementById("progressMessage");

// Refresh
const refreshBtn =
    document.getElementById("refreshBtn");



function saveTasks() {

    localStorage.setItem(
        "productivityTasks",
        JSON.stringify(tasks)
    );

}

function saveWeeklyTasks() {

    localStorage.setItem(
        "weeklyTasks",
        JSON.stringify(weeklyTasks)
    );

}

function saveGoals() {

    localStorage.setItem(
        "productivityGoals",
        JSON.stringify(goals)
    );

}




function showPage(page) {

    homePage.classList.add("hidden");
    tasksPage.classList.add("hidden");
    goalsPage.classList.add("hidden");
    progressPage.classList.add("hidden");

    homeNav.classList.remove("active");
    tasksNav.classList.remove("active");
    goalsNav.classList.remove("active");
    progressNav.classList.remove("active");


    page.classList.remove("hidden");


    if (page === homePage) {

        homeNav.classList.add("active");

    }

    if (page === tasksPage) {

        tasksNav.classList.add("active");

    }

    if (page === goalsPage) {

        goalsNav.classList.add("active");

    }

    if (page === progressPage) {

        progressNav.classList.add("active");

    }

}



homeNav.addEventListener("click", function () {

    showPage(homePage);

});



tasksNav.addEventListener("click", function () {

    showPage(tasksPage);

});



goalsNav.addEventListener("click", function () {

    showPage(goalsPage);

});


// Progress
progressNav.addEventListener("click", function () {

    showPage(progressPage);

    updateProgressPage();

});


addTaskBtn.addEventListener("click", function () {

    const taskTitle =
        prompt("Enter your daily task:");


    if (!taskTitle || taskTitle.trim() === "") {

        return;

    }


    const newTask = {

        id: Date.now(),

        title: taskTitle.trim(),

        completed: false

    };


    tasks.push(newTask);

    saveTasks();

    renderTasks();

    updateProgressPage();

});


function renderTasks() {

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                No tasks yet. Add your first task!
            </div>
        `;

        updateStats();

        return;

    }


    tasks.forEach(function (task) {

        const taskElement =
            document.createElement("div");

        taskElement.className = "task";


        taskElement.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
            >

            <div class="task-content">

                <div class="task-title ${
                    task.completed ? "completed" : ""
                }">

                    ${task.title}

                </div>

            </div>

            <button class="delete-btn">
                🗑️
            </button>

        `;


        const checkbox =
            taskElement.querySelector("input");

        checkbox.addEventListener(
            "change",
            function () {

                toggleTask(task.id);

            }
        );


        const deleteButton =
            taskElement.querySelector(".delete-btn");

        deleteButton.addEventListener(
            "click",
            function () {

                deleteTask(task.id);

            }
        );


        taskList.appendChild(taskElement);

    });


    updateStats();

}


function toggleTask(id) {

    const task =
        tasks.find(function (task) {

            return task.id === id;

        });


    if (task) {

        task.completed = !task.completed;

    }


    saveTasks();

    renderTasks();

    updateProgressPage();

}


function deleteTask(id) {

    tasks =
        tasks.filter(function (task) {

            return task.id !== id;

        });


    saveTasks();

    renderTasks();

    updateProgressPage();

}


function updateStats() {

    const total = tasks.length;


    const completed =
        tasks.filter(function (task) {

            return task.completed;

        }).length;


    const pending =
        total - completed;


    const progress =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;


    progressText.textContent =
        `${progress}%`;

    progressNumber.textContent =
        `${progress}%`;

}



addWeeklyTaskBtn.addEventListener(
    "click",
    function () {

        const taskTitle =
            prompt("Enter your weekly task:");


        if (!taskTitle || taskTitle.trim() === "") {

            return;

        }


        const newWeeklyTask = {

            id: Date.now(),

            title: taskTitle.trim(),

            completed: false

        };


        weeklyTasks.push(newWeeklyTask);

        saveWeeklyTasks();

        renderWeeklyTasks();

        updateProgressPage();

    }
);


function renderWeeklyTasks() {

    weeklyTaskList.innerHTML = "";


    if (weeklyTasks.length === 0) {

        weeklyTaskList.innerHTML = `
            <div class="empty-message">
                No weekly tasks yet.
                Add your first weekly task!
            </div>
        `;

        return;

    }


    weeklyTasks.forEach(function (task) {

        const taskElement =
            document.createElement("div");

        taskElement.className =
            "weekly-task";


        taskElement.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
            >

            <div class="weekly-task-content">

                <div class="weekly-task-title ${
                    task.completed
                        ? "completed"
                        : ""
                }">

                    ${task.title}

                </div>

            </div>

            <button class="delete-btn">
                🗑️
            </button>

        `;


        const checkbox =
            taskElement.querySelector("input");

        checkbox.addEventListener(
            "change",
            function () {

                toggleWeeklyTask(task.id);

            }
        );


        const deleteButton =
            taskElement.querySelector(".delete-btn");

        deleteButton.addEventListener(
            "click",
            function () {

                deleteWeeklyTask(task.id);

            }
        );


        weeklyTaskList.appendChild(taskElement);

    });

}


function toggleWeeklyTask(id) {

    const task =
        weeklyTasks.find(function (task) {

            return task.id === id;

        });


    if (task) {

        task.completed = !task.completed;

    }


    saveWeeklyTasks();

    renderWeeklyTasks();

    updateProgressPage();

}


function deleteWeeklyTask(id) {

    weeklyTasks =
        weeklyTasks.filter(function (task) {

            return task.id !== id;

        });


    saveWeeklyTasks();

    renderWeeklyTasks();

    updateProgressPage();

}



addGoalBtn.addEventListener(
    "click",
    function () {

        const goalTitle =
            prompt("Enter your personal goal:");


        if (!goalTitle || goalTitle.trim() === "") {

            return;

        }


        const newGoal = {

            id: Date.now(),

            title: goalTitle.trim(),

            completed: false

        };


        goals.push(newGoal);

        saveGoals();

        renderGoals();

        updateProgressPage();

    }
);


function renderGoals() {

    goalList.innerHTML = "";


    if (goals.length === 0) {

        goalList.innerHTML = `
            <div class="empty-message">
                No goals yet. Add your first goal!
            </div>
        `;

        return;

    }


    goals.forEach(function (goal) {

        const goalElement =
            document.createElement("div");

        goalElement.className =
            "goal-card";


        goalElement.innerHTML = `

            <input
                type="checkbox"
                ${goal.completed ? "checked" : ""}
            >

            <div class="goal-content">

                <div class="goal-title ${
                    goal.completed
                        ? "goal-achieved"
                        : ""
                }">

                    ${goal.title}

                </div>

            </div>

            <button class="delete-btn">
                🗑️
            </button>

        `;


        const checkbox =
            goalElement.querySelector("input");

        checkbox.addEventListener(
            "change",
            function () {

                toggleGoal(goal.id);

            }
        );


        const deleteButton =
            goalElement.querySelector(".delete-btn");

        deleteButton.addEventListener(
            "click",
            function () {

                deleteGoal(goal.id);

            }
        );


        goalList.appendChild(goalElement);

    });

}


function toggleGoal(id) {

    const goal =
        goals.find(function (goal) {

            return goal.id === id;

        });


    if (goal) {

        goal.completed = !goal.completed;

    }


    saveGoals();

    renderGoals();

    updateProgressPage();

}


function deleteGoal(id) {

    goals =
        goals.filter(function (goal) {

            return goal.id !== id;

        });


    saveGoals();

    renderGoals();

    updateProgressPage();

}



function updateProgressPage() {

    // Daily progress
    const totalDaily =
        tasks.length;

    const completedDaily =
        tasks.filter(function (task) {

            return task.completed;

        }).length;


    const dailyProgress =
        totalDaily === 0
            ? 0
            : Math.round(
                (completedDaily / totalDaily) * 100
            );


    const totalWeekly =
        weeklyTasks.length;

    const completedWeekly =
        weeklyTasks.filter(function (task) {

            return task.completed;

        }).length;


    const weeklyProgress =
        totalWeekly === 0
            ? 0
            : Math.round(
                (completedWeekly / totalWeekly) * 100
            );


    
    const totalGoals =
        goals.length;

    const completedGoals =
        goals.filter(function (goal) {

            return goal.completed;

        }).length;


    const goalProgress =
        totalGoals === 0
            ? 0
            : Math.round(
                (completedGoals / totalGoals) * 100
            );



    todayProgressSummary.textContent =
        `${dailyProgress}%`;

    weeklyProgressSummary.textContent =
        `${weeklyProgress}%`;

    goalProgressSummary.textContent =
        `${goalProgress}%`;


   

    if (
        dailyProgress === 100 &&
        weeklyProgress === 100 &&
        goalProgress === 100 &&
        totalDaily > 0 &&
        totalWeekly > 0 &&
        totalGoals > 0
    ) {

        progressMessage.textContent =
            "Excellent! You completed all your tasks and goals! 🎉";

    }

    else if (
        dailyProgress >= 70 ||
        weeklyProgress >= 70 ||
        goalProgress >= 70
    ) {

        progressMessage.textContent =
            "Great work! Keep going and reach your goals! 💪";

    }

    else if (
        dailyProgress > 0 ||
        weeklyProgress > 0 ||
        goalProgress > 0
    ) {

        progressMessage.textContent =
            "Good start! Keep completing your tasks. 👍";

    }

    else {

        progressMessage.textContent =
            "Start completing your tasks and goals!";

    }

}



refreshBtn.addEventListener(
    "click",
    function () {

        location.reload();

    }
);
