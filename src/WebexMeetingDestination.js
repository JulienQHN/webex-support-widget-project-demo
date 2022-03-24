import { useState } from "react";
import PropTypes from "prop-types";

import "./WebexMeetingDestination.css";

function WebexMeetingDestination({ onSetDestination }) {
  const [destination, setDestination] = useState("");

  function handleDestinationChange(e) {
    setDestination(e.target.value);
  }

  function handleSaveDestination() {
    onSetDestination(destination);
  }

  return (
    <div className="WebexMeetingDestination WidgetsWidth">
      <label htmlFor="WebexMeetingDestinationInput">
        Mettre une adresse email une adresse utilisateur ou room ID ou SIP
        address
      </label>
      <input
        id="WebexMeetingDestinationInput"
        type="text"
        placeholder="Ecrire ici"
        value={destination}
        onChange={handleDestinationChange}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            onSetDestination(destination);
          }
        }}
      ></input>
      <input
        type="button"
        onClick={handleSaveDestination}
        value="SOUMETTRE"
      ></input>
      <div className="WebexMeetingDestinationNote"></div>
    </div>
  );
}

WebexMeetingDestination.propTypes = {
  onSetDestination: PropTypes.func.isRequired,
};

export default WebexMeetingDestination;
