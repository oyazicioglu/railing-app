/*
  Warnings:

  - You are about to alter the column `type` on the `System` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_System" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);
INSERT INTO "new_System" ("id", "name", "type") SELECT "id", "name", "type" FROM "System";
DROP TABLE "System";
ALTER TABLE "new_System" RENAME TO "System";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
