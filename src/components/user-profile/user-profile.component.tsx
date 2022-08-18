import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import editImg from "../../assets/imgs/edit.svg";
//import uploadImageImg from "../../assets/imgs/upload-image.svg";
import dj3nImg from "../../assets/imgs/dj3n_logo.svg";

import "./user-profile.styles.scss";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const defaultProfile = {
  name: "Username",
  publicLink: "@username",
};

export type EditorProps = {
  updateProfile: (
    name: string,
    publicLink: string,
    profileDescription: string
  ) => void;
  updateImage: (profileImage: FileList | null) => void;
  updateBackground: (profileImage?: FileList | null) => void;
};

export type UserProfileProps = {
  name?: string;
  publicLink?: string;
  profileImage?: any;
  profileImageBg?: any;
  description?: string;
  editable?: boolean;
  editor?: EditorProps;
};

type EditableComponentProps = {
  value: string;
  stateAction: Dispatch<SetStateAction<string | undefined>>;
  editing: boolean;
  editingCls: string;
  normalCls: string;
  placeholder: string;
  textArea?: boolean;
  isLink?: boolean;
  navigator?: NavigateFunction;
};

const EditableComponent = (props: EditableComponentProps) => {
  if (!props.editing && props.isLink) {
    return (
      <div
        onClick={() => props.navigator!(`/${props.value}`)}
        className={props.normalCls}
      >
        {props.value}
      </div>
    );
  }
  if (!props.editing) {
    return <div className={props.normalCls}>{props.value}</div>;
  }
  if (props.textArea) {
    return (
      <textarea
        className={props.editingCls}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.stateAction(e.target.value)}
      />
    );
  }
  return (
    <input
      className={props.editingCls}
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.stateAction(e.target.value)}
    />
  );
};

export const UserProfile = (props: UserProfileProps) => {
  const {
    name,
    publicLink,
    profileImage,
    profileImageBg,
    description,
    editable,
    editor,
  } = props;

  const [editing, setEditing] = useState(false);
  const [nameStr, setName] = useState(name);
  const [profileDescription, setDescription] = useState(description);
  const [link, setLink] = useState(publicLink);

  const navigator = useNavigate();

  useEffect(() => {
    setName(name);
    setDescription(description);
    setLink(publicLink);
  }, [name, publicLink, description]);
  console.log("editable", editable);
  return (
    <div className="user-container">
      <div className="user-container__profile-images">
        <div className="user-container__profile-images--left"></div>
        <div
          className={
            profileImageBg === undefined
              ? `user-container__profile-images--right user-container__profile-images--right-default`
              : `user-container__profile-images--right user-container__profile-images--right-custom`
          }
          style={
            profileImageBg === undefined
              ? undefined
              : { backgroundImage: `url(${profileImageBg})` }
          }
        >
          <input
            type="file"
            style={{ opacity: 0, fontSize: "150px", marginLeft: "20%" }}
            disabled={!editable}
            onChange={(e) => props.editor?.updateBackground(e.target.files)}
          />
        </div>
        <div
          className={
            profileImage === undefined
              ? `user-container__profile-images--avatar user-container__profile-images--avatar-default`
              : `user-container__profile-images--avatar`
          }
          style={
            profileImage === undefined
              ? undefined
              : { backgroundImage: `url(${profileImage})` }
          }
        >
          <input
            type="file"
            style={{
              opacity: 0,
              fontSize: "70px",
              marginRight: "90%",
              width: "5px",
            }}
            disabled={!editable}
            onChange={(e) => props.editor?.updateImage(e.target.files)}
          />
        </div>
      </div>
      <div className="user-container__info">
        <div>
          <EditableComponent
            normalCls="user-container__info--title"
            editingCls="profile-title-edit"
            value={nameStr || "username"}
            stateAction={setName}
            editing={editing}
            placeholder="Username"
          />
          {/* <div className="user-container__info--title">{name}</div> */}
          <EditableComponent
            isLink={true}
            navigator={navigator}
            normalCls="user-container__info--link"
            editingCls="profile-link-sm-edit"
            value={link || "@username"}
            stateAction={setLink}
            editing={editing}
            placeholder="@username"
          />

          {/* <div className="user-container__info--link">{publicLink}</div> */}
        </div>
        {editable ? (
          <div
            className="user-container__info--edit"
            onClick={(e) => {
              console.log("editing", editing);
              if (editing) {
                // not editing, update!
                if (name !== nameStr || link !== publicLink || profileDescription !== description) {
                  editor?.updateProfile(nameStr!, link!, profileDescription!);
                } 
              }
              setEditing(!editing);
            }}
          ></div>
        ) : null}
      </div>
      <div>
        <EditableComponent
          textArea={true}
          normalCls="user-container__info--description"
          editingCls="profile-description-edit"
          value={profileDescription!}
          stateAction={setDescription}
          editing={editing}
          placeholder="description"
        />
      </div>
    </div>

    //     <div style={{ flexGrow: "1" }}>
    //       <div className="profile-title">
    //         <EditableComponent
    //           normalCls="profile-title"
    //           editingCls="profile-title-edit"
    //           value={nameStr || "username"}
    //           stateAction={setName}
    //           editing={editing}
    //           placeholder="Username"
    //         />
    //       </div>
    //       <div className="profile-link-sm">
    //         <EditableComponent
    //           isLink={true}
    //           navigator={navigator}
    //           normalCls="profile-link-sm"
    //           editingCls="profile-link-sm-edit"
    //           value={link || "@username"}
    //           stateAction={setLink}
    //           editing={editing}
    //           placeholder="@username"
    //         />
    //       </div>
    //       <div className="profile-description-cls">
    // <EditableComponent
    //   textArea={true}
    //   normalCls="profile-description"
    //   editingCls="profile-description-edit"
    //   value={profileDescription!}
    //   stateAction={setDescription}
    //   editing={editing}
    //   placeholder="description"
    // />
    //       </div>
    //     </div>

    //     <div>
    //       <img
    //         hidden={!editable}
    //         src={editImg}
    //         width={"20px"}
    //         alt={"Edit"}
    //         onClick={(e) => {
    //           if (editing) {
    //             // not editing, update!
    //             editor?.updateProfile(nameStr!, link!, profileDescription!);
    //           }
    //           setEditing(!editing);
    //         }}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};
