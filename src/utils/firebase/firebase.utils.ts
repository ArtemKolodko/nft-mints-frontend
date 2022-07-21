import { Dispatch } from 'react';
import { initializeApp } from 'firebase/app';
import { FileValidated } from "@dropzone-ui/react";
//import { getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc, query, where, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const config = {
  apiKey: "AIzaSyBWy1CmEMkX0RuoPq1GAI67gbA6youPEms",
  authDomain: "nft-mints-20f17.firebaseapp.com",
  projectId: "nft-mints-20f17",
  storageBucket: "nft-mints-20f17.appspot.com",
  databaseURL: 'gs://nft-mints-20f17.appspot.com',
  messagingSenderId: "913579668003",
  appId: "1:913579668003:web:f9caae72c8a03249253796"
};

initializeApp(config);

export const storage = getStorage();



export const addFilesToStorage = async (files: FileValidated[], setProgress: Dispatch<React.SetStateAction<number>>, 
  setFilesUrl : Dispatch<React.SetStateAction<string[]>>) => {
  let promises: Array<any> = []; //Promise<any[]> = [];
  const fileUrl : Array<string> = [];
  files.map((file) => {
    console.log("file to upload: ", file.file.name)
    const storageRef = ref(storage,`/mint-files-mtq9vdv/${Date.now()}${file.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file.file);
    promises.push(uploadTask);
    uploadTask.on(
      "state_changed", 
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      }, (error) => {
        console.log(error); //throw error(error);
    }, async () => {
      await getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
        console.log(urls);
        fileUrl.push(urls);
      })
    })
  });

  Promise.all(promises!).then(() => {
    console.log("Promise.all");
    setFilesUrl(fileUrl);
  });
};
  