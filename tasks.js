const tasksContainer = document.querySelector(".container-tasks");

export const task = (document.querySelector(
  ".container-form"
).innerHTML = /*html*/ `<label for="inputText" class="tarea fs-2">Nueva tarea:</label>
        <input id="inputText" onchange="newTask()" type="text" class="form-control" autofocus placeholder="Introduce el texto">`);

var tasksList = [];

const loadInitial = () => {
  // Limpia la pantalla antes de pintar los elementos.
  tasksContainer.innerHTML = " ";
  const datos = JSON.parse(localStorage.getItem("tasks"));

  // Comprueba si en localStorage hay datos grabados.
  if (datos != undefined) {
    const data = datos.map(
      (
        elemento,
        index
      ) => /*html*/ `<div id="${index}" class="task animate__animated">
                                <div class="form-check">
                                  <input onchange="done(${index})" value="true" class="form-check-input"          type="checkbox" id="${index + 100}">
                                    <label class="form-check-label" for="defaultCheck1">
                                    <p class="h5">${elemento.description}</p>
                                    </label>
                                </div>
                                  
                                  <button class="icon-trash" onclick="deleteTask(${index})" ><span class="material-symbols-outlined">delete</span></button>
                                </div>`
    );
    // Pinta las tareas en pantalla.
    tasksContainer.innerHTML = data.join("");

    // Aplica estilo según el valor de "state".
    datos.forEach((element, index) => {
      if (element.state === true) {
        let indice = index + 100;
        document.getElementById(index).classList.add("task--done");
        document.getElementById(indice).checked = true;
      }
    });
    // Asigna al array de objetos los datos obtenidos del localStorage, ya que al iniciar el navegador
    // el array está vacío.
    datos.forEach((elemento) => tasksList.push(elemento));
  }
};

loadInitial();

// Crea una tarea nueva, la graba en localStorage y después llama a la función "loadTasks" para que pinte
// los datos en pantalla.
window.newTask = () => {
  let description = inputText.value;
  let newTask = { description, state: false };
  tasksList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasksList));
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
                                  <input onchange="done(${index})" value="true" class="form-check-input"       type="checkbox" id="${index + 100}">
                                    <label class="form-check-label" for="defaultCheck1"> <p class="h5">${
                                      elemento.description
                                    }</p></label>
                                    
                                </div>
                                  
                                  <button class="icon-trash" onclick="deleteTask(${index})" ><span class="material-symbols-outlined">delete</span></button>
                                </div>`
  );
  // Limpia el campo de introducción después de crear una nueva tarea.
  inputText.value = "";

  // Pinta las tareas en pantalla.
  tasksContainer.innerHTML = data.join("");

  // Cada vez que carga la página comprueba si el valor de "state" es "true" y le aplica el estilo.
  // También deja la el estado de la casilla checkbox que tenía cuando se cerró el navegador. 
  datos.forEach((element, index) => {
    if (element.state === true) {
      let indice = index + 100;
      document.getElementById(index).classList.add("task--done");
      document.getElementById(indice).checked = true;
    }
  });
};

// Elimina una tarea
window.deleteTask = (index) => {
  // En primer lugar aplicamos la animación.
  document.getElementById(index).classList.add("animate__zoomOut");
  // En segundo lugar  eliminamos la tarea pero esperamos medio segundo para que termine de ejecutarse la animación.
  setTimeout(() => {
    tasksList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksList));
    loadTasks();
  }, 500);
};

// Aplica el estilo cuando marcamos la casilla del checkbox si el valor de la propiedad "state" es
// "true", y lo volvemos a "false" cuando la desactivamos.
window.done = (index) => {
  tasksList[index].state === false
    ? (tasksList[index].state = true)
    : (tasksList[index].state = false);
  if (tasksList[index].state === true) {
    document.getElementById(index).classList.add("task--done");
  } else {
    document.getElementById(index).classList.remove("task--done");
  }
  localStorage.setItem("tasks", JSON.stringify(tasksList));
};
