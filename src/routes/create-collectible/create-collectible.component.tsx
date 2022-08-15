import { useState, ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";

import CircularProgress from "@mui/material/CircularProgress";
import CircularProgressWithLabel from "../../components/progress-with-label/progress-with-label.component";
import {
  // checkLogin,
  createCollection,
  // getStripeAuthLink,
  // getUserByPhoneNumber,
} from "../../utils/mint-interface/mint-inteface.utils";

import { selectCurrentUser } from "../../store/user/user.selector";
import { addFilesToStorage } from "../../utils/firebase/firebase.utils";
import { ApiResponseType, TokenTypeEnum } from "../../types";

import "./create-collectible.styles.scss";
import CreateResult from "../../components/create-result/create-result.component";

import NewUserAlert from "../../components/new-user-alert/new-user-alert.component";
import {
  loadLocalState,
  saveLocalState,
} from "../../utils/storage/local-storage.utils";
import Button from "../../components/button/button.component";

const defaultFormFields = {
  title: "",
  description: "",
  link: "",
  rate: "",
  supply: 0,
  perks: "",
  creatorRoyalty: "",
  additionalDetails: "",
  gift: false,
};

const defaultMintResponse: ApiResponseType | null = {
  data: undefined,
  status: 0,
};

enum LOCAL_STORAGE {
  FILES = "filesURL",
  FORM_FIELDS = "formFields",
}

const CreateCollectible = (props: any) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [filesUrl, setFilesUrl] = useState<string[]>([]);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [giftChecked, setGiftChecked] = useState(false);
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);

  const [mintResponse, setMintResponse] = useState<ApiResponseType | null>(
    defaultMintResponse
  );

  const { redirect } = useParams();

  const userData = useSelector(selectCurrentUser);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addFilesToStorage(files, setUploadProgress, setFilesUrl);
  };

  useEffect(() => {
    if (redirect && filesUrl.length === 0) {
      setUploadProgress(100);
      setFilesUrl(loadLocalState(LOCAL_STORAGE.FILES));
      setFormFields(loadLocalState(LOCAL_STORAGE.FORM_FIELDS));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  useEffect(() => {
    console.log("USEFFECT FILES URL", filesUrl);
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
      } = formFields;

      const mintData = await createCollection(
        filesUrl[0],
        title,
        description,
        link,
        rate ? parseInt(rate) : 0,
        supply,
        userId,
        TokenTypeEnum.COLLECTION,
        perks,
        creatorRoyalty ? parseInt(creatorRoyalty) : 0,
        additionalDetails
      );

      console.log("createCollection response:", mintData);

      setMintResponse(mintData);
      setFormFields(defaultFormFields);
      setFiles([]);
    };

    if (filesUrl.length > 0) {
      if (userData) {
        saveLocalState("", LOCAL_STORAGE.FILES);
        saveLocalState("", LOCAL_STORAGE.FORM_FIELDS);
        addCollection();
      } else {
        saveLocalState(filesUrl, LOCAL_STORAGE.FILES);
        saveLocalState(formFields, LOCAL_STORAGE.FORM_FIELDS);
        setIsCreatingNewUser(true);
      }
    }

    // eslint-disable-next-line
  }, [filesUrl, userData]);

  const updateFiles = (incommingFiles: FileValidated[]) => {
    setFiles(incommingFiles);
  };

  const handleDelete = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "gift") {
      setFormFields({
        ...formFields,
        [name]: !giftChecked,
        rate: "",
        creatorRoyalty: "",
      });
      setGiftChecked(!giftChecked);
    } else {
      setFormFields({ ...formFields, [name]: value });
    }
  };

  const handleAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const increaseSupply = () => {
    const value = parseInt(formFields.supply+"") + 1;
    console.log(value);
    setFormFields({ ...formFields, supply : value })
  }

  const decreaseSupply = () => {
    const value = formFields.supply;
    if (value > 0) {
      setFormFields({ ...formFields, supply : value - 1})
    }
    
  }
  
  
  return (
    <div className="create-collective">
      {isCreatingNewUser ? (
        <>
          <NewUserAlert
            openAlert={isCreatingNewUser}
            redirect="/nfts/create-collectible/redirect"
          />
        </>
      ) : (
        <>
          <h2 className="form__title">Create Collectible</h2>
          <form className="form" onSubmit={handleSubmit}>
            {uploadProgress > 0 ? (
              <div>
                {uploadProgress < 100 &&
                  mintResponse &&
                  mintResponse.status === 0 && (
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
                        <div className="create-result">
                          <h1 className="success">Success!</h1>
                          <h2>Collectible listed</h2>

                          <Button
                            label="Share"
                            onClick={() =>
                              window.open(
                                `/checkout/${mintResponse.data.uuid}`,
                                "_blank"
                              )
                            }
                          />

                          {userData && <CreateResult uuid={userData.uuid} />}
                        </div>
                      )
                    ) : (
                      <div>Error</div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="basic">
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
                    onChange={handleInputChange}
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
                    name="additionalDetails"
                    placeholder="Additional Details*"
                    required={false}
                    onChange={handleAreaChange}
                  />

                  <div className="form--row">
                    <label className="basic-checkbox">
                      <input
                        type="checkbox"
                        name="gift"
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Gift
                    </label>
                    <input
                      className="basic-input"
                      name="rate"
                      value={formFields.rate}
                      placeholder="Price*"
                      required={true}
                      type="number"
                      onChange={handleInputChange}
                      disabled={giftChecked}
                    />
                  </div>

                  <input
                    className="basic-input"
                    name="creatorRoyalty"
                    placeholder="Creator Royalty*"
                    required={true}
                    type="number"
                    onChange={handleInputChange}
                    disabled={giftChecked}
                  />
                  <h4>Optional</h4>
                  <input
                    className="basic-input"
                    name="perks"
                    placeholder="Perk Name"
                    required={false}
                    type="text"
                    onChange={handleInputChange}
                  />
                  <input
                    className="basic-input"
                    name="link"
                    placeholder="Link to unlisted youtube, exclusive Discord chat or file to download"
                    required={false}
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="quantity">
                  <div className="quantity__button quantity__button--decrease" 
                   onClick={decreaseSupply}>
                    -
                  </div>
                  <input
                    className="quantity__number"
                    placeholder="0"
                    name="supply"
                    type="number"
                    value={formFields.supply}
                    onChange={handleInputChange}
                  />
                  <div className="quantity__button quantity__button--increase"
                    onClick={increaseSupply}>
                    +
                  </div>
                  <button
                    className="form__button"
                    disabled={
                      files.length === 0 ||
                      formFields.title === "" ||
                      formFields.supply === 0
                    }
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default CreateCollectible;
