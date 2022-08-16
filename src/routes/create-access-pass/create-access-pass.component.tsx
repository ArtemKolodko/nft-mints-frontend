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
import DatePicker from "react-datepicker";

import AccessPass, {
  AccessPassProps,
} from "../../components/acess-pass/access-pass.component";
import { BasicInput } from "../../components/input/basic-input.component";
import { BasicAreaInput } from "../../components/input/basic-area-input.component";
import { addFilesToStorage } from "../../utils/firebase/firebase.utils";
import { createCollection } from "../../utils/mint-interface/mint-inteface.utils";
import uploadArrow from "../../assets/imgs/upload_arrow.svg";

import "react-datepicker/dist/react-datepicker.css";
import "./create-access-pass.styles.scss";

import Logo from "../../assets/imgs/dj3n_logo.svg";
import QR from "../../assets/imgs/qr-sample.png";

import { ApiResponseType, TokenTypeEnum } from "../../types";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const defaultAccessPassData = {
  title: "",
  description: "",
  link: "",
  rate: "",
  supply: 0,
  perks: "",
  creatorRoyalty: "",
  additionalDetails: "",
  gift: false,
  primaryBackgroundColor: "#288bc2",
  secondaryBackgroundColor: "#2732F3",
  //textColor: "#D0D0D0",
  logo: "",
  venue: "",
  city: "",
  state: "",
  age: "",
  date: "",
  time: "",
};

const defaultMintResponse: ApiResponseType | null = {
  data: undefined,
  status: 0,
};

