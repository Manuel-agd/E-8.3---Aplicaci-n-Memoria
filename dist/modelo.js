export const infoCartas = [
    { idFoto: 1, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png" },
    { idFoto: 2, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png" },
    { idFoto: 3, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png" },
    { idFoto: 4, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/4.png" },
    { idFoto: 5, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/5.png" },
    { idFoto: 6, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png" },
];
export const crearCartaInicial = (idFoto, imagen) => ({
    idFoto,
    imagen,
    estaVolteada: false,
    emparejada: false,
});
export const coleccionInicialCartas = (infoCartas) => {
    return infoCartas.reduce((acc, carta) => {
        acc.push(crearCartaInicial(carta.idFoto, carta.imagen));
        acc.push(crearCartaInicial(carta.idFoto, carta.imagen));
        return acc;
    }, []);
};
export let cartas = coleccionInicialCartas(infoCartas);
export const reiniciarTablero = () => ({
    cartas: coleccionInicialCartas(infoCartas),
    estadoPartida: "ceroCartasVolteadas"
});
export let tablero = reiniciarTablero();
//# sourceMappingURL=modelo.js.map