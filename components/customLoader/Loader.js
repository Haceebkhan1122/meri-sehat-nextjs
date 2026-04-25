import React from 'react';
const loader = "/gif/loader_gif.gif";

function Loader() {
  return (
    <>
      <div className="custom-loadingWrapper"><img src={loader} class="gif" alt="loader" /></div>
    </>
  )
}

export default Loader