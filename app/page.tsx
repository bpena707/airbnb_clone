/* 
this is considered to be the homepage. this page will appear under the navbar and displays current listings 
which is the data that is formatted as cards. the page changes depending on the category filter applied by user
*/

import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({ searchParams } : HomeProps) => {
  //const is for when there is no data to display for the chosen category on the main page
  // searchParams is passed as an object 
  const listings = await getListings(searchParams)
  const currentUser= await getCurrentUser()

  //if the category chosen is empty we will return an empty state
  if (listings.length === 0) {
    return(
      <EmptyState showReset /> //the showReset prop allows the button to be seen 
    )
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm: grid-cols-2 md:grid-cols-3 lg: grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default Home
