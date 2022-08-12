import React from "react";
import editImg from "../../assets/imgs/edit.svg";
//import uploadImageImg from "../../assets/imgs/upload-image.svg";
import dj3nImg from "../../assets/imgs/dj3n_logo.svg";

import "./user-profile.styles.scss";

export const defaultProfile = {
  name: "Username",
  publicLink: "@username",
};

export type UserProfileProps = {
  name : string;
  publicLink : string;
  profileImage : any;
  profileImageBg : any;
};

export const UserProfile = (props: UserProfileProps) => {
  const { name, publicLink, profileImage, profileImageBg } = props;

  return (
    <div className={"profile-container"}>
      <div className={"profile-image-container"}>
        <div
          className={"profile-img"}
          style={{ backgroundImage: `url(${profileImage})` }}
        />
        <div
          className={"dj3n-logo"}
          style={{ backgroundImage: `url(${dj3nImg})` }}
        />
        <div
          className={"profile-image-bg"}
          style={{ backgroundImage: `url(${profileImageBg})` }}
        />
      </div>
      <div className={"profile-info-container"}>
        <div>
          <div className={"profile-title"}>{name}</div>
          <div>{publicLink}</div>
        </div>
        <div>
          <img src={editImg} width={"28px"} alt={"Edit"} />
        </div>
      </div>
    </div>
  );
};
