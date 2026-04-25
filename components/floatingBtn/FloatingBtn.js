import React from "react";
import floatingImg from "../../public/gif/animated-floating-doc-desktop.gif";
import Image from "next/image";
function FloatingBtn() {
  return (
    <div className="floatingBtn">
      <a href="/doctor-now">
        <Image
          className="img-fluid"
          src={floatingImg}
          alt="floatingImg"
          width={65}
          height={88}
        />
      </a>
    </div>
  );
}

export default FloatingBtn;
