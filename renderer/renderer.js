// Fetch html tags.
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const tasks = document.getElementById("tasks");

function createTaskElement(text) {
    const wrapper = document.createElement("div");
    wrapper.className = "task-card";

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
    });

    // delete
    del.addEventListener("click", () => {
        wrapper.classList.add("remove");
        setTimeout(() => {
            tasks.removeChild(wrapper);
        }, 250);
    });

    return wrapper;
}

addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    const taskElement = createTaskElement(text);
    tasks.appendChild(taskElement);

    input.value = "";
});
