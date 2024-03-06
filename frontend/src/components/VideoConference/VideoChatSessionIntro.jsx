import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function randomID(len) {
 let result = "";
 if (result) return result;
 var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
 len = len || 5;
 for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
 }
 return result;
}

export default function VideoChatSessionIntro() {
 const { roomId } = useParams();
 console.log(roomId);
 const account = useSelector((state) => state.auth.info);
 const userID = randomID(5);
 const userName = randomID(5);

 const doctorMeeting = async (element) => {
    const appID = import.meta.env.VITE_APP_ZEGOCLOUD_APP_ID;
    const serverSecret = `${import.meta.env.VITE_APP_ZEGOCLOUD_SERVER_SECRET}`;
    const youServerUrl = `${import.meta.env.VITE_APP_API_BASE_URL}/appointments/room_access_token`;

    fetch(
      `${youServerUrl}?appID=${appID}&serverSecret=${serverSecret}&userID=${userID}`,
      {
        method: "GET",
      }
    )
    .then((res) => res.json())
    .then(({token}) => {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        appID,
        token,
        roomId,
        userID,
        userName
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      console.log(zp);

      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Appointment link",
            url:
              window.location.origin +
              window.location.pathname +
              "?roomId=" +
              roomId,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching token or joining room:", error);
    });
 };

 return (
    <div
      className="myCallContainer"
      ref={doctorMeeting}
      style={{ width: "100%", height: "100%" }}
    ></div>
 );
}

