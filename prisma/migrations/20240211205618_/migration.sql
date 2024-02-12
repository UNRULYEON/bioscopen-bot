-- DropForeignKey
ALTER TABLE "CinemaSubscriber" DROP CONSTRAINT "CinemaSubscriber_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "CinemaSubscriber" DROP CONSTRAINT "CinemaSubscriber_subscriberId_fkey";

-- DropForeignKey
ALTER TABLE "MovieSubscriber" DROP CONSTRAINT "MovieSubscriber_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieSubscriber" DROP CONSTRAINT "MovieSubscriber_subscriberId_fkey";

-- AddForeignKey
ALTER TABLE "MovieSubscriber" ADD CONSTRAINT "MovieSubscriber_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSubscriber" ADD CONSTRAINT "MovieSubscriber_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSubscriber" ADD CONSTRAINT "CinemaSubscriber_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CinemaSubscriber" ADD CONSTRAINT "CinemaSubscriber_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
