/*
  Warnings:

  - Made the column `correcta` on table `Respuesta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Respuesta" ALTER COLUMN "correcta" SET NOT NULL;
