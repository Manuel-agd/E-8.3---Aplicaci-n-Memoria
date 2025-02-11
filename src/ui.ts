import { Tablero, Carta } from "./modelo";
import { esPartidaCompleta, inicializarJuego, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearCarta, sonPareja, voltearCarta } from "./motor";
import { actualizarIntentos } from "./main";

export const actualizarUIcarta = (divCarta: HTMLElement | null, carta: Carta) => {
    
    if (divCarta && divCarta instanceof HTMLDivElement) {
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
    } else {
        console.error("Error: divCarta no encontrada para la carta", carta);
    }
};

export const mostrarMensajeError = (mensaje: string) => {
    const mensajeError = document.createElement("div");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("mensaje-error");
    document.body.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
};

export const actualizarUITablero = (tablero: Tablero): void => {
    const contenedorCartas = document.getElementById("contenedorCartas");
    
    if (contenedorCartas) {
        contenedorCartas.innerHTML = "";
    }
    
    const contenedor = document.getElementById("contenedorCartas");
    if (contenedor && contenedor instanceof HTMLDivElement) {
        tablero.cartas.forEach((carta: Carta, index: number) => {
            const divCarta = document.createElement("div");
            divCarta.classList.add("carta", "dorso");
            divCarta.id = `carta-${index}`;

            divCarta.addEventListener("click", () => {
                eventoClickCarta(tablero, index, divCarta);
            });
            contenedor.appendChild(divCarta);
        });
    } else {
        console.error("Contenedor de cartas no encontrado");
    }
};

const eventoClickCarta = (tablero: Tablero, indice: number, divCarta: HTMLDivElement) => {
    if (sePuedeVoltearCarta(tablero, indice)) {
        voltearCarta(tablero, indice);
        actualizarUIcarta(divCarta, tablero.cartas[indice]);
        saberSiEsLaSegundaCarta(tablero);
    } else {
        console.log('no se puede voltear la carta');
    }
}

const saberSiEsLaSegundaCarta = (tablero: Tablero) => {
    const indiceCartaA = tablero.indiceCartaVolteadaA;
    const indiceCartaB = tablero.indiceCartaVolteadaB;

    if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
        
        sonPareja(indiceCartaA, indiceCartaB, tablero) ? esPareja(tablero, indiceCartaA, indiceCartaB) : noEsPareja(tablero, indiceCartaA, indiceCartaB);
    }
};

const esPareja = (tablero: Tablero, indiceCartaA: number, indiceCartaB: number) => {
    parejaEncontrada(indiceCartaA, indiceCartaB, tablero);

    if (esPartidaCompleta(tablero)) {
        console.log('partida completa');
    }
}

const noEsPareja = (tablero: Tablero, indiceCartaA: number, indiceCartaB: number) => {
    parejaNoEncontrada(tablero, indiceCartaA, indiceCartaB);
    setTimeout(() => {
        const divCartaA = document.getElementById(`carta-${indiceCartaA}`);
        const divCartaB = document.getElementById(`carta-${indiceCartaB}`);
        actualizarUIcarta(divCartaA, tablero.cartas[indiceCartaA]);
        actualizarUIcarta(divCartaB, tablero.cartas[indiceCartaB]);
    }, 1500);
    tablero.intentos += 1;
    actualizarIntentos(tablero.intentos);
}

export const iniciarYActualizarUI = (tablero: Tablero, actualizarIntentos: (intentos: number) => void): void => {
    inicializarJuego(tablero, actualizarIntentos);
    actualizarUITablero(tablero);
};
