import { Carta, Tablero } from "./modelo";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [{ ...cartas[i] }, { ...cartas[j] }] = [cartas[j], cartas[i]];
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
    if (tablero.cartas[indice].emparejada) {
        console.log("La carta ya esta emparejada");
        return false;
    }
    if (tablero.estadoPartida === "dosCartasVolteadas") {
        return false;
    }

    return true;
};

export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (indiceA: number, indiceB: number, tablero: Tablero): void => {
    tablero.cartas[indiceA].emparejada = true;
    tablero.cartas[indiceB].emparejada = true;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.estadoPartida = "ceroCartasVolteadas";
};

export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
    
        console.log("Volteando las cartas incorrectas");
    
        tablero.cartas[indiceA].estaVolteada = false;
        tablero.cartas[indiceB].estaVolteada = false;
        tablero.indiceCartaVolteadaA = undefined;
        tablero.indiceCartaVolteadaB = undefined;
        tablero.estadoPartida = "ceroCartasVolteadas";

        console.log("Volteando las cartas nuevamente");

    // setTimeout(() => {
    //     tablero.cartas[indiceA].estaVolteada = false;
    //     tablero.cartas[indiceB].estaVolteada = false;

    //     const divCartaA = document.querySelector(`#carta-${indiceA}`) as HTMLElement;
    //     const divCartaB = document.querySelector(`#carta-${indiceB}`) as HTMLElement;

    //     if (divCartaA) {
    //         actualizarUIcarta(divCartaA, tablero.cartas[indiceA]);
    //     } else {
    //         console.warn("Elemento DOM para la carta-${indiceA} no encontrado")
    //     }
    //     if (divCartaB) {
    //         actualizarUIcarta(divCartaB, tablero.cartas[indiceB]);
    //     } else {
    //         console.warn("Elemento DOM para la carta-${indiceB} no encontrado")
    //     }

    //     tablero.indiceCartaVolteadaA = undefined;
    //     tablero.indiceCartaVolteadaB = undefined;
    //     tablero.estadoPartida = "ceroCartasVolteadas";
    // }, 1000)
};

export const voltearCarta = (tablero: Tablero, indice: number) : void => {
    /*if (!sePuedeVoltearCarta(tablero, indice)) {
        console.log("No puedes voltear esta carta");
        return;
    }*/ //Esto deberia estar en UI

    tablero.cartas[indice].estaVolteada = true;

    if (tablero.estadoPartida === 'ceroCartasVolteadas') {
        tablero.indiceCartaVolteadaA = indice;
        tablero.estadoPartida = 'unaCartaVolteada';
    } else if (tablero.estadoPartida === "unaCartaVolteada") {
        tablero.indiceCartaVolteadaB = indice;
        tablero.estadoPartida = "dosCartasVolteadas";
       // actualizarEstadoTablero(tablero, actualizarIntentos);
    }
};

export const actualizarEstadoTablero = (tablero: Tablero, actualizarIntentos: (intentos: number) => void): void => {
    /*if (tablero.estadoPartida === "ceroCartasVolteadas") {
        tablero.estadoPartida = "unaCartaVolteada";
        tablero.indiceCartaVolteadaA = indice;
    } else if (tablero.estadoPartida === "unaCartaVolteada") {
        tablero.estadoPartida = "dosCartasVolteadas";
        tablero.indiceCartaVolteadaB = indice;
    }*/ 

    if (tablero.estadoPartida === "dosCartasVolteadas") return;
        const indiceA = tablero.indiceCartaVolteadaA!;
        const indiceB = tablero.indiceCartaVolteadaB!;

        tablero.intentos += 1;
        actualizarIntentos(tablero.intentos);

        if (sonPareja(indiceA, indiceB, tablero)) {
            parejaEncontrada(indiceA, indiceB, tablero);
        if (esPartidaCompleta(tablero)) {
            tablero.estadoPartida = "partidaCompleta";
            console.log("¡Partida Completa!");
            }
        } else {
            parejaNoEncontrada(tablero, indiceA, indiceB);
        }
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
    const completa = tablero.cartas.every(cartas => cartas.emparejada);
    if (completa) console.log("La partida se ha completado");
    return completa;
};
