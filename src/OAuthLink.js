import React from "react";
import { Button } from "@momentum-ui/react";
import PropTypes from "prop-types";

function OAuthLink({ clientID, loginText, redirectURI, webexAPIBaseURL }) {
  return (
    <>
      <a
        href={`${webexAPIBaseURL}?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=spark%3Aall%20spark%3Akms`}
      >
        <Button children="Se Connecter" color="blue" size={52}>
          {loginText}
        </Button>
      </a>
    </>
  );
}

OAuthLink.propTypes = {
  clientID: PropTypes.string.isRequired,
  loginText: PropTypes.string.isRequired,
  redirectURI: PropTypes.string.isRequired,
  webexAPIBaseURL: PropTypes.string.isRequired,
};

export default OAuthLink;
