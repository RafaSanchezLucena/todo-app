export const search = (document.querySelector(
  ".container-search"
).innerHTML = /*html*/ `
  <div>
   <h3><strong>Busca:</strong></h3>
   <input type="file" class="input btn btn-primary" onchange="readFile(this)" id="inputFile" >
   <p class="aviso" style="color:#DC3545">Archivo de datos requerido.</p>
   <input type="text" class="form-control" onkeyup="searchNumber(value)" id="introduccion" placeholder="Introduce los datos..." >
   <h5><strong>Resultado de la búsqueda:</strong></h5>
   <ul class="lista"></ul>
  </div>
`);

const phoneBook = [];

// Función encargada de cargar los datos provenientes del fichero json.
window.readFile = (input) => {
  document.querySelector(
    ".aviso"
  ).innerHTML = " ";
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file); // Convierte el fichero en texto.
  reader.onload = () => {
    let data = JSON.parse(reader.result);
    data.forEach((element) => {
      phoneBook.push(element);
    });
  };
  reader.onerror = () => {
    document.querySelector(
      ".lista"
    ).innerHTML = /*html*/ `Ha ocurrido el siguiente error: ${reader.error}`;
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
    ).innerHTML = /*html*/ `<h5>Sin resultados...</h5>`;
  }
};
