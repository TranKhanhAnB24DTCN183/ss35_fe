function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.content;
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Xóa";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            let comfirm=confirm(`Bạn có chắc chắn muốn xóa không`)
            if(comfirm){
                tasks.splice(index, 1); 
                localStorage.setItem("tasks", JSON.stringify(tasks));
                loadTasks(); 
            }
        };
        let editBtn = document.createElement("button");
        editBtn.textContent = "Sửa";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = function () {
            let newContent = prompt("Nhập nội dung mới:", task.content);
            if (newContent !== null && newContent.trim() !== "") {
                tasks[index].content = newContent.trim(); 
                localStorage.setItem("tasks", JSON.stringify(tasks));
                loadTasks();
            }
        };
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

let button=document.querySelector("button");
button.addEventListener("click",addTask);
window.onload=loadTasks;
function addTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    let newTask = {
       content:document.getElementById("taskInput").value,
    };
    if (newTask.content !== "") { 
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
        taskInput.value = "";
    }else{
        alert("Nhap cong viec di nao...")
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

