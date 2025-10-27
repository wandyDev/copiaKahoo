/*
  Warnings:

  - Added the required column `preguntaCorrecta` to the `Pregunta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pregunta" ADD COLUMN     "preguntaCorrecta" BOOLEAN NOT NULL;
