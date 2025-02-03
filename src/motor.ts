import { Carta, Tablero } from "./modelo";
import { actualizarUIcarta, mostrarMensajeError, actualizarUITablero } from "./ui"

export const barajarCartas = (cartas: Carta[]): Carta[] => {
    for (let i = cartas.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [cartas[i],cartas[j]] = [cartas[j],cartas[i]];
    }
    return cartas;
  };

export const inicializarJuego = (tablero: Tablero, actualizarIntentos: (intentos: number) => void): void => {
    tablero.cartas = barajarCartas(tablero.cartas);
    tablero.estadoPartida = "ceroCartasVolteadas";
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.intentos = 0;

    tablero.cartas.forEach(carta => {
        carta.estaVolteada = false;
        carta.emparejada = false;
    });

    actualizarUITablero(tablero);
    actualizarIntentos(tablero.intentos);
    console.log("Juego Inicializado");
};

export const sePuedeVoltearCarta = (tablero: Tablero, indice: number): boolean => {
    if (indice < 0 || indice >= tablero.cartas.length) {
        console.log("indice fuera de rango");
        return false;
    }
    if (tablero.cartas[indice].estaVolteada) {
        console.log("La carta ya esta volteada");
        return false;
    }
    if (tablero.estadoPartida === "dosCartasVolteadas") {
        return false;
    }
    
    return true;
};

export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    if (
        indiceA < 0 || indiceA > tablero.cartas.length ||
        indiceB < 0 || indiceB > tablero.cartas.length
    ) {
        console.error ("Indices fuera de rango", indiceA , indiceB);
        return false;
    }
    return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada =  (indiceA: number, indiceB: number, tablero: Tablero): void => {
    tablero.cartas[indiceA].emparejada = true;
    tablero.cartas[indiceB].emparejada = true;
    tablero.estadoPartida = tablero.cartas.every(carta => carta.emparejada) ? "partidaCompleta" : "ceroCartasVolteadas";
};

export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
    setTimeout(() => {
        tablero.cartas[indiceA].estaVolteada = false;
        tablero.cartas[indiceB].estaVolteada = false;

        const divCartaA = document.querySelector(`#carta-${indiceA}`) as HTMLElement;
        const divCartaB = document.querySelector(`#carta-${indiceB}`) as HTMLElement;

        if(divCartaA) {
            actualizarUIcarta(divCartaA, tablero.cartas[indiceA]);
        } else {
            console.warn("Elemento DOM para la carta-${indiceA} no encontrado")
        }
        if(divCartaB) {actualizarUIcarta(divCartaB, tablero.cartas[indiceB]);
        } else {
            console.warn("Elemento DOM para la carta-${indiceB} no encontrado")
        }

        tablero.indiceCartaVolteadaA = undefined;
        tablero.indiceCartaVolteadaB = undefined;
        tablero.estadoPartida = "ceroCartasVolteadas";
    }, 1000)
};

export const voltearCarta = (tablero: Tablero, indice: number, actualizarIntentos: (intentos: number) => void): void => {
    console.log("intentando voltear la carta indice:", indice);
    console.log("Estado del tablero", tablero);
    console.log("Numero de cartas en el tablero", tablero.cartas.length);

    if (sePuedeVoltearCarta(tablero, indice)){
        console.log("volteando carta:", tablero.cartas[indice]);
        tablero.cartas[indice].estaVolteada = true;

        actualizarEstadoTablero(tablero, indice);
        
        if(tablero.estadoPartida === "dosCartasVolteadas") {
            tablero.intentos += 1;
            actualizarIntentos(tablero.intentos);

            const indiceA = tablero.indiceCartaVolteadaA!;
            const indiceB = tablero.indiceCartaVolteadaB!;

            if (sonPareja(indiceA, indiceB, tablero)) {
                parejaEncontrada(indiceA, indiceB, tablero);
                if (esPartidaCompleta(tablero)) {
                    tablero.estadoPartida = "partidaCompleta";
                    console.log("¡Partida Completa!");
                }
            } else {
                parejaNoEncontrada(tablero, indiceA, indiceB)
            }
        }
    } else {
        console.log("No puedes voltear esta carta");
        mostrarMensajeError("No puedes voltear esta carta");
    }
};

export const actualizarEstadoTablero = (tablero: Tablero, indice: number): void => {
    if(tablero.estadoPartida === "ceroCartasVolteadas") {
        tablero.estadoPartida = "unaCartaVolteada";
        tablero.indiceCartaVolteadaA = indice;
    } else if (tablero.estadoPartida === "unaCartaVolteada") {
        tablero.estadoPartida = "dosCartasVolteadas";
        tablero.indiceCartaVolteadaB = indice; 
    }

    if (tablero.estadoPartida === "dosCartasVolteadas") {
        const indiceA = tablero.indiceCartaVolteadaA!;
        const indiceB = tablero.indiceCartaVolteadaB!;

        //const divCartaA = document.querySelector(`[data-indice-id='${indiceA}']`) as HTMLElement;
        //const divCartaB = document.querySelector(`[data-indice-id='${indiceB}']`) as HTMLElement;

        if (sonPareja(indiceA, indiceB, tablero)) {
            parejaEncontrada(indiceA, indiceB, tablero);
        } else {
                parejaNoEncontrada(tablero, indiceA, indiceB);
        }
        //actualizarUIcarta(divCartaA, tablero.cartas[indiceA]);
        //actualizarUIcarta(divCartaB, tablero.cartas[indiceB]); ESTO PERTENECE A UI.ts
    }
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
    console.log("La partida se ha completado");
    return tablero.cartas.every(carta => carta.emparejada)
};
