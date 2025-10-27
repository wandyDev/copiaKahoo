import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';
@Injectable()
export class SalasService {
  //injectar prisma
  constructor(private readonly prisma: PrismaService) { }

  //crear sala y preguntas
  async create(createSalaDto: CreateSalaDto) {
    const { nombre, preguntas } = createSalaDto;
    const codigo = randomBytes(4).toString('hex');
    //verificar que la sala no exista
    const verifySala = await this.prisma.sala.findUnique({ where: { codigo: codigo } })
    if (verifySala) {
      return { positive: false }
    }
    //creamos la sala
    const sala = await this.prisma.sala.create({
      data: {
        nombre,
        codigo
      }
    })
    //creamos las preguntas
    const createPreguntas = await Promise.all(
      preguntas.map(async (pregunta) => {
        await this.prisma.pregunta.create({
          data: {
            salaId: sala.id,
            texto: pregunta.texto,
            preguntaCorrecta: pregunta.correcta
          }
        })

      }))

    //retornamos el codigo de la sala y las preguntas al cliente
    return { positive: true, codigo: sala.codigo, preguntas: createPreguntas }
  }

}
