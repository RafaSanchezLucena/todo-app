const div = document.querySelector(".app");
const modal = document.querySelector(".modal");


const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "46b09705b0msh419e77df9426930p19b7e4jsn2eb1d4271df5",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export const obtenerDatos = async (city) => {
  try {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`,
      OPTIONS
    );
    const data = await response.json();
    // Declaración de variables con los datos obtenidos.
    let { current, location } = data;
    let {
      condition,
      humidity,
      temp_c,
      precip_in,
      feelslike_c,
    } = current;
    let { region, country} = location;
    let { icon } = condition;

    //  Pintamos los datos obtenidos en pantalla.
    div.innerHTML = /*html*/ `<div class="weather">
                      <div class="header">
                      <span class="poblacion">${city}</span>
                      <button  title="Elige otra población." type="button" id="icono" onclick="changeCity()" class="icon"><span class="material-symbols-outlined"> settings </span></button><br>

                      <span class="region">${region}</span>
                      <span class="country">(${country})</span>
                      <br></div>
                      <span><strong>Temp:</strong> ${temp_c}º,</span>
                      <span><strong>Sensación:</strong> ${feelslike_c}º</span><br>
                      <span><strong>Humedad:</strong> ${humidity}%,</span>
                      <span><strong>Lluvia hoy:</strong> ${precip_in}mm</span><br>
                      <img src="${icon}"/>                   
                    </div>
    `;
  } catch (error) {
    modal.classList.add("modal--show");
  }
};
