import { coleccionInicialCartas, reiniciarTablero, infoCartas, Tablero, Carta, } from "./modelo";
import { inicializarJuego } from "./motor";
import "./style.css"; 

const btnNuevaPartida = document.getElementById("btnNuevaPartida");
const contenedorCartas = document.getElementById("contenedorCartas");

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
    inicializarJuego(tableroJuego, actualizarIntentos);
});

document.addEventListener("DOMContentLoaded", () => {
    inicializarJuego(tableroJuego, actualizarIntentos); 

    /*Pruebas con indices validos e invalidos

    console.log("Prueba con indices validos");
    voltearCarta(tableroJuego, 0, actualizarIntentos);

    console.log("Prueba con indices invalidos");
    voltearCarta(tableroJuego, -1, actualizarIntentos);

    console.log("prueba con indice igual a la longitud del array");
    voltearCarta(tableroJuego, 12, actualizarIntentos);

    console.log("Prueba con indice mayor a la longitud del array");
    voltearCarta(tableroJuego, 13, actualizarIntentos); */

});

