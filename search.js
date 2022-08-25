export const search = (document.querySelector(
  ".container-search"
).innerHTML = /*html*/ `
  <div>
   <h3>Buscador núm. teléfono:</h3>
   <input type="file" class="input btn btn-secondary" onchange="readFile(this)" id="inputFile" >
   <p class="aviso" style="color:#DC3545">Necesitas seleccionar un archivo para poder iniciar la búsqueda.</p>
   <input type="text" class="form-control" onkeyup="searchNumber(value)" id="introduccion" placeholder="Introduce..." >
   <h5>Resultado de la búsqueda:</h5>
   <ul class="lista"></ul>
  </div>
`);

const phoneBook = [];

// Función encargada de cargar los datos provenientes del fichero json.
window.readFile = (input) => {
  document.querySelector(
    ".aviso"
  ).innerHTML = `<span style="color:#0D6EFD"> Archivo seleccionado.</span>`;
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);  // Convierte el fichero en texto.
  reader.onload = () => {
    let data = JSON.parse(reader.result);
    data.forEach((element) => {
      phoneBook.push(element);
    });
  };
  reader.onerror = () => {
    document.querySelector(
      ".lista"
    ).innerHTML = `Ha ocurrido el siguiente error: ${reader.error}`;
  };
};

// Función encargada de buscar coincidencias según el valor introducido en el input.
window.searchNumber = (value) => {
  if (value != "") {
    const phoneBookFilter = phoneBook.filter((element) =>
      element.nombre.toLowerCase().includes(value.toLowerCase())
    );

    const dataPhone = phoneBookFilter.map(
      (element) =>
        `<li>${element.nombre}: <strong>${element.numero}</strong> </li>`
    );
    document.querySelector(".lista").innerHTML = dataPhone.join(" ");
  } else {
    document.querySelector(
      ".lista"
    ).innerHTML = `<h5><strong>Sin resultados...</strong<</h5>`;
  }
};
