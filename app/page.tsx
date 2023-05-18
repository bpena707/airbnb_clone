/* 
this is considered to be the homepage. this page will appear under the navbar and displays current listings 
which is the data that is formatted as cards. the page changes depending on the category filter applied by user
*/

import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export default async function Home() {
  //const is for when there is no data to display for the chosen category on the main page
  const listings = await getListings()

  //if the category chosen is empty we will return an empty state
  if (listings.length === 0) {
    return(
      <EmptyState showReset /> //the showReset prop allows the button to be seen 
    )
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm: grid-cols-2 md:grid-cols-3 lg: grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => {
          return (
            <div>{listing.title}</div>
          )
        })}
      </div>
    </Container>
  )
}
