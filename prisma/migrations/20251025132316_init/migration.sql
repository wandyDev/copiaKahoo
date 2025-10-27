/*
  Warnings:

  - You are about to drop the column `RespuestaCorrecta` on the `Respuesta` table. All the data in the column will be lost.
  - Added the required column `RespuestaCorrecta` to the `Pregunta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "RespuestaCorrecta" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Respuesta" DROP COLUMN "RespuestaCorrecta";
