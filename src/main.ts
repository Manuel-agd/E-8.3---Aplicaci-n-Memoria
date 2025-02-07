import { coleccionInicialCartas, reiniciarTablero, infoCartas, Tablero, Carta, } from "./modelo";
import{ iniciarYActualizarUI } from "./ui"
import "./style.css"; 

const btnNuevaPartida = document.getElementById("btnNuevaPartida");

export let intentos = 0;

export const actualizarIntentos = (intentos: number): void => {
    const contador = document.getElementById("contadorIntentos");
    if (contador) {
        contador.textContent = `Intentos: ${intentos}`;
    }
};

const cartasIniciales: Carta[] = coleccionInicialCartas(infoCartas);
const tableroJuego: Tablero = reiniciarTablero();

btnNuevaPartida?.addEventListener("click", () =>{
    iniciarYActualizarUI(tableroJuego, actualizarIntentos);
});

document.addEventListener("DOMContentLoaded", () => {
    iniciarYActualizarUI(tableroJuego, actualizarIntentos); 
});

