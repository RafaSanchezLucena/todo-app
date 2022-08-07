const tasks = document.querySelector(".container-tasks");

export const task = (document.querySelector(
  ".container-form"
).innerHTML = /*html*/ `<label for="inputText" class="tarea fs-2">Nueva tarea:</label>
        <input id="inputText" type="text" class="form-control" autofocus placeholder="Introduce el texto">
        <button type="button" id="botonNueva" onclick="botonNueva()" class="btn btn-primary">Grabar</button>`);

const tasksObject = [{ description: "", done: false }];

window.botonNueva = () => {
  tasks.innerHTML = /*html*/ `<div class="task">
  <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                  Hecho
                                </label>
                                </div>
                                <p>${inputText.value}</p>
                                <button onclick="deleteTask()" class="btn btn-danger">Eliminar</button>
                                <button onclick="editTask()" class="btn btn-success">Editar</button>
                              </div>`;
  inputText.value = "";
};

window.deleteTask = () => {
  alert("Tarea eliminada");
};

window.editTask = () => {
  alert("Editar tarea");
};
