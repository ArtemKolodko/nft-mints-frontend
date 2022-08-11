import {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import * as htmlToImage from "html-to-image";
import ImageUploading, { ImageListType } from "react-images-uploading";

import AccessPass, {
  AccessPassProps,
} from "../../components/acess-pass/access-pass.component";
import { BasicInput } from "../../components/input/input.component";
import { addFilesToStorage } from "../../utils/firebase/firebase.utils";
import { createCollection } from "../../utils/mint-interface/mint-inteface.utils";

import "./create-access-pass.styles.scss";

const defaultAccessPassData = {
  backgroundColor: "white",
  price: 0,
  logo: ''
};

const CreateAccessPass = () => {
  const [accessPassData, setAccessPassData] = useState<AccessPassProps>(
    defaultAccessPassData
  );
  const [ uploadProgress, setUploadProgress ] = useState(0);
  const [ filesUrl, setFilesUrl ] = useState<string[]>([]);
  const [ logo, setLogo ] = useState([]);
  const maxNumber = 1;

  const ref = useRef<HTMLDivElement>(null);

  console.log('logo',{logo});
  useEffect(() => {
    const addCollection = async () => {
      const userId = "";
      createCollection(
        filesUrl[0],
        "Access Pass Test",
        "Description",
        "",
        accessPassData.price,
        1,
        userId
      ).then((response) => {
        console.log("then create Access Pass", response);
        // setMintResponse(response);
        // setFormFields(defaultFormFields);
        // setFiles([]);
      });
    };

    if (filesUrl.length > 0) {
      console.log("mint hhook IF");
      addCollection();
    }
    // eslint-disable-next-line
  }, [filesUrl]);

  const backgrounColorChange: MouseEventHandler<HTMLButtonElement> = async (
    e: any
  ) => {
    const color = e.target.value;
    setAccessPassData({ ...accessPassData, backgroundColor: color });
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccessPassData({ ...accessPassData, [name]: value });
  };

  const createTicket = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    htmlToImage
      .toBlob(ref.current, { cacheBust: true })
      .then((blob) => {
        console.log(blob);
        if (blob) {
          let files = [];
          files.push(blob);
          addFilesToStorage(files, setUploadProgress, setFilesUrl);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setLogo(imageList as never[]);
    if (imageList.length > 0) {
      console.log('jajaj;',imageList[0].dataURL);
      setAccessPassData({ ...accessPassData, logo: imageList[0].dataURL! });
    }
    
  };

  return (
    <div className="create-access-pass-container">
      {/* <img src={TicketFront} id='img-ticket' alt='ticket'/> */}
      <div
        ref={ref}
        style={{
          height: "480px",
          width: "305px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <AccessPass {...accessPassData} />
      </div>
      <form>
        <BasicInput
          label="Price"
          name="price"
          placeholder="Access Pass Price"
          required={false}
          type="text"
          onChange={onChangeHandler}
        />
      </form>
      <ImageUploading
        multiple
        value={logo}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
          </div>
        )}
      </ImageUploading>
      <button value="red" onClick={backgrounColorChange}>
        Red
      </button>
      <button value="blue" onClick={backgrounColorChange}>
        Blue
      </button>
      <button onClick={createTicket}>Create</button>
    </div>
  );
};

export default CreateAccessPass;
