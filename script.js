let input = document.getElementById("taskInput");
let button = document.getElementById("addBtn");
let list = document.getElementById("taskList");
let emptyMsg = document.getElementById("emptyMsg");

if (input && button && list) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function render() {
        list.innerHTML = "";
        emptyMsg.style.display = tasks.length === 0 ? "block" : "none";

        tasks.forEach((t, i) => {
            let li = document.createElement("li");
            li.textContent = t.text;
            if (t.done) li.classList.add("completed");

            li.onclick = function () {
                tasks[i].done = !tasks[i].done;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                render();
            };

            let del = document.createElement("button");
            del.textContent = "Delete";
            del.onclick = function (e) {
                e.stopPropagation();
                tasks.splice(i, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                render();
            };

            li.appendChild(del);
            list.appendChild(li);
        });
    }

    button.onclick = function () {
        let value = input.value.trim();
        if (!value) return;
        tasks.push({ text: value, done: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        input.value = "";
        render();
    };

    render();
}
