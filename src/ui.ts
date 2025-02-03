import {Tablero, Carta} from "./modelo";
import {sePuedeVoltearCarta, voltearCarta } from "./motor";
import { actualizarIntentos } from "./main";

const contenedor = document.getElementById("contenedorCartas");
if(!contenedor){
    console.error("el contenedor de cartas no fue encontrado en el DOM.")
};

 /*Prueba para verificar que el contenedor de cartas se esta generando con las cartas

if (contenedor) {
    const divPrueba = document.createElement("div");
    divPrueba.textContent = "Carta de prueba";
    divPrueba.style.border = "1px solid red";
    divPrueba.style.width = "100px";
    divPrueba.style.height = "150px";
    contenedor.appendChild(divPrueba);
};
*/
export const actualizarUIcarta = (divCarta: HTMLElement | null, carta: Carta) => {
    if(!divCarta) {
        console.error("Error: divCarta no encontrada para la carta", carta);
        return;
    }
    console.log("Actualizando carta", carta);

    divCarta.classList.remove ("dorso", "volteada", "emparejada");

    if(carta.emparejada){
        divCarta.style.backgroundImage = `url(${carta.imagen})`;
        divCarta.classList.add("emparejada");
    } else if(carta.estaVolteada){
        divCarta.style.backgroundImage = `url(${carta.imagen})`;
        divCarta.classList.add("volteada");
    } else {
        divCarta.style.backgroundImage = "";
        divCarta.classList.add("dorso");
    }
};

export const mostrarMensajeError = (mensaje: string) => {
    const mensajeError = document.createElement("div");
        mensajeError.textContent = mensaje;
        mensajeError?.classList.add("mensaje-error");
        document.body.appendChild(mensajeError);
        setTimeout(() => {
            mensajeError?.remove();
        }, 2000);
};

export const actualizarUITablero = (tablero: Tablero): void => {
    const contenedorCartas = document.getElementById("contenedorCartas");
    if (!contenedorCartas) {
        console.error("Contendor de cartas no encontrado");
        return;
    }
    contenedorCartas.innerHTML = "";

tablero.cartas.forEach((carta: Carta, index: number) => {
    const divCarta = document.createElement("div");
    divCarta.classList.add("carta", "dorso");
    divCarta.id = `carta-${index}`;

    divCarta.addEventListener("click",() => {
        console.log(`Carta clickeada: índice ${index}`);
        if (tablero.estadoPartida !== "partidaCompleta") {
            if(sePuedeVoltearCarta(tablero, index)) {
                voltearCarta(tablero, index,actualizarIntentos);
                actualizarUIcarta(divCarta, tablero.cartas[index])
            }
        }
    });
        contenedor?.appendChild(divCarta);
    });
};
