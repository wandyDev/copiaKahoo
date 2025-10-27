import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SalasService } from './salas.service';
import { CreateSalaDto } from './dto/create-sala.dto';

@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) { }

  //crear sala
  @Post('create')
  async create(@Body() createSalaDto: CreateSalaDto) {
    try {
      console.log(createSalaDto);
      //creamos la sala
      const creteConfigSala = await this.salasService.create(createSalaDto);
      //verificamos que se haya creado la sala
      if (!creteConfigSala.positive) {
        return { error: "error al crear la sala" }
      }
      //retornamos el codigo y las preguntas
      return { codigo: creteConfigSala.codigo, preguntas: creteConfigSala.preguntas }
    } catch (error) {
      //mostramos el error
      console.log("error en el servicio al crear la sala", error);
      throw new BadRequestException("error al crear la sala", String(error))
    }
  }

}
