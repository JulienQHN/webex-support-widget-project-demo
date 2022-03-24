import { useState } from "react";
import PropTypes from "prop-types";
import { WebexMeetingsWidget } from "@webex/widgets";
import WebexMeetingDestination from "./WebexMeetingDestination";
import SpaceWidget, { destinationTypes } from "@webex/widget-space";
import RecentsWidget from "@webex/widget-recents";
import ListTeam from "./ListTeam";
// Sass import required for styling widgets
import "@webex/widget-recents/src/momentum.scss";
import "@webex/widget-space/src/momentum.scss";
import "@webex/widgets/dist/css/webex-widgets.css";
import "./WebexMeeting.css";

function WebexMeeting({ webexToken }) {
  const [destination, setDestination] = useState("");
  const [spaceWidgetRoomSelected, setSpaceWidgetRoomSelected] = useState("");
  const [currentActivitySelected, setcurrentActivitySelected] = useState("");

  function callback(name, detail) {
    if (name === "rooms:selected") {
      console.log(detail.id);
      setSpaceWidgetRoomSelected(detail.id, (key) => key + 1);
    }
  }

  const spaceWidgetProps = {
    accessToken: webexToken,
    destinationType: destinationTypes.SPACEID,
    destinationId: spaceWidgetRoomSelected,
    composerActions: {
      attachFiles: true,
    },
    initialActivity: "message",
    spaceActivities: {
      files: true,
      meet: true,
      message: true,
      people: true,
    },
    logLevel: true,
    showSubmitButton: true,
    sendMessageOnReturnKey: true,
    setCurrentActivity: "people",
  };

  const recentWidgetProps = {
    accessToken: webexToken,
    onEvent: callback,
    basicMode: true,
    enableAddButton: true,
    enableSpaceListFilter: true,
    enableUserProfile: true,
    enableUserProfileMenu: true,
  };

  function handleSetDestination(destinationToSet) {
    setDestination(destinationToSet);
  }

  const myControls = (inMeeting) =>
    inMeeting ? ["leave-meeting"] : ["join-meeting"];

  return (
    <div>
      <ListTeam webexToken={webexToken} />
      <WebexMeetingDestination onSetDestination={handleSetDestination} />
      <div>
        <WebexMeetingsWidget
          style={{ width: "1200px", height: "500px" }}
          accessToken={webexToken}
          meetingDestination={destination}
          controls={myControls}
          controlsCollapseRangeEnd={-2}
        />
      </div>
      {spaceWidgetRoomSelected == "" ? (
        <>
          <div className="RecentsSpaceWidget">
            <RecentsWidget {...recentWidgetProps} />
          </div>
        </>
      ) : (
        <>
          <div className="Widgets">
            <RecentsWidget {...recentWidgetProps} />
            <SpaceWidget {...spaceWidgetProps} key={spaceWidgetRoomSelected} />
          </div>
        </>
      )}
    </div>
  );
}

WebexMeeting.propTypes = {
  webexToken: PropTypes.string.isRequired,
  initialActivity: PropTypes.string,
};

export default WebexMeeting;
