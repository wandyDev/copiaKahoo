import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class GameGatewayService {
  constructor(private readonly prisma: PrismaService) { }

  //unirse a la sala
  async veryfyCodigo(codigo: string, nombreJugador: string) {
    //verificamos que la sala exista
    const verify = await this.prisma.sala.findUnique({ where: { codigo: codigo } })
    //si la sala no existe enviamos un error
    if (!verify) {
      return { access: false }
    }
    //si la sala existe lo unimos
    const jugadores = await this.prisma.jugador.create({
      data: {
        nombre: nombreJugador,
        salaId: verify.id
      }
    })
    //guardamos la sala en el socket
    return { access: true, nombreSala: verify.nombre, jugadorId: jugadores.id, jugadorNombre: jugadores.nombre }
  }

  //responder la pregunta
  async responderPregunta(datos: { room: string, jugadorId: number, respuesta: boolean, idPregunta: number }) {
    //verificamos que la sala exista
    const verify = await this.prisma.sala.findUnique({ where: { codigo: datos.room } })
    // si la sala no existe enviamos un error
    if (!verify) {
      return { access: false }
    }
    //verificamos que el jugador exista
    const jugador = await this.prisma.jugador.findUnique({ where: { id: datos.jugadorId } })
    //si el jugador no existe enviamos un error
    if (!jugador) {
      return { access: false }
    }
    //verificamos que la pregunta exista
    const pregunta = await this.prisma.pregunta.findUnique({ where: { id: datos.idPregunta } })
    //si la pregunta no existe enviamos un error
    if (!pregunta) {
      return { access: false }
    }
    //creamos la respuesta
    await this.prisma.respuesta.create({
      data: {
        jugadorId: jugador.id,
        preguntaId: pregunta.id,
        respuesta: datos.respuesta,
        correcta: pregunta.preguntaCorrecta
      }
    })

    //damos acceso
    return {
      access: true,
      correcta: pregunta.preguntaCorrecta
    }
  }

  async startGame(codigo: string) {
    //verificamos que la sala exista
    const verify = await this.prisma.sala.findUnique({ where: { codigo: codigo } })
    // si la sala no existe enviamos un error
    if (!verify) {
      return { access: false }
    }
    const preguntas = await this.prisma.pregunta.findMany({ where: { salaId: verify.id } })

    if (preguntas.length === 0) {
      return { access: false }
    }

    const preguntasFiltradas = preguntas.map(pregunta => {
      const texto = {
        id: pregunta.id,
        pregunta: pregunta.texto
      }

      return texto
    })
    //damos acceso
    return {
      access: true,
      preguntas: preguntasFiltradas,
      total: preguntasFiltradas.length,

    }
  }

}
