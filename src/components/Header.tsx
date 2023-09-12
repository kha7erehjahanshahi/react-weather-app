import './Header.css'
import { useAtom } from 'jotai'
import { showSidebarAtom } from '../utils/atoms'

function Header() {
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom)

  const handleClick = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className={`header_container`}>
      <h1 className={`header_title`}>Weather App </h1>
      <img src='/Images/app-logo.png' alt='app-logo' />
      <button type="button" className={`menu_button`} onClick={handleClick}>
        <img src='/Images/menu.png' alt='menu' />
      </button>
    </div>
  )
}

export default Header
