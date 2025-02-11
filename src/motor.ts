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
    tablero.cartas[indiceA].estaVolteada = true;
    tablero.cartas[indiceB].estaVolteada = true;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.estadoPartida = "ceroCartasVolteadas";
};

export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
    setTimeout(() => {
    tablero.cartas[indiceA].emparejada = false;
    tablero.cartas[indiceB].emparejada = false;
    tablero.cartas[indiceA].estaVolteada = false;
    tablero.cartas[indiceB].estaVolteada = false;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.estadoPartida = "ceroCartasVolteadas";
    
    console.log("Volteando las cartas nuevamente");
    }, 1000);
};

export const voltearCarta = (tablero: Tablero, indice: number): void => {
    tablero.cartas[indice].estaVolteada = true;

    if (tablero.estadoPartida === 'ceroCartasVolteadas') {
        tablero.indiceCartaVolteadaA = indice;
        tablero.estadoPartida = 'unaCartaVolteada';
    } else if (tablero.estadoPartida === "unaCartaVolteada") {
        tablero.indiceCartaVolteadaB = indice;
        tablero.estadoPartida = "dosCartasVolteadas";
    }
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
    const completa = tablero.cartas.every(cartas => cartas.emparejada);
    if (completa) console.log("La partida se ha completado");
    return completa;
};
