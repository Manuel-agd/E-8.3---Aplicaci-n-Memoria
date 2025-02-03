import { tablero, coleccionInicialCartas, reiniciarTablero, infoCartas } from "./modelo";
import { barajarCartas } from "./motor";
import "./style.css";
const btnNuevaPartida = document.getElementById("btnNuevaPartida");
const contenedorCartas = document.getElementById("contenedorCartas");
const inicializarJuego = () => {
    tablero.cartas = barajarCartas(tablero.cartas);
    contenedorCartas.innerHTML = "";
    tablero.cartas.forEach((carta, index) => {
        const divCarta = document.createElement("div");
        divCarta.classList.add("carta", "dorso");
        divCarta.setAttribute("data-indice-id", index.toString());
        divCarta.addEventListener("click", () => {
            if (tablero.estadoPartida !== "partidaCompleta") {
                console.log(`carta clikeada: ${index}`);
            }
        });
        contenedorCartas.appendChild(divCarta);
    });
    console.log("Juego Inicializado");
};
btnNuevaPartida?.addEventListener("click", () => {
    inicializarJuego();
});
document.addEventListener("DOMContentLoaded", () => {
    inicializarJuego();
});
const cartasIniciales = coleccionInicialCartas(infoCartas);
const tableroJuego = reiniciarTablero();
//# sourceMappingURL=main.js.map