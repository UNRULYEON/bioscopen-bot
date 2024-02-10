-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cinema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "letterboxdId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieSubscriber" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "notified" BOOLEAN NOT NULL,
    "movieId" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,

    CONSTRAINT "MovieSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CinemaSubscriber" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "cinemaId" TEXT NOT NULL,

    CONSTRAINT "CinemaSubscriber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cinema" ADD CONSTRAINT "Cinema_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cinema" ADD CONSTRAINT "Cinema_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSubscriber" ADD CONSTRAINT "MovieSubscriber_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSubscriber" ADD CONSTRAINT "MovieSubscriber_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSubscriber" ADD CONSTRAINT "CinemaSubscriber_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSubscriber" ADD CONSTRAINT "CinemaSubscriber_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
