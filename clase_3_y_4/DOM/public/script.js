const titulo = document.querySelector("h1"); // Selecciona el primer h1
const parrafo = document.getElementById("identificador-del-parrafo"); // Selecciona por ID
const boton = document.querySelector("#boton"); // Selecciona por ID con querySelector

// Modificar el contenido de un elemento:

titulo.textContent = "Nuevo título";
parrafo.innerHTML = "Este es un <strong>nuevo</strong> párrafo."; // Permite agregar HTML

// Modificar estilos CSS:
parrafo.style.color = "blue";
boton.style.backgroundColor = "red";

// Agregar un evento a un elemento:

boton.addEventListener("click", () => {
  alert("¡Botón presionado!");

  let verde;
  setInterval(() => {
    verde = !verde;
    boton.style.backgroundColor = !verde ? "red" : "green";
  }, 200);
});
