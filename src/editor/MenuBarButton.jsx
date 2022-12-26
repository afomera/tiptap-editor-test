const MenuBarButton = ({ action, disabled, active, icon }) => {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={active ? 'is-active' : ''}
    >
      {icon}
    </button>
  )
}

export default MenuBarButton;
