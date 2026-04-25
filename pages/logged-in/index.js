import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

function index() {
  const [authorization, setAuthorization] = useState(false);

  useEffect(() => {
    const Authorization = Cookies.get('Authorization');

    if(Authorization) {
      setAuthorization(true);
    }

    else {
      setAuthorization(false);
    }

  }, [])
  

 

  return (
    <div className='mt-4 pt-4 mb-4 pb-4 text-center'>
      {authorization ? (
        <p> Logged In</p>
      ) : (
        <p> Logged Out </p>
      )}
    </div>
  )
}

export default index