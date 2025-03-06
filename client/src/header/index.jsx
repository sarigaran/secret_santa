import React from 'react';

function Header() {
  return (
    <div className='header'>
      <img src='src\assets\santa.jpg' alt='santa' height={65} width={65} />
      <h1>
        Secret <span className='spantext'>Santa</span>
      </h1>
    </div>
  );
}

export default Header;
