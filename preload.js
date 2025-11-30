const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('api', {
    // Renderer can call Save & Load
    saveTasks: (tasks) => ipcRenderer.send("save-tasks", tasks), 
    loadTasks: () => ipcRenderer.invoke("load-tasks")
});



