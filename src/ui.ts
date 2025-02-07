import { Tablero, Carta, tablero } from "./modelo";
import { esPartidaCompleta, inicializarJuego, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearCarta, sonPareja, voltearCarta } from "./motor";
import { actualizarIntentos } from "./main";

const contenedor = document.getElementById("contenedorCartas");
if (!contenedor) {
    console.error("el contenedor de cartas no fue encontrado en el DOM.")
};

export const actualizarUIcarta = (divCarta: HTMLElement | null, carta: Carta) => {
    if (!divCarta) {
        console.error("Error: divCarta no encontrada para la carta", carta);
        return;
    }
    console.log("Actualizando carta", carta);

    divCarta.classList.remove("dorso", "volteada", "emparejada");

    if (carta.emparejada) {
        divCarta.style.backgroundImage = `url(${carta.imagen})`;
        divCarta.classList.add("emparejada");
    } else if (carta.estaVolteada) {
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

        divCarta.addEventListener("click", () => {
            if (sePuedeVoltearCarta(tablero, index)) {
                voltearCarta(tablero, index);
                console.log(tablero);
                actualizarUIcarta(divCarta, tablero.cartas[index]);
                saberSiEsLaSegundaCarta();
            } else {
                console.log('no se puede voltear la carta');
            }
            // console.log(`Carta clickeada: índice ${index}`);
            // if (tablero.estadoPartida !== "partidaCompleta") {
            //     if(sePuedeVoltearCarta(tablero, index)) {
            //         voltearCarta(tablero, index,actualizarIntentos);
            //         actualizarUIcarta(divCarta, tablero.cartas[index])
            //     }
            // }
        });
        contenedor?.appendChild(divCarta);
    });
};

const saberSiEsLaSegundaCarta = () => {
    const indiceCartaA = tablero.indiceCartaVolteadaA;
    const indiceCartaB = tablero.indiceCartaVolteadaB;
    console.log(indiceCartaB, indiceCartaA);
    if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
        if (sonPareja(indiceCartaA, indiceCartaB, tablero)) {
            parejaEncontrada(indiceCartaA, indiceCartaB, tablero);

            if (esPartidaCompleta(tablero)) {
                console.log('partida completa');
            }
        } else {
            console.log("Al menos llega a aqui");
            parejaNoEncontrada(tablero, indiceCartaA, indiceCartaB);
                setTimeout(() => {
                const divCartaA = document.getElementById(`carta-${indiceCartaA}`);
                const divCartaB = document.getElementById(`carta-${indiceCartaB}`);
                actualizarUIcarta(divCartaA, tablero.cartas[indiceCartaA]);
                actualizarUIcarta(divCartaB, tablero.cartas[indiceCartaB]);
                actualizarUITablero(tablero);
            }, 1500);
        }
    }
};

export const iniciarYActualizarUI = (tablero: Tablero, actualizarIntentos:(intentos: number) => void): void => {
    inicializarJuego(tablero, actualizarIntentos);
    actualizarUITablero(tablero);
};
