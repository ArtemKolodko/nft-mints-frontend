import React, { useEffect, useState } from "react";
import "./profile.styles.scss";
import editImg from "../../assets/imgs/edit.svg";
import uploadImageImg from "../../assets/imgs/upload-image.svg";
import dj3nImg from "../../assets/imgs/dj3n_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useParams } from "react-router";
import { checkLogin, updateUser } from "../../utils/mint-interface/mint-inteface.utils";
import CircularProgress from "@mui/material/CircularProgress";
import { addFileToStorage } from "../../utils/firebase/firebase.utils";
import { setCurrentUser } from "../../store/user/user.action";
import UserType from "../../types/user.types";

// const defaultProfile = {
//     name: 'Username',
//     publicLink: '@username'
// }

export const UserProfile = ({displayUser, canEdit}:{displayUser:UserType|undefined, canEdit: boolean}) => {
    const [username, setUsername] = useState(displayUser?.name || '');
    const [publicLink, setPublicLink] = useState(displayUser?.publicLink || '');

    const [uploadProgress, setUploadProgress] = useState(0);
    const [filesUrlImage, setFilesUrlImage] = useState<string[]>([]);
    const [profileImage, setProfileImage] = useState<FileList | null>(null)

    const [uploadProgressBg, setUploadProgressBg] = useState(0);
    const [filesUrlBg, setFilesUrlBg] = useState<string[]>([]);
    const [profileImageBg, setProfileImageBg] = useState<FileList | null>(null)

    const [edit, setEdit] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (displayUser) {
            setUsername(displayUser.name || '');
            setPublicLink(displayUser.publicLink || '');
        }
    }, [displayUser]);

    const update = async () => {
        if (!canEdit) {
            return; // cannot edit
        }
        if (edit && (username.length > 0 || publicLink.length > 0)) {
            await updateUser({ name: username, publicLink })
        }
        setEdit(!edit)
    }

    // todo: duplicated, might be extracted as component
    // todo: refresh user
    const uploadImage = async () => {
        if (profileImage?.item(0)) {
            await addFileToStorage(profileImage?.item(0)!, setUploadProgress, setFilesUrlImage)
        }
    }

    const uploadImageBg = async () => {
        if (profileImageBg?.item(0)) {
            await addFileToStorage(profileImageBg?.item(0)!, setUploadProgressBg, setFilesUrlBg)
        }
    }

    const refreshUser = async () => {
        const user = await checkLogin();
        dispatch(setCurrentUser(user));
    }

    useEffect(() => {
        uploadImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileImage]);

    useEffect(() => {
        uploadImageBg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileImageBg]);

    useEffect(() => {
        if (filesUrlBg.length === 0) {
            return
        }
        const update = async () => {
            await updateUser({ profileImageBg: filesUrlBg[0] }).then(e => setUploadProgressBg(0));
            refreshUser();
        };
        update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filesUrlBg]);

    useEffect(() => {
        if (filesUrlImage.length === 0) {
            return
        }
        const update = async () => {
            await updateUser({ profileImage: filesUrlImage[0] }).then(e => setUploadProgress(0));
            refreshUser();
        };
        update();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filesUrlImage]);

    return <div className={'profile-container'}>
        <div className={'profile-image-container'}>
            <div className={'profile-img'} style={{ backgroundImage: `url(${displayUser?.profileImage || uploadImageImg})`, overflow: 'hidden' }}>
                {uploadProgress === 0 && <input type='file' style={{ 'opacity': 0, 'fontSize': '300px' }} onChange={e => setProfileImage(e.target.files)} disabled={!canEdit} />}
                {uploadProgress > 0 && <CircularProgress value={uploadProgress} />}
            </div>
            <div className={'dj3n-logo'} style={{ backgroundImage: `url(${dj3nImg})` }} />
            <div className={'profile-image-bg'} style={{ backgroundImage: `url(${displayUser?.profileImageBg || uploadImageImg})`, overflow: 'hidden' }} >
                {uploadProgressBg === 0 && <input type='file' style={{ 'opacity': 0, 'fontSize': '300px' }} onChange={e => setProfileImageBg(e.target.files)} disabled={!canEdit} />}
                {uploadProgressBg > 0 && <CircularProgress value={uploadProgressBg} />}
            </div>
        </div>
        <div className={'profile-info-container'}>
            {!edit && <div>
                <div className={'profile-title'}>{username || 'Username'}</div>
                <div>{publicLink || '@username'}</div>
            </div>}
            {edit && <div>
                <div className={'profile-title'}><input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Username' /></div>
                <div><input type='text' value={publicLink} onChange={e => setPublicLink(e.target.value)} placeholder='@username' /></div>
            </div>}
            <div>
                {(canEdit) && <img src={editImg} width={'28px'} alt={'Edit'} onClick={update} />}
            </div>
        </div>
    </div>
}
