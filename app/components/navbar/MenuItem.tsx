'use client'
/* 
the menu item component helps to pass the props to the userMenu component including the label and the onClick fuction 
*/

interface MenuItemProps {
    onClick: () => void
    label: string
}

// assigns props 
const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
  return (
    // this is the content inside the menu when the hamburger menu button is clicked
    // label is the placehodler for the label of the menu items that are given 
    <div
      onClick={onClick} 
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
        {label}
    </div>
  )
}

export default MenuItem