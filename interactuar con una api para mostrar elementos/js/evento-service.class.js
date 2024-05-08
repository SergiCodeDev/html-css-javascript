"use strict";

import { SERVER_URL } from "./constants.js";
import Http from "./http.class.js";

/* class Evento {
    // Completa la clase con su constructor y métodos
} */

export default class EventoService {
    constructor() {
        this.http = new Http();
    }

    async getEventos() {
        try {
            const response = await this.http.get(SERVER_URL);
            return response.eventos;
        } catch (error) {
            console.error(error)
            return "error"
        }
    }

    async post(evento) {
        try {
            const response = await this.http.post(SERVER_URL, evento);
            return response.evento;
        } catch (error) {
            console.error(error)
            return "error"
        }
    }

    async delete(idEvento) {
        try {
            /* const url = `${SERVER_URL}${idEvento}`; */
            const response = await this.http.delete(`${SERVER_URL}${idEvento}`);
            return response.id;
            
        } catch (error) {
            console.error(error)
            return "error"
        }

    }
}