import { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";

import CircularProgress from "@mui/material/CircularProgress";
import CircularProgressWithLabel from "../../components/progress-with-label/progress-with-label.component";
import {
  checkLogin,
  createCollection,
  getStripeAuthLink,
  getUserByPhoneNumber,
} from "../../utils/mint-interface/mint-inteface.utils";

import { selectCurrentUser } from "../../store/user/user.selector";
import { addFilesToStorage } from "../../utils/firebase/firebase.utils";
import { ApiResponseType, TokenTypeEnum } from "../../types";

import "./create-collectible.styles.scss";

const defaultFormFields = {
  title: "",
  description: "",
  link: "",
  quantity: 0,
  price: 0,
  perk: '',
  details: '',
  royalty: 0,
};

const defaultMintResponse: ApiResponseType | null = {
  data: undefined,
  status: 0,
};

//const BASE_URL = process.env.REACT_APP_BASE_URL;

const CreateCollectible = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [filesUrl, setFilesUrl] = useState<string[]>([]);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [mintResponse, setMintResponse] = useState<ApiResponseType | null>(
    defaultMintResponse
  );

  const userData = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  const { title, description, link, quantity, price, perk, royalty, details } = formFields;

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addFilesToStorage(files, setUploadProgress, setFilesUrl);
  };

  // TODO: remove hardcoded number after SMS login refactoring (login first, then create collection)
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const data = await getUserByPhoneNumber("+6584901105");
  //       console.log("user:", data);
  //     } catch (e) {
  //       console.log("Cannot get user by phone number", e);
  //     }
  //   };

  //   getUser();
  // }, []);

  const connectStripe = async () => {
    try {
      const stripeLink = await getStripeAuthLink();
      console.log("Stripe auth link:", stripeLink);
      window.open(stripeLink);
    } catch (e) {
      console.log("Cannot get Stripe link", e);
    }
  };

  useEffect(() => {
    console.log(
      "useEffect addCollection",
      title,
      description,
      link,
      quantity,
      price
    );
    const addCollection = async () => {
      const userId = userData ? userData.uuid : "";

      //const loginData = await checkLogin();
      // setUserData(loginData);
      // console.log("loginData", loginData);

      const mintData = await createCollection(
        filesUrl[0],
        title,
        description,
        link,
        price,
        quantity,
        userId,
        TokenTypeEnum.COLLECTION,
        perk,
        royalty,
        details
      );

      console.log("createCollection response:", mintData);

      setMintResponse(mintData);
      setFormFields(defaultFormFields);
      setFiles([]);
    };

    if (filesUrl.length > 0) {
      console.log("mint hhook IF");
      addCollection();
    }
    // eslint-disable-next-line
  }, [filesUrl]);

  const updateFiles = (incommingFiles: FileValidated[]) => {
    setFiles(incommingFiles);
  };

  const handleDelete = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="create-collective">
      <h2 className="create-collective__subtitle">Create Collectible</h2>
      <form className="create-collective__form" onSubmit={handleSubmit}>
        {uploadProgress > 0 ? (
          <div>
            {uploadProgress < 100 && mintResponse && mintResponse.status === 0 && (
              <>
                <h2>Uploading media...</h2>
                <CircularProgressWithLabel value={uploadProgress} />
              </>
            )}
            {uploadProgress === 100 && (
              <>
                {mintResponse ? (
                  mintResponse.status === 0 ? (
                    <>
                      <h2>Creating Collection...</h2>
                      <CircularProgress />
                    </>
                  ) : (
                    <>
                      <h1 className="success">Success!</h1>
                      <h2>Collectible listed</h2>
                      <p>
                        <Link
                          to={`checkout/${mintResponse.data.uuid}`}
                          target="_blank"
                        >
                          SHARE
                        </Link>
                      </p>
                      {userData && ( // TODO: add condition && !userData.stripeConnected
                        <>
                          <h2 className="important">Important:</h2>
                          <div className="create-collective__message">
                            <h2>
                              In order to sell your collectible or access pass,
                              you must first
                            </h2>
                          </div>
                          <h1 className="create-collective__stripe" onClick={connectStripe}>
                            Setup Stripe
                          </h1>
                          <div>
                            <h2>Skip to</h2>
                            <h2
                              className="create-collective__gallery"
                              onClick={() =>
                                navigate(`/nfts/gallery/${userData.uuid}`)
                              }
                            >
                              View Gallery
                            </h2>
                          </div>
                        </>
                      )}
                    </>
                  )
                ) : (
                  <div>Error</div>
                )}
              </>
            )}
          </div>
        ) : (
          <div>
            <Dropzone
              onChange={updateFiles}
              value={files}
              accept={"image/*"} //
              maxFileSize={104857600}
              label={"Drop Files here\nor click to browse"}
              minHeight={"195px"}
              maxHeight={"500px"}
              disableScroll
              footer={true}
              maxFiles={1}
              style={{ marginBottom: "5%" }}
            >
              {files.map((file) => (
                <FileItem
                  {...file}
                  key={file.id}
                  onDelete={handleDelete}
                  alwaysActive
                  preview
                  info
                  elevation={1}
                  resultOnTooltip
                />
              ))}
            </Dropzone>
            <div className="basic">
              <input
                className="basic-input"
                name="title"
                placeholder="Collectible or Collection Name*"
                required={true}
                type="text"
                onChange={onChangeHandler}
              />
              <textarea
                className="area-input"
                name="description"
                placeholder="Elaborate on the story or purpose*"
                required={false}
                onChange={handleAreaChange}
              />
              <textarea
                className="area-input"
                name="details"
                placeholder="Additional Details*"
                required={false}
                onChange={handleAreaChange}
              />

              <div className="create-collective__form--row">
                <label className="basic-checkbox">
                  <input type="checkbox" name="gift" value="gift" />
                  <span className="checkmark"></span>
                  Gift
                </label>
                <input
                  className="basic-input"
                  name="price"
                  placeholder="Price*"
                  required={true}
                  type="number"
                  onChange={onChangeHandler}
                />
              </div>

              <input
                className="basic-input"
                name="royalty"
                placeholder="Creator Royalty*"
                required={true}
                type="text"
                onChange={onChangeHandler}
              />
              <h4>Optional</h4>
              <input
                className="basic-input"
                name="perk"
                placeholder="Perk Name"
                required={false}
                type="text"
                onChange={onChangeHandler}
              />
              <input
                className="basic-input"
                name="link"
                placeholder="Link to unlisted youtube, exclusive Discord chat or file to download"
                required={false}
                type="text"
                onChange={onChangeHandler}
              />
            </div>
            <h3 className="create-collective__subtitle">Choose Quantity</h3>
            <div className="quantity">
              <input
                className="special-input"
                name="quantity"
                placeholder="0"
                required={true}
                type="number"
                onChange={onChangeHandler}
              />

              <button
                className="create-collective__button"
                disabled={files.length === 0 || title === "" || quantity === 0}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCollectible;
