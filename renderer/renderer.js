// Fetch html tags.
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const saveBtn = document.getElementById("save-btn");
const tasks = document.getElementById("tasks");

let ritualList = [];

/*
Create Ritual Cards
*/
function createTaskElement(text, done = false) {
    const wrapper = document.createElement("div");

    wrapper.className = "task-card fade-in"; 
    if (done) wrapper.classList.add("done"); 

    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";

    const label =  document.createElement("span");
    label.className = "task-text";
    label.textContent = text;

    const del = document.createElement("div");
    del.className = "delete-btn";
    del.textContent = "x";

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    wrapper.appendChild(del);

    //checkbox toggle
    checkbox.addEventListener("click", () => {
        wrapper.classList.toggle("done");
        const index = Array.from(tasks.children).indexOf(wrapper);
        ritualList[index].done = wrapper.classList.contains("done");
        window.api.saveTasks(ritualList);
    });

    // delete ritual
    del.addEventListener("click", () => {
        const index = Array.from(tasks.children).indexOf(wrapper);
        ritualList.splice(index, 1);

        wrapper.classList.add("remove");
        setTimeout(() => {
            tasks.removeChild(wrapper);
        }, 250);

        window.api.saveTasks(ritualList);
    });

    return wrapper;
}

/*
Add Ritual Card
*/
addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    const taskElement = createTaskElement(text, false);
    
    ritualList.push({
        text,
        done: false
    });

    window.api.saveTasks(ritualList);

    tasks.appendChild(taskElement);

    input.value = "";
});

/*
Manual Save
*/
document.getElementById("save-btn").addEventListener("click", () => {
    window.api.saveTasks(ritualList);

    // Ritual Pulse Animation
    saveBtn.classList.add("saved");
    setTimeout(() => saveBtn.classList.remove("saved"), 1300);
});


/*
Load Rituals on startup
*/
window.api.loadTasks().then((savedTasks) => {
    ritualList = savedTasks;

    savedTasks.forEach(t => {
        const taskElement = createTaskElement(t.text, t.done);
        tasks.appendChild(taskElement);
    });
});
