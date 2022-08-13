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
import { BasicInput } from "../../components/input/basic-input.component";
import { addFilesToStorage } from "../../utils/firebase/firebase.utils";
import { createCollection } from "../../utils/mint-interface/mint-inteface.utils";
import uploadArrow from "../../assets/imgs/upload_arrow.svg";


import { BasicAreaInput } from "../../components/input/basic-area-input.component";

import "./create-access-pass.styles.scss";
const defaultAccessPassData = {
  backgroundColor: "white",
  price: 0,
  logo: "",
};

const CreateAccessPass = () => {
  const [accessPassData, setAccessPassData] = useState<AccessPassProps>(
    defaultAccessPassData
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filesUrl, setFilesUrl] = useState<string[]>([]);
  const [logo, setLogo] = useState([]);
  const maxNumber = 1;

  const ref = useRef<HTMLDivElement>(null);

  console.log("logo", { logo });
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

  const onAreaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAccessPassData({ ...accessPassData, [name]: value });
    // setFormFields({ ...formFields, [name]: value });
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
    console.log(imageList, addUpdateIndex);
    setLogo(imageList as never[]);
    if (imageList.length > 0) {
      console.log("jajaj;", imageList[0].dataURL);
      setAccessPassData({ ...accessPassData, logo: imageList[0].dataURL! });
    } else {
      setAccessPassData({ ...accessPassData, logo: "" });
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    //await addFilesToStorage(files, setUploadProgress, setFilesUrl);
  };

  return (
    <div className="create-access-pass">
      <h2 className="create-access-pass__subtitle">Create Access Pass</h2>
      <form className="create-access-pass__form" onSubmit={handleSubmit}>
        <div>
          <div className="basic">
            <BasicInput
              name="title"
              placeholder="Artits or Name*"
              required={true}
              type="text"
              onChange={onChangeHandler}
            />
            <BasicInput
              name="perk"
              placeholder="Perk Name*"
              required={true}
              type="text"
              onChange={onChangeHandler}
            />
            <BasicAreaInput
              name="description"
              placeholder="Description*"
              required={true}
              type="text"
              onChange={onAreaChangeHandler}
            />
            <BasicAreaInput
              name="details"
              placeholder="Additional Details*"
              required={true}
              type="text"
              onChange={onAreaChangeHandler}
            />

            {/* <div className="create-access-pass__form--row">
              <label className="basic-checkbox">
                <input type="checkbox" name="gift" value="gift" />
                <span className="checkmark"></span>
                Gift
              </label>
              <BasicInput
                name="price"
                placeholder="Price *"
                required={true}
                type="number"
                onChange={onChangeHandler}
              />
            </div> */}
            <h4>Optional:</h4>
            <br />
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
                // onImageUpdate,
                // onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div
                  className="create-access-pass__form__logo-wrapper"
                  onClick={
                    imageList.length > 0 ? onImageRemoveAll : onImageUpload
                  }
                  {...dragProps}
                >
                  {imageList.length > 0 ? (
                    <div>
                      <img src={imageList[0].dataURL} alt="" width="100" />
                    </div>
                  ) : (
                    <>
                      <div className="upload-icon">
                        <img src={uploadArrow} alt="upload" />
                      </div>
                      <div className="upload-text">
                        Upload Logo or Artwork
                        <br />
                        Max 276px wide
                        <br />
                        Max 80px high
                      </div>
                    </>
                  )}
                </div>
              )}
            </ImageUploading>
            <BasicInput 
              name="link"
              placeholder="External link (exclusive content)"
              required={false}
              type="text"
              onChange={onChangeHandler}
            />
            <BasicInput 
              name="venue"
              placeholder="Venue or Place"
              required={false}
              type="text"
              onChange={onChangeHandler}
            />
            <BasicInput 
              name="city"
              placeholder="City"
              required={false}
              type="text"
              onChange={onChangeHandler}
            />
            <BasicInput 
              name="state"
              placeholder="State"
              required={false}
              type="text"
              onChange={onChangeHandler}
            />
          </div>

        </div>
      </form>
    </div>
    // <div className="create-access-pass-container">
    //   <div
    //     ref={ref}
    //     style={{
    //       height: "480px",
    //       width: "305px",
    //       marginTop: "10px",
    //       marginBottom: "10px",
    //     }}
    //   >
    //     <AccessPass {...accessPassData} />
    //   </div>
    //   <form>
    //     <BasicInput
    //       label="Price"
    //       name="price"
    //       placeholder="Access Pass Price"
    //       required={false}
    //       type="text"
    //       onChange={onChangeHandler}
    //     />
    //   </form>
    // <ImageUploading
    //   multiple
    //   value={logo}
    //   onChange={onChange}
    //   maxNumber={maxNumber}
    // >
    //   {({
    //     imageList,
    //     onImageUpload,
    //     onImageRemoveAll,
    //     // onImageUpdate,
    //     // onImageRemove,
    //     isDragging,
    //     dragProps,
    //   }) => (
    //     // write your building UI
    //     <div
    //       className="upload-logo-wrapper"
    //       onClick={imageList.length > 0 ? onImageRemoveAll : onImageUpload}
    //       {...dragProps}
    //     >
    //       {imageList.length > 0 ? (
    //         <div><img src={imageList[0].dataURL} alt="" width="100" /></div>
    //       ) : (
    //         <>
    //           <div className="upload-icon">
    //             <img src={uploadArrow} alt="upload" />
    //           </div>
    //           <div className="upload-text">
    //             Upload Logo or Artwork
    //             <br />
    //             Max 276px wide
    //             <br />
    //             Max 80px high
    //           </div>
    //         </>
    //       )}
    //     </div>
    //   )}
    // </ImageUploading>
    //   <button value="red" onClick={backgrounColorChange}>
    //     Red
    //   </button>
    //   <button value="blue" onClick={backgrounColorChange}>
    //     Blue
    //   </button>
    //   <button onClick={createTicket}>Create</button>
    // </div>
  );
};

export default CreateAccessPass;
