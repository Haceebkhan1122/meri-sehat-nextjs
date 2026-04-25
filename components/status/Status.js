import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/fontawesome-free-solid";
import Image from "next/image";

function Status(props) {
  const { text, icon, progress, bgColor, type, key, customClass, NewColorAdd } = props;

  function adjust(hex, percent) {
    // strip the leading # if it's there
    hex = hex?.replace(/^\s*#|\s*$/g, "");

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex?.length == 3) {
      hex = hex.replace(/(.)/g, "$1$1");
    }

    var r = parseInt(hex?.substr(0, 2), 16),
      g = parseInt(hex?.substr(2, 2), 16),
      b = parseInt(hex?.substr(4, 2), 16);

    return (
      "#" +
      (0 | ((1 << 8) + r + ((256 - r) * percent) / 100))
        .toString(16)
        .substr(1) +
      (0 | ((1 << 8) + g + ((256 - g) * percent) / 100))
        .toString(16)
        .substr(1) +
      (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
    );
  }

  return (
    <>
      {progress ? (
        <>
          <div className={`statusLink ${customClass}`}>
            <div
              style={{ backgroundColor: bgColor }}
              className={`status ${progress}`}
            >
              <p className="text">{text || type.text}</p>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{ backgroundColor: bgColor }}
          className={`status articleLabel`}
        >
          {icon ? (
            <Image
              crossorigin="anonymous"
              src={icon}
              alt="arrow"
              className="arrow"
              width={50}
              height={50}
            />
          ) : (
            <FontAwesomeIcon
              style={{ color: adjust(bgColor, -900) }}
              icon={faCheck}
            />
          )}
          <p style={{ color: adjust(bgColor, -900) }} className="text">
            {text || ""}
          </p>
        </div>
      )}
    </>
  );
}

// Status.prototype = {
//     /**
//      * text to be shown on p
//      */
//     text: PropTypes.string.isRequired,

//     /**
//      * custom class to be used for styling
//      */
//     progress: PropTypes.string.isRequired
// };

export default Status;
