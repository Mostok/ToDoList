const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  }
];

(function(arrOfTasks) {
  let objOfTasks = arrOfTasks.reduce((calc, task) => {
    calc[task._id] = task;
    return calc;
  }, {});

  // *Variables
  const ul = document.querySelector(".list-group");
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputText = form.elements["body"];

  showTasks(objOfTasks);
  form.addEventListener("submit", formSubmited);
  ul.addEventListener("click", clickOnUl);

  document.querySelector(".all-tasks").addEventListener("click", showAllTasks);
  document
    .querySelector(".completed-tasks")
    .addEventListener("click", showCompletedTasks);
  document
    .querySelector(".uncompleted-tasks")
    .addEventListener("click", showUncompletedTasks);

  function showTasks(tasks) {
    let fragment = document.createDocumentFragment();

    if (Object.values(tasks).length === 0) {
      let b = document.createElement("b");
      b.classList.add("nothing");
      b.textContent = "Задач нет";
      fragment.appendChild(b);
      ul.appendChild(fragment);
      return;
    }

    Object.values(tasks).forEach(el => {
      let li = createDomLi(el);
      fragment.appendChild(li);
    });
    ul.appendChild(fragment);
  }

  function createDomLi(el) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.dataset.taskId = el._id;

    const span = document.createElement("b");
    span.textContent = el.title;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");
    deleteButton.textContent = "Delete task";

    const statusButton = document.createElement("button");
    statusButton.classList.add("btn", "status-btn");
    if (el.completed) {
      statusButton.classList.add("btn-success", "disabled");
      statusButton.textContent = "Завершена";
    } else {
      statusButton.classList.add("btn-primary");
      statusButton.textContent = "Незавершена";
    }

    const text = document.createElement("p");
    text.classList.add("mt-2", "w-100");
    text.textContent = el.body;

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(statusButton);
    li.appendChild(text);

    return li;
  }

  function formSubmited(e) {
    e.preventDefault();
    if (ul.querySelector(".nothing")) {
      ul.querySelector(".nothing").remove();
    }

    const title = inputTitle.value;
    const text = inputText.value;
    let li = createDomLi(createNewTask(title, text));
    ul.insertAdjacentElement("afterbegin", li);
    form.reset();
  }

  function createNewTask(title, body) {
    const task = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };
    arrOfTasks.unshift(task);
    objOfTasks = arrOfTasks.reduce((calc, task) => {
      calc[task._id] = task;
      return calc;
    }, {});

    return { ...task };
  }

  function clickOnUl({ target }) {
    if (target.classList.contains("delete-btn")) {
      deleteTask(target);
    }
    if (target.classList.contains("status-btn")) {
      changeTaskStatus(target);
    }
  }

  function deleteTask(button) {
    let parent = button.parentElement;
    let id = parent.dataset.taskId;
    if (!confirm(`Вы точно хотите удалить задачу ${objOfTasks[id].title}`))
      return;
    delete objOfTasks[id];
    parent.remove();
  }

  function changeTaskStatus(button) {
    let parent = button.parentElement;
    let id = parent.dataset.taskId;
    button.classList.remove("btn-primary");
    button.classList.add("btn-success", "disabled");
    button.textContent = "Завершена";
    objOfTasks[id].completed = true;
  }

  function showAllTasks(e) {
    [...ul.children].forEach(el => {
      ul.removeChild(el);
    });
    showTasks(objOfTasks);
  }

  function showCompletedTasks(e) {
    [...ul.children].forEach(el => {
      ul.removeChild(el);
    });
    const filterArray = Object.values(tasks).filter(el => {
      return el.completed;
    });
    const filerTasksObject = filterArray.reduce((calc, task) => {
      calc[task._id] = task;
      return calc;
    }, {});
    showTasks(filerTasksObject);
  }

  function showUncompletedTasks(e) {
    [...ul.children].forEach(el => {
      ul.removeChild(el);
    });
    const filterArray = Object.values(tasks).filter(el => {
      return !el.completed;
    });
    const filerTasksObject = filterArray.reduce((calc, task) => {
      calc[task._id] = task;
      return calc;
    }, {});
    showTasks(filerTasksObject);
  }
})(tasks);
