export const barajarCartas = (cartas) => {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
};
export const sePuedeVoltearCarta = (tablero, indice) => {
    const carta = tablero.cartas[indice];
    return (!carta.estaVolteada && !carta.emparejada && (tablero.estadoPartida === "ceroCartasVolteadas" || tablero.estadoPartida === "unaCartaVolteada"));
};
export const voltearCarta = (tablero, indice) => {
    if (sePuedeVoltearCarta(tablero, indice)) {
        tablero.cartas[indice].estaVolteada = true;
        if (tablero.estadoPartida === "ceroCartasVolteadas") {
            tablero.estadoPartida = "unaCartaVolteada";
            tablero.indiceCartaVolteadaA = indice;
        }
        else if (tablero.estadoPartida === "unaCartaVolteada") {
            tablero.estadoPartida = "dosCartasVolteadas";
            tablero.indiceCartaVolteadaB = indice;
        }
    }
};
export const sonPareja = (indiceA, indiceB, tablero) => {
    return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};
export const parejaEncontrada = (indiceA, indiceB, tablero) => {
    tablero.cartas[indiceA].emparejada = true;
    tablero.cartas[indiceB].emparejada = true;
    tablero.estadoPartida = tablero.cartas.every(carta => carta.emparejada) ? "partidaCompleta" : "ceroCartasVolteadas";
};
export const parejaNoEncontrada = (tablero, indiceA, indiceB) => {
    setTimeout(() => {
        tablero.cartas[indiceA].estaVolteada = false;
        tablero.cartas[indiceB].estaVolteada = false;
        tablero.estadoPartida = "ceroCartasVolteadas";
    }, 2000);
};
export const esPartidaCompleta = (tablero) => {
    return tablero.cartas.every(carta => carta.emparejada);
};
export const iniciarPartida = (tablero) => {
    tablero.cartas = barajarCartas(tablero.cartas);
    tablero.estadoPartida = "ceroCartasVolteadas";
    tablero.cartas.forEach(carta => {
        carta.estaVolteada = false;
        carta.emparejada = false;
    });
};
//# sourceMappingURL=motor.js.map