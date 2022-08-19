const tasksContainer = document.querySelector(".container-tasks");

export const task = (document.querySelector(
  ".container-form"
).innerHTML = /*html*/ `<label for="inputText" class="tarea fs-2">Nueva tarea:</label>
        <input autocomplete="off" id="inputText" onchange="newTask()" type="text" class="form-control" autofocus placeholder="Introduce el texto">`);

var tasks = [];

const loadInitial = () => {
  // Limpia la pantalla antes de pintar los elementos.
  tasksContainer.innerHTML = " ";

  // Comprueba si en localStorage hay datos grabados.
  const datos = JSON.parse(localStorage.getItem("tasks"));
  if (datos != undefined) {
    const data = datos.map(
      (
        elemento,
        index
      ) => /*html*/ `<div id="${index}" class="task animate__animated">
                                <div class="form-check">
                                  <input onchange="done(${index})" value="true" class="form-check-input" type="checkbox" id="${
        index + 100
      }">
                                    <label class="form-check-label" for="defaultCheck1">
                                    <p class="h5">${elemento.description}</p>
                                    </label>
                                </div>
                                  
                                  <button id="${
                                    index + 150
                                  }" class="icon" onclick="deleteTask(${index})" ><span title="Eliminar" class="material-symbols-outlined">delete</span></button>
                                  <button id="${
                                    index + 200
                                  }" class="icon" onclick="setPriority(${index})" ><span title="Prioridad alta" class="material-symbols-outlined">priority_high</span></button>
                                </div>`
    );
    // Pinta las tareas en pantalla.
    tasksContainer.innerHTML = data.join("");

    // Aplica estilo según el valor de "done".
    datos.forEach((dato, index) => {
      if (dato.new === true) {
        document.getElementById(index).classList.add("animate__zoomIn");
        setTimeout(() => {
          document.getElementById(index).classList.remove("animate__zoomIn");
        }, 1000);
      }

      if (dato.done === true) {
        let indice = index + 100;
        document.getElementById(index).classList.add("task--done");
        document.getElementById(indice).checked = true;
      }

      if (dato.priority === "high") {
        let indice2 = index + 150;
        let indice3 = index + 200;
        document.getElementById(index).classList.add("priority--high");
        document.getElementById(indice2).classList.add("icon--priority");
        document.getElementById(indice3).classList.add("icon--priority");
      }
    });
    // Asigna a "tasks" los datos obtenidos del localStorage, ya que al iniciar el navegador
    // el array está vacío.
    datos.forEach((elemento) => tasks.push(elemento));
  }
};

loadInitial();

// Crea una tarea nueva, la graba en localStorage y después llama a la función "loadTasks" para que pinte
// los datos en pantalla.
window.newTask = () => {
  let description = inputText.value;
  let task = { description, done: false, priority: "low", new: false };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
};

// Esta función se encarga de pintar los datos en pantalla.
const loadTasks = () => {
  // Limpia la pantalla antes de pintar los elementos.
  tasksContainer.innerHTML = " ";

  const datos = JSON.parse(localStorage.getItem("tasks"));

  const data = datos.map(
    (
      elemento,
      index
    ) => /*html*/ `<div id="${index}" class="task animate__animated">
                                <div class="form-check">
                                  <input onchange="done(${index})" value="true" class="form-check-input" type="checkbox" id="${
      index + 100
    }">
                                    <label class="form-check-label" for="defaultCheck1"> <p class="h5">${
                                      elemento.description
                                    }</p></label>
                                    
                                </div>
                                  
                                  <button id="${
                                    index + 150
                                  }" class="icon" onclick="deleteTask(${index})" ><span title="Eliminar" class="material-symbols-outlined">delete</span></button>
                                  <button id="${
                                    index + 200
                                  }" class="icon" onclick="setPriority(${index})" ><span title="Prioridad alta" class="material-symbols-outlined">priority_high</span></button>
                                </div>`
  );
  // Limpia el campo de introducción después de crear una nueva tarea.
  inputText.value = "";

  // Pinta las tareas en pantalla.
  tasksContainer.innerHTML = data.join("");

  // Cada vez que carga la página comprueba si el valor de "done" es "true" y le aplica el estilo.
  // También asigna el estado de la casilla checkbox que tenía cuando se cerró el navegador.
  datos.forEach((dato, index) => {
    // Animación al crear la tarea.
    if (dato.new === false) {
      document.getElementById(index).classList.add("animate__zoomIn");
      tasks[index].new = true;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTimeout(() => {
        document.getElementById(index).classList.remove("animate__zoomIn");
      }, 1000);
    }

    if (dato.done === true) {
      let indice = index + 100;
      document.getElementById(index).classList.add("task--done");
      document.getElementById(indice).checked = true;
    }
    if (dato.priority === "high") {
      let indice2 = index + 150;
      let indice3 = index + 200;
      document.getElementById(index).classList.add("priority--high");
      document.getElementById(indice2).classList.add("icon--priority");
      document.getElementById(indice3).classList.add("icon--priority");
    }
  });
};

// Elimina una tarea
window.deleteTask = (index) => {
  // En primer lugar aplicamos la animación.
  document.getElementById(index).classList.add("animate__zoomOut");

  // En segundo lugar  eliminamos la tarea pero esperamos medio segundo para que termine de ejecutarse la animación, por eso envolvemos las instrucciones en una función setTimeout.
  setTimeout(() => {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }, 500);
};

// Función que ordena "tasks" por el valor de la propiedad "priority".
const sort = (array) => {
  const tasks = array.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  });
  return tasks;
};

// Función que asigna prioridad a las tareas y a la vez las ordena.
window.setPriority = (index) => {
  let indice2 = index + 150;
  let indice3 = index + 200;
  tasks[index].priority === "low"
    ? (tasks[index].priority = "high")
    : (tasks[index].priority = "low");
  if (tasks[index].priority === "high") {
    document.getElementById(index).classList.add("priority--high");
    document.getElementById(indice2).classList.add("icon--priority");
    document.getElementById(indice3).classList.add("icon--priority");
  } else {
    document.getElementById(index).classList.remove("priority--high");
    document.getElementById(indice2).classList.remove("icon--priority");
    document.getElementById(indice3).classList.remove("icon--priority");
  }

  sort(tasks);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  setTimeout(() => {
    loadTasks();
  }, 400);
};

// Aplica el estilo cuando marcamos la casilla del checkbox, cambiamos el valor de la propiedad "done" a
// "true", y lo volvemos a "false" cuando la desactivamos.
window.done = (index) => {
  tasks[index].done === false
    ? (tasks[index].done = true)
    : (tasks[index].done = false);
  if (tasks[index].done === true) {
    document.getElementById(index).classList.add("task--done");
  } else {
    document.getElementById(index).classList.add("task--nodone");
    document.getElementById(index).classList.remove("task--done");
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
