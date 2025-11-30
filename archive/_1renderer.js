// Deprecated 
// Reason: Initially used to visualize electron. 

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const tasks = document.getElementById("tasks");

addBtn.addEventListener("click", () => {
    if (!input.value.trim()) return;
    const div = document.createElement("div");
    div.className = "task";
    div.textContent = input.value;
    tasks.appendChild(div);
    input.value = "";
});