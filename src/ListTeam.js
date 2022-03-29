import { React, useEffect, useState } from "react";
import { Button, Icon, ListSeparator } from "@momentum-ui/react";
import SpaceWidget, { destinationTypes } from "@webex/widget-space";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import "@webex/widget-recents/src/momentum.scss";
// Sass import required to style widgets
import "@webex/widget-space/src/momentum.scss";
import "@webex/widgets/dist/css/webex-widgets.css";
import "./WebexMeeting.css";

const data = JSON.stringify({
  query: ``,
  variables: {},
});

function ListTeam({ webexToken }) {
  const [listTeam, setlistTeams] = useState([]);
  const [pplRooms, setpplRooms] = useState([]);
  const [spaceWidgetRoomSelected, setspaceWidgetRoomSelected] = useState("");
  const onsetListTeam = "https://webexapis.com/v1/teams";
  const onsetMemberTeam = "https://webexapis.com/v1/team/memberships?teamId=";
  const onsetMemberMail = "https://webexapis.com/v1/meetings";

  const ListTeamGET = {
    method: "GET",
    url: onsetListTeam,
    headers: {
      Authorization: "Bearer " + webexToken,
      "Content-Type": "application/json",
    },
    data: data,
  };

  function fetchTeamsMembers(idTeam) {
    const MembersTeamGET = {
      method: "GET",
      url: onsetMemberTeam + idTeam,
      headers: {
        Authorization: "Bearer " + webexToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(MembersTeamGET).then(function (response) {
      const items = response.data;
      const listTeamMembers = items.items;
      setpplRooms(listTeamMembers);
      console.log(listTeamMembers);
    });
  }

  // Fonction réservé aux comptes Webex Payant
  function startMemberCall(mailMember) {
    const MemberMailGET = {
      method: "POST",
      url: onsetMemberMail,
      headers: {
        Authorization: "Bearer " + webexToken,
        "Content-Type": "application/json",
      },
      data: {
        title: "test",
        start: "2022-03-23T13:28:57Z",
        end: "2022-03-23T14:28:57Z",
      },
    };

    axios(MemberMailGET).then(function (response) {
      const items = response.data;
      console.log(items);
    });
  }

  function callbackOpenChat(detail) {
    console.log(detail);
    setspaceWidgetRoomSelected(detail, (key) => key + 1);
  }

  const spaceWidgetProps = {
    accessToken: webexToken,
    destinationType: destinationTypes.USERID,
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

  useEffect(() => {
    const fetchTeams = async () => {
      axios(ListTeamGET).then(function (response) {
        const items = response.data;
        const listTeams = items.items;
        setlistTeams(listTeams);
        console.log(listTeams);
      });
    };
    fetchTeams();
  }, []);
  console.log(pplRooms);

  return (
    <div>
      <div className="md-data-table WidgetsWidth">
        <div className="md-data-table__wrapper">
          <table className="Table">
            <thead className="md-data-table__thead">
              <tr>
                <th className="width3rem">Nom</th>
                <th className="width5rem"></th>
                <th className="width3rem">Date de création</th>
                <th className="width1rem">Meeting</th>
              </tr>
            </thead>
            <tbody className="md-data-table__tbody">
              {listTeam.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td></td>
                  <td>{moment(item.created).calendar()}</td>
                  <td>
                    <Button
                      children={<Icon name="icon-open-in-folder_20" />}
                      size={40}
                      ariaLabel="Search"
                      onClick={() => fetchTeamsMembers(item.id)}
                      circle
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md-data-table WidgetsWidth">
        <div className="md-data-table__wrapper">
          <table className="Table">
            <thead className="md-data-table__thead">
              <tr>
                <th className="width3rem">Nom</th>
                <th className="width5rem">Email</th>
                <th className="width3rem">Date d'arrivée</th>
                <th className="width1rem">Meeting</th>
              </tr>
            </thead>
            <tbody className="md-data-table__tbody">
              {pplRooms.map((item) => (
                <tr>
                  <td>{item.personDisplayName}</td>
                  <td>{item.personEmail}</td>
                  <td>{moment(item.created).calendar()}</td>
                  <td>
                    <a href={"webexteams://im?email=" + item.personEmail}>
                      <Button
                        children={<Icon name="icon-private-meeting_20" />}
                        size={40}
                        ariaLabel="Search"
                        //onClick={() => startMemberCall(item.personEmail)}
                        circle
                      />
                    </a>
                    <Button
                      children={<Icon name="icon-chat-group_20" />}
                      size={40}
                      ariaLabel="Search"
                      onClick={() => callbackOpenChat(item.personId)}
                      circle
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ListSeparator />
      {spaceWidgetRoomSelected == "" ? (
        <></>
      ) : (
        <div className="WidgetChat">
          <SpaceWidget {...spaceWidgetProps} key={spaceWidgetRoomSelected} />{" "}
        </div>
      )}
    </div>
  );
}

ListTeam.propTypes = {
  webexToken: PropTypes.string.isRequired,
};

export default ListTeam;
