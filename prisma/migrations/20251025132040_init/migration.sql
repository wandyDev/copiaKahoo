/*
  Warnings:

  - Added the required column `RespuestaCorrecta` to the `Respuesta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Respuesta" ADD COLUMN     "RespuestaCorrecta" TEXT NOT NULL;
