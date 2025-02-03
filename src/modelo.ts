export interface Carta {
    idFoto: number;
    imagen: string;
    estaVolteada: boolean;
    emparejada: boolean;
}

export interface InfoCarta {
    idFoto: number;
    imagen: string;
}

export const infoCartas: InfoCarta[] = [
{ idFoto: 1, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png"},
{ idFoto: 2, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png"},
{ idFoto: 3, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png"},
{ idFoto: 4, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/4.png"},
{ idFoto: 5, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/5.png"},
{ idFoto: 6, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png"},
];

export const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
    idFoto,
    imagen,
    estaVolteada: false,
    emparejada: false,
});

export const coleccionInicialCartas = (infoCartas: InfoCarta[]): Carta[] => {
    return infoCartas.reduce<Carta[]>((acc, carta) => {
        acc.push(crearCartaInicial(carta.idFoto, carta.imagen));
        acc.push(crearCartaInicial(carta.idFoto, carta.imagen));
        return acc;
    }, []);
};

export type EstadoPartida = 
|"partidaNoIniciada" 
| "ceroCartasVolteadas" 
| "unaCartaVolteada" 
| "dosCartasVolteadas" 
| "partidaCompleta";

export interface Tablero {
    cartas: Carta[];
    estadoPartida: EstadoPartida;
    indiceCartaVolteadaA?: number;
    indiceCartaVolteadaB?: number;
    intentos: number;
}

export let cartas:Carta[] = coleccionInicialCartas(infoCartas);

export const reiniciarTablero = (): Tablero => ({
    cartas: coleccionInicialCartas(infoCartas),
    estadoPartida: "ceroCartasVolteadas",
    indiceCartaVolteadaA: undefined,
    indiceCartaVolteadaB: undefined,
    intentos: 0,
});

export let tablero: Tablero = reiniciarTablero();