const CreateAccessPass = () => {
  const [accessPassData, setAccessPassData] = useState(defaultAccessPassData);
  const [giftChecked, setGiftChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filesToUpload, setFilesToUpload] = useState<Blob[]>([]);
  const [filesUrl, setFilesUrl] = useState<string[]>([]);
  const [logo, setLogo] = useState([]);
  const [mintResponse, setMintResponse] = useState<ApiResponseType | null>(
    defaultMintResponse
  );
  const [ ticketFronImg, setTicketFrontImage ] = useState<Blob>();
  const [ ticketBackImg, setTicketBackImage ] = useState<Blob>();
  
  const [ ticketTextColor, setTicketTextColor ] = useState("#D0D0D0");
  const maxNumber = 1;

  const refFront = useRef<HTMLDivElement>(null);
  const refBack = useRef<HTMLDivElement>(null);

  const userData = useSelector(selectCurrentUser);

  useEffect(() => {
    const addCollection = async () => {
      const userId = userData ? userData.uuid : "";
      const {
        title,
        description,
        link,
        rate,
        supply,
        perks,
        creatorRoyalty,
        additionalDetails,
        venue,
        city,
        state,
        age,
        date,
        time,
      } = accessPassData;

      const mintData = await createCollection(
        filesUrl[0],
        title,
        description,
        link,
        rate ? parseInt(rate) : 0,
        supply,
        userId,
        TokenTypeEnum.ACCESS_PASS,
        perks,
        creatorRoyalty ? parseInt(creatorRoyalty) : 0,
        additionalDetails,
        filesUrl,
        {
          venue,
          city,
          state,
          age,
          date,
          time,
        }
      );

      console.log("then create Access Pass", mintData);
      setMintResponse(mintData);
      setAccessPassData(accessPassData);
    };

    if (filesUrl.length > 0) {
      console.log("mint hhook IF", filesUrl);
      //addCollection();
      //setFilesUrl([]);
    }
    // eslint-disable-next-line
  }, [filesUrl]);

  const backgrounColorChange: MouseEventHandler<HTMLButtonElement> = async (
    e: any
  ) => {
    const color = e.target.value;
    setAccessPassData({ ...accessPassData, primaryBackgroundColor: color });
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "gift") {
      setAccessPassData({
        ...accessPassData,
        [name]: !giftChecked,
        rate: "",
        creatorRoyalty: "",
      });
      setGiftChecked(!giftChecked);
    } else {
      setAccessPassData({ ...accessPassData, [name]: value });
    }
  };

  const onAreaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAccessPassData({ ...accessPassData, [name]: value });
    // setFormFields({ ...formFields, [name]: value });
  };

  const increaseSupply = () => {
    const value = parseInt(accessPassData.supply + "") + 1;
    setAccessPassData({ ...accessPassData, supply: value });
  };

  const decreaseSupply = () => {
    const value = accessPassData.supply;
    if (value > 0) {
      setAccessPassData({ ...accessPassData, supply: value - 1 });
    }
  };


  useEffect(() => {

    if (ticketFronImg && ticketBackImg) {
    
      console.log("readyToDownload");
      addFilesToStorage([ticketFronImg, ticketBackImg], setUploadProgress, setFilesUrl);
      setFilesToUpload([]);
    
    }
    
  }, [ticketFronImg, ticketBackImg]);

  const createTicket = useCallback(() => {
    if (refFront.current === null || refBack.current === null) {
      return;
    }

    htmlToImage
      .toBlob(refFront.current, { cacheBust: true })
      .then((blob) => {
        console.log('BLOB1',blob);
        if (blob) {
          // let files = [];
          // files.push(blob);
          setTicketFrontImage(blob);
          //setFilesToUpload([blob]);
          //addFilesToStorage(files, setUploadProgress, setFilesUrl);
        }
      })
      .catch((err) => {
        console.log(err);
      }) ;

    htmlToImage
      .toBlob(refBack.current, { cacheBust: true })
      .then((blob) => {
        console.log('BLOB1',blob);
        if (blob) {
          // let files = [];
          // files.push(blob);
          setTicketBackImage(blob);
          //setFilesToUpload([blob]);
          //addFilesToStorage(files, setUploadProgress, setFilesUrl);
        }
      })
      .catch((err) => {
        console.log(err);
      }) ;  

    // setTimeout(function () {
    //     console.log("after all promises", fileUrl[0]);
    //     setFilesUrl(fileUrl);
    //     console.log(x);
    // }, 2000);
   
  }, [refFront, refBack]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {

    setLogo(imageList as never[]);
    if (imageList.length > 0) {
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
      <h2 className="form__title">Create Access Pass</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="basic">
          <BasicInput
            name="title"
            placeholder="Artits or Name*"
            required={true}
            type="text"
            onChange={onChangeHandler}
          />
          <BasicInput
            name="perks"
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
            name="additionalDetails"
            placeholder="Additional Details*"
            required={true}
            type="text"
            onChange={onAreaChangeHandler}
          />
          <div className="form--row">
            <label className="basic-checkbox">
              <input type="checkbox" name="gift" onChange={onChangeHandler} />
              <span className="checkmark"></span>
              Gift
            </label>
            <input
              className="basic-input"
              name="rate"
              value={accessPassData.rate}
              placeholder="Price*"
              required={true}
              type="number"
              onChange={onChangeHandler}
              disabled={giftChecked}
            />
          </div>

          <input
            className="basic-input"
            name="creatorRoyalty"
            placeholder="Creator Royalty*"
            required={true}
            type="number"
            onChange={onChangeHandler}
            disabled={giftChecked}
          />
          <h4>Optional:</h4>

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
                className="form__logo-wrapper"
                onClick={
                  imageList.length > 0 ? onImageRemoveAll : onImageUpload
                }
                {...dragProps}
              >
                {imageList.length > 0 ? (
                  <div className="upload-image">
                    <img src={imageList[0].dataURL} alt="" />
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
          <DatePicker
            className="basic-input"
            name="date"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
          <BasicInput
            name="age"
            placeholder="Age Restriction*"
            required={false}
            type="number"
            onChange={onChangeHandler}
          />
          <div className="form__colors">
            <div>
              <label htmlFor="pass">Access Pass color</label>
              <input
                type="color"
                id="pass"
                name="primaryBackgroundColor"
                value="#27f338"// "#2732F3" //{accessPassData.primaryBackgroundColor} 
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label htmlFor="secondary">Secondary color</label>
              <input
                type="color"
                id="secondary"
                name="secondaryBackgroundColor"
                value={accessPassData.secondaryBackgroundColor}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label htmlFor="text">Text Color</label>
              <input
                type="color"
                id="textColor"
                name="text"
                value={ticketTextColor} //{accessPassData.textColor}
                onChange={(e) => setTicketTextColor(e.target.value)} // onChangeHandler}
              />
            </div>
          </div>
          <AccessPass
            refFront={refFront}
            refBack={refBack}
            textColor={ticketTextColor}
            {...accessPassData}
          />
          <h3>Quantity</h3>
          <div className="quantity">
            <div className="quantity__button quantity__button--decrease">-</div>
            <input
                    className="quantity__number"
                    placeholder="0"
                    name="supply"
                    type="number"
                    value={accessPassData.supply}
                    onChange={onChangeHandler}
                  />
            {/* <input className="quantity__number" type="number " value="0" /> */}
            <div className="quantity__button quantity__button--increase">+</div>
          </div>

          <button
            className="form__button"
            disabled={accessPassData.title === ""}
            onClick={createTicket}
          >
            Continue
          </button>
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
