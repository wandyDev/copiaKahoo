import { IsBoolean, IsString, MinLength, ValidateNested, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";

class PreguntaDto {
    @IsString()
    @MinLength(1)
    texto: string;

    @IsBoolean()
    correcta: boolean;
}

export class CreateSalaDto {
    @IsString()
    @MinLength(3)
    nombre: string;

    @ValidateNested({ each: true })
    @Type(() => PreguntaDto)
    @ArrayMinSize(1)
    preguntas: PreguntaDto[];
}
