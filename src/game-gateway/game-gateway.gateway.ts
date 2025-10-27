import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameGatewayService } from './game-gateway.service';
import { start } from 'repl';

@WebSocketGateway(4000, { namespace: 'game-gateway', cors: "localhost:3000", credentials: true })
export class GameGatewayGateway {
  @WebSocketServer()
  server!: Server

  //metodo para conectar al servidor
  handleConnection(socket: Socket) {
    console.log("jugador conectado: ", socket.id);
  }
  //metodo para desconectar al servidor
  handleDisconnect(socket: Socket) {
    console.log("jugador desconectado: ", socket.id);
  }

  constructor(private readonly gameGatewayService: GameGatewayService) { }
  //metodo para unirse a la sala
  @SubscribeMessage("joinRoom")
  async joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: { room: string, nombreJugador: string }) {
    try {
      //verificamos que la sala exista
      const { access, jugadorId, jugadorNombre, nombreSala } = await this.gameGatewayService.veryfyCodigo(data.room, data.nombreJugador);
      //si la sala no existe enviamos un error
      if (!access) {
        return socket.emit("error", { code: "ROOM_NOT_FOUND", message: "codigo incorrecto o sala inexistente" })
      }
      //si la sala existe lo unimos
      socket.join(data.room);
      //guardamos la sala en el socket
      socket.data.room = data.room as string;
      socket.data.jugadorId = jugadorId as number;
      //emitimos al jugador que se ha unido
      this.server.to(data.room).emit("jugador_unido", { nombreJugador: jugadorNombre, nombreSala: nombreSala });
    } catch (error) {
      //mostramos el error
      console.log(error);
      socket.emit("error", "codigo incorrecto o sala inexistente")
    }
  }

  //metodo para iniciar el juego
  @SubscribeMessage("start_Game")
  async startGame(@ConnectedSocket() socket: Socket) {
    //Almacenamos el codigo de la sala
    const data = {
      room: socket.data.room,
    }
    //filtramos las preguntas
    const preguntas = await this.gameGatewayService.startGame(data.room);
    //si la sala no existe enviamos un error
    if (!preguntas.access) {
      return socket.emit("error", { code: "ROOM_NOT_FOUND", message: " sala inexistente o pregunta inexistente" })
    }
    //enviamos las preguntas
    this.server.to(data.room).emit("preguntas", preguntas.preguntas);
  }

  //metodo para responder a las preguntas
  @SubscribeMessage("responder")
  async responder(@ConnectedSocket() socket: Socket, @MessageBody() respuesta: { respuesta: boolean, idPregunta: number }) {
    try {
      const datos = {
        room: socket.data.room,
        jugadorId: socket.data.jugadorId,
        respuesta: respuesta.respuesta,
        idPregunta: respuesta.idPregunta,
      }

      const responder = await this.gameGatewayService.responderPregunta(datos);
      if (!responder.access) {
        return socket.emit("error", { code: "ROOM_NOT_FOUND", message: " sala inexistente o pregunta inexistente" })
      }

      socket.emit("la respuesta a la pregunta era", { correcta: responder.correcta });
    }
    catch (error) {
      //mostramos el error
      console.log(error);
      socket.emit("error", "sala inexistente o pregunta inexistente")
    }
  }


}
