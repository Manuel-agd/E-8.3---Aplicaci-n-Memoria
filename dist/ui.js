import { tablero } from "./modelo";
import { sePuedeVoltearCarta, voltearCarta, sonPareja, parejaEncontrada, parejaNoEncontrada } from "./motor";
const contenedor = document.getElementById("contenedorCartas");
if (!contenedor) {
    console.error("el contenedor de cartas no fue encontrado en el DOM.");
}
;
//Prueba para verificar que el contenedor de cartas se esta generando con las cartas
if (contenedor) {
    const divPrueba = document.createElement("div");
    divPrueba.textContent = "Carta de prueba";
    divPrueba.style.border = "1px solid red";
    divPrueba.style.width = "100px";
    divPrueba.style.height = "150px";
    contenedor.appendChild(divPrueba);
}
;
export const actualizarUIcarta = (divCarta, carta) => {
    if (carta.estaVolteada) {
        divCarta.style.backgroundImage = `url(${carta.imagen})`;
        divCarta.classList.remove("dorso");
    }
    else {
        divCarta.style.backgroundImage = "";
        divCarta.classList.add("dorso");
    }
};
export const actualizarUITablero = (tablero) => {
    const contenedorCartas = document.getElementById("contenedorCartas");
    if (!contenedorCartas) {
        console.error("Contendor de cartas no encontrado");
        return;
    }
    contenedorCartas.innerHTML = "";
};
tablero.cartas.forEach((carta, index) => {
    const divCarta = document.createElement("div");
    divCarta.classList.add("carta", "dorso");
    divCarta.setAttribute("data-indice-id", index.toString());
    divCarta.addEventListener("click", () => {
        if (sePuedeVoltearCarta(tablero, index)) {
            voltearCarta(tablero, index);
            actualizarUIcarta(divCarta, tablero.cartas[index]);
        }
    });
    contenedor?.appendChild(divCarta);
});
if (tablero.estadoPartida === "dosCartasVolteadas") {
    const indiceA = tablero.indiceCartaVolteadaA;
    const indiceB = tablero.indiceCartaVolteadaB;
    const divCartaA = document.querySelector(`[data-indice-id='${indiceA}']`);
    const divCartaB = document.querySelector(`[data-indice-id='${indiceB}']`);
    if (sonPareja(indiceA, indiceB, tablero)) {
        parejaEncontrada(indiceA, indiceB, tablero);
    }
    else {
        parejaNoEncontrada(tablero, indiceA, indiceB);
    }
    actualizarUIcarta(divCartaA, tablero.cartas[indiceA]);
    actualizarUIcarta(divCartaB, tablero.cartas[indiceB]);
}
;
//# sourceMappingURL=ui.js.map