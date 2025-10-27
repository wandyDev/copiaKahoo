/*
  Warnings:

  - You are about to drop the column `texto` on the `Respuesta` table. All the data in the column will be lost.
  - Added the required column `respuesta` to the `Respuesta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Respuesta" DROP COLUMN "texto",
ADD COLUMN     "respuesta" BOOLEAN NOT NULL;
