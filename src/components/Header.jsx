

function Header() {



  return (
    <header
      style={{ background: 'white', padding: '10px', display: 'flex',  alignItems: 'center', justifyContent: 'center', marginBottom: '0px' }}
      className='header'
    >
      
        {/* <img style={{ width: '100px', height: '100px', }} src={require('../images/circle-logo-png.webp')} alt='' /> */}
        <h1 className='carwash-h' style={{textAlign: 'center'}}> CAR WASH NAME</h1>
      

      {/* Hamburger menu */}
   
    </header>
    //    <IconContext.Provider value={{ color: '#4682B4' }}>
    //    <div className='mobile-menu'>
    //      <FaBars onClick={toggleMobileMenu} />
    //      <input type="checkbox" id="mobile-menu-checkbox" ref={mobileMenuRef} style={{ display: 'none' }} />
    //      {isMobileMenuOpen && (
    //        <ul className='mobile-menu-items'>
    //         {/* <img src="" alt="" /> */}
    //        </ul>
    //      )}
    //    </div>
    //  </IconContext.Provider>
  );
}

export default Header;
