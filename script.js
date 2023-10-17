const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addtask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        const li = document.createElement("li");
        li.textContent = inputBox.value;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"; 
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function () {
            li.remove();
            saveData();
        });

        li.appendChild(deleteButton);
        listContainer.appendChild(li);

        li.addEventListener("click", function () {
            li.classList.toggle("checked");
            saveData();
        });
    }
    inputBox.value = "";
    saveData();
}

function saveData() {
    const tasks = Array.from(listContainer.querySelectorAll("li"));
    const taskList = tasks.map((task) => {
        return {
            text: task.textContent,
            checked: task.classList.contains("checked"),
        };
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function showTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.text;

            if (task.checked) {
                li.classList.add("checked");
            }

            const deleteButton = document.createElement("button"); 
            deleteButton.textContent = "Delete"; 
            deleteButton.classList.add("delete-button");

            deleteButton.addEventListener("click", function () {
                li.remove();
                saveData();
            });

            li.appendChild(deleteButton);
            listContainer.appendChild(li);
        });
    }
}
showTasks();