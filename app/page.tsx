import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export default function Home() {
  //const is for when there is no data to display for the chosen category on the main page
  const isEmpty = true;

  //if the category chosen is empty we will return an empty state
  if (isEmpty) {
    return(
      <EmptyState showReset /> //the showReset prop allows the button to be seen 
    )
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm: grid-cols-2 md:grid-cols-3 lg: grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <div>My future listings</div>
      </div>
    </Container>
  )
}
