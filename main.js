import "./style.css";
import "./modal.css";
import { obtenerDatos } from "./fetch";

const btn = document.querySelector(".modal__close");
const modal = document.querySelector(".modal");
const input = document.querySelector(".modal__input");

// Carga de datos inicial.
const cargaInicial = () => {
  try {
    // Se comprueba si hay datos grabados en la "localStorage", en caso afirmativo se cargan los datos y en caso
    // contrario se muestra el modal para introducir el nombre de la población.
    let ciudad = JSON.parse(localStorage.getItem("city"));
    obtenerDatos(ciudad.nombre);
    setInterval(obtenerDatos, 300000, ciudad.nombre);
  } catch (error) {
    modal.classList.add("modal--show");
  }
};

cargaInicial();

// Mostramos el modal para elegir una nueva población.
window.changeCity = () => {
  modal.classList.add("modal--show");
};

// Carga de datos con el nuevo nombre de la población y cierre del modal.
btn.addEventListener("click", () => {
  let valor = input.value;
  let ciudad = { nombre: valor };
  localStorage.setItem("city", JSON.stringify(ciudad));
  let poblacion = JSON.parse(localStorage.getItem("city"));
  if (valor != "" && valor != null) {
    obtenerDatos(poblacion.nombre);
    setInterval(obtenerDatos, 300000, poblacion.nombre);
    modal.classList.remove("modal--show");
  } else {
    alert("Campo obligatorio");
  }
  input.value = "";
});
