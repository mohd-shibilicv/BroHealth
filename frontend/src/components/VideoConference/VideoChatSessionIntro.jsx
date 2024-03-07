import React, { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const location = useLocation();
  const appointment = location.state?.appointment;
  const account = useSelector((state) => state.auth.account);
  const navigate = useNavigate();
  const userID = `${appointment.doctor.id}`;
  const userName = `${appointment.doctor.user.first_name} ${appointment.doctor.user.last_name}`;

  const handleLeaveRoom = () => {
    navigate(`/`);
  };

  const doctorMeeting = async (element) => {
    const appID = import.meta.env.VITE_APP_ZEGOCLOUD_APP_ID;
    const serverSecret = `${import.meta.env.VITE_APP_ZEGOCLOUD_SERVER_SECRET}`;
    const youServerUrl = `${
      import.meta.env.VITE_APP_API_BASE_URL
    }/appointments/room_access_token`;

    fetch(
      `${youServerUrl}?appID=${appID}&serverSecret=${serverSecret}&userID=${userID}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(({ token }) => {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          appID,
          token,
          roomId,
          userID,
          userName
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);

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
          screenSharingConfig: {
            resolution: ZegoUIKitPrebuilt.ScreenSharingResolution_720P,
          },
          maxUsers: 2,
          onUserAvatarSetter: (userList) => {
            userList.forEach((user) => {
              user.setUserAvatar(
                `${import.meta.env.VITE_APP_API_BASE_URL}${
                  account.profile_picture
                }`
              );
            });
          },
          videoResolutionList: [
            ZegoUIKitPrebuilt.VideoResolution_360P,
            ZegoUIKitPrebuilt.VideoResolution_180P,
            ZegoUIKitPrebuilt.VideoResolution_480P,
            ZegoUIKitPrebuilt.VideoResolution_720P,
          ],
          videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_360P,
          whiteboardConfig: {
            showAddImageButton: true,
          },
          preJoinViewConfig: {
            title: "Start the Consultation",
          },
          showRoomTimer: true,
          showLeavingView: false,
          onLeaveRoom: (handleLeaveRoom),
        });
        zp.addPlugins({ ZegoSuperBoardManager });
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
