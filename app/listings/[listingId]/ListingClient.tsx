/* this component is how th data will display on the page */
"use client";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeUser, safeReservation } from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListingHead from "../../components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval, setDate } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";

// this constant sets the start and end date
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: safeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [], // reservations is set to an empty array in case there are no reservations
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  // iterate over reservations and see any dates we have to disable for reservation in case there is a reservation already booked for it
  const disabledDates = useMemo(() => {
    let dates: Date[] = []; //this is an empty array of dates

    // this is the part where all of the reservations are iterated over. a range of dates is created between start and end date
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      // dates are passed to already existing dates array
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  // TODO: states and functions to create reservations
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // function to create reservation. start with checking if there is a currentUser. useCallabck is used to memoize the entire function
  const onCreateReservation = useCallback(() => {
    // if the user is not logged in then open the loginModal
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // set the loadingState to true
    setIsLoading(true);

    // axios post request to the API  reservations end point with object request as the payload
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      // promise callback to execute when post is successful using toast to notify success sets state and refresh router
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        // Redirect to trips
        router.push('/trips');
      })
      //promise callback if post fails notifys of error
      .catch(() => {
        toast.error("Something went wrong");
      })
      // executes whether there was an error or not and setsLoading state to false
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  // change the total price depending on what dates the user selects. notices changes in calendar and counts number of days in between
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // calculates the number of days between start and end
      const dayCount = differenceInDays(
        dateRange.startDate,
        dateRange.endDate
      );

      // if the day count and listing price are true set the total price
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price); //else give the listing price if just one day
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      {/* this div is for the overall page.tsx which sits under the navbar */}
      <div className="max-w-screen-lg mx-auto">
        {/* this div is for the comopnents inside of it  */}
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          {/* listing info is given a grid style so that it displays informatino on the the left side panel */}
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            {/* list reservation is given the order-first for it  to display on the right side panel */}
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
                dateRange={dateRange}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
