import React, { useEffect, useMemo, useState } from "react";
import "./profile.styles.scss";
import { useDispatch } from "react-redux";

import {
    checkLogin,
    updateUser,
} from "../../utils/mint-interface/mint-inteface.utils";
import { addFileToStorage } from "../../utils/firebase/firebase.utils";
import { setCurrentUser } from "../../store/user/user.action";
import UserType from "../../types/user.types";
import { UserProfile } from "../../components/user-profile/user-profile.component";

// const defaultProfile = {
//     name: 'Username',
//     publicLink: '@username'
// }

export const MyProfile = ({ displayUser, canEdit }: { displayUser: UserType | undefined, canEdit: boolean }) => {

    const [, setUploadProgress] = useState(0);
    const [filesUrlImage, setFilesUrlImage] = useState<string[]>([]);
    const [, setUploadProgressBg] = useState(0);
    const [filesUrlBg, setFilesUrlBg] = useState<string[]>([]);

    const dispatch = useDispatch();

    const uploadImage = async (image:File | null) => {
        if (image) {
            await addFileToStorage(
                image,
                setUploadProgress,
                setFilesUrlImage
            );
        }
    };

    const uploadImageBg = async (image:File | null) => {
        if (image) {
            await addFileToStorage(
                image,
                setUploadProgressBg,
                setFilesUrlBg
            );
        }
    };

    const refreshUser = async () => {
        const user = await checkLogin();
        dispatch(setCurrentUser(user));
    };

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

    const editor = useMemo(() => {
        return {
            updateProfile: async (name: string, publicLink: string, profileDescription: string) => {
                await updateUser({name, publicLink, description: profileDescription})
                refreshUser()
            },
            updateImage: async (profileImage: FileList | null) => {
                if (!profileImage) {
                    return;
                }
                uploadImage(profileImage?.item(0))
            },
            updateBackground: async (profileImage?: FileList | null) => {
                if (!profileImage) {
                    return;
                }
                uploadImageBg(profileImage?.item(0))
            }

        }
    }, [displayUser, canEdit])

    return <UserProfile {...displayUser} editable={canEdit} editor={editor} />
}
