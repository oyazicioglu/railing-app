-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "updatedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "systemId" INTEGER NOT NULL,
    CONSTRAINT "Project_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "System" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "price" INTEGER,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "objectPath" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Accessory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "price" INTEGER,
    "objectPath" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProfileToSystem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfileToSystem_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfileToSystem_B_fkey" FOREIGN KEY ("B") REFERENCES "System" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AccessoryToSystem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AccessoryToSystem_A_fkey" FOREIGN KEY ("A") REFERENCES "Accessory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AccessoryToSystem_B_fkey" FOREIGN KEY ("B") REFERENCES "System" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToSystem_AB_unique" ON "_ProfileToSystem"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToSystem_B_index" ON "_ProfileToSystem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccessoryToSystem_AB_unique" ON "_AccessoryToSystem"("A", "B");

-- CreateIndex
CREATE INDEX "_AccessoryToSystem_B_index" ON "_AccessoryToSystem"("B");
