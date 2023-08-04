-- CreateTable
CREATE TABLE "urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortenedURL" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_shortenedURL_key" ON "urls"("shortenedURL");
