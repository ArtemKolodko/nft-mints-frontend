import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import editImg from "../../assets/imgs/edit.svg";
//import uploadImageImg from "../../assets/imgs/upload-image.svg";
import dj3nImg from "../../assets/imgs/dj3n_logo.svg";

import "./user-profile.styles.scss";

export const defaultProfile = {
  name: "Username",
  publicLink: "@username",
};

export type EditorProps = {
  updateProfile: (name: string, publicLink: string, profileDescription: string) => void;
  updateImage: (profileImage: FileList | null) => void;
  updateBackground: (profileImage?: FileList | null) => void;
}

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
  textArea?: boolean
}

const EditableComponent = (props: EditableComponentProps) => {
  if (!props.editing) {
    return <div className={props.normalCls}>{props.value}</div>
  }
  if (props.textArea) {
    return <textarea className={props.editingCls} placeholder={props.placeholder} value={props.value} onChange={e=>props.stateAction(e.target.value)}/> 
  }
  return <input className={props.editingCls} type='text' placeholder={props.placeholder} value={props.value} onChange={e=>props.stateAction(e.target.value)}/>
}

export const UserProfile = (props: UserProfileProps) => {
  const { name, publicLink, profileImage, profileImageBg, description, editable, editor } =
    props;

  const [editing, setEditing] = useState(false)
  const [nameStr, setName] = useState(name)
  const [profileDescription, setDescription] = useState(description)
  const [link, setLink] = useState(publicLink)

  useEffect(() => {
    setName(name)
    setDescription(description)
    setLink(publicLink)
  }, [name, publicLink, description])

  return (
    <div className={"profile-container"}>
      <div className={"profile-image-container"}>
        <div
          className={"profile-img"}
          style={{ backgroundImage: `url(${profileImage})`, overflow: 'hidden' }}
        >
          <input type='file' style={{ 'opacity': 0, 'fontSize': '300px' }} disabled={!editable} onChange={e => props.editor?.updateImage(e.target.files)}/>
        </div>
        <div
          className={"dj3n-logo"}
          style={{ backgroundImage: `url(${dj3nImg})` }}
        />
        <div
          className={"profile-image-bg"}
          style={{ backgroundImage: `url(${profileImageBg})`, overflow: 'hidden' }}
        >
          <input type='file' style={{ 'opacity': 0, 'fontSize': '300px' }} disabled={!editable} onChange={e => props.editor?.updateBackground(e.target.files)}/>
        </div>
      </div>
      <div className={"profile-info-container"}>
        <div style={{"flexGrow": "1"}}>
          <div className='profile-title'>
            <EditableComponent normalCls="profile-title" editingCls="profile-title-edit" value={nameStr || 'username'} stateAction={setName} editing={editing} placeholder="Username"/>
          </div>
          <div className='profile-link-sm'>
            <EditableComponent normalCls="profile-link-sm" editingCls="profile-link-sm-edit" value={link || '@username'} stateAction={setLink} editing={editing} placeholder="@username"/>
          </div>
          <div className='profile-description-cls'>
            <EditableComponent textArea={true} normalCls="profile-description" editingCls="profile-description-edit" value={profileDescription!} stateAction={setDescription} editing={editing} placeholder="description"/>
          </div>
        </div>
        
        <div>
          <img hidden={!editable} src={editImg} width={"20px"} alt={"Edit"} onClick={e => {
            if (editing) {
              // not editing, update!
              editor?.updateProfile(nameStr!, link!, profileDescription!)
            }
            setEditing(!editing)
          }} />
        </div>
      </div>
    </div>
  );
};
