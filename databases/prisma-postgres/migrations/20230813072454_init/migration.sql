-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "shortenedURL" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_shortenedURL_key" ON "urls"("shortenedURL");
