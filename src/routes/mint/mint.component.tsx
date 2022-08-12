import { useState, ChangeEvent, useEffect } from "react";
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate} from "react-router-dom";

import CircularProgressWithLabel from "../../components/progress-with-label/progress-with-label.component";
import {
  AreaInput,
  BasicInput,
  SpecialInput,
  Button,
} from "../../components/input/input.component";
import {
  checkLogin,
  createCollection, getStripeAuthLink,
  getUserByPhoneNumber,
  IUser
} from "../../utils/mint-interface/mint-inteface.utils";
import { addFilesToStorage } from "../../utils/firebase/firebase.utils";
import { ApiResponseType } from "../../types";

import Logo from "../../assets/imgs/DJ3N Logo.png"

import "./mint.styles.scss";
import {Box} from "@mui/material";

const defaultFormFields = {
  title: "",
  description: "",
  link: "",
  quantity: 0,
  price: 0,
};

const defaultMintResponse: ApiResponseType | null = {
  data: undefined,
  status: 0,
};

//const BASE_URL = process.env.REACT_APP_BASE_URL;

const Mint = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [filesUrl, setFilesUrl] = useState<string[]>([]);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [mintResponse, setMintResponse] = useState<ApiResponseType | null>(defaultMintResponse);
  const [userData, setUserData] = useState<IUser>();

  const navigate = useNavigate();

  const { title, description, link, quantity, price } = formFields;

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addFilesToStorage(files, setUploadProgress, setFilesUrl);
  }

  // TODO: remove hardcoded number after SMS login refactoring (login first, then create collection)
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getUserByPhoneNumber('+6584901105')
        console.log('user:', data)
      } catch(e) {
        console.log('Cannot get user by phone number', e)
      }
    }

    getUser()
  }, [])

  const connectStripe = async () => {
    try {
      const stripeLink = await getStripeAuthLink()
      console.log('Stripe auth link:', stripeLink)
      window.open(stripeLink)
    } catch (e) {
      console.log('Cannot get Stripe link', e)
    }
  }

  useEffect(() => {
    const addCollection = async () => {
      const userId = "";

      const loginData = await checkLogin()
      setUserData(loginData)
      console.log('loginData', loginData)

      const mintData = await createCollection(
        filesUrl[0],
        title,
        description,
        link,
        price,
        quantity,
        userId
      )

      console.log('createCollection response:', mintData);

      setMintResponse(mintData);
      setFormFields(defaultFormFields);
      setFiles([]);
    }

    if (filesUrl.length > 0) {
      console.log('mint hhook IF');
      addCollection();
    }
    // eslint-disable-next-line
  },[filesUrl])

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
      <div className="mint-container">
        <img src={Logo} alt="dj3n logo" />
        <form onSubmit={handleSubmit}>
        {uploadProgress > 0 ? (
          <div className="mint-processing-container">
            {uploadProgress < 100 && mintResponse && mintResponse.status === 0 &&
              <>
                <h2>Uploading media...</h2>
                <CircularProgressWithLabel value={uploadProgress} />
              </>
            }
            {uploadProgress === 100 && (
              <>
                { mintResponse ?
                  ( mintResponse.status === 0 ?
                    ( <>
                          <h2>Creating Collection...</h2>
                          <CircularProgress />
                    </>) : (
                      <>
                        <h1 style={{ color: '#2AB500' }}>Success!</h1>
                        <h2>Collectible listed</h2>
                        <p>
                          <Link to={`checkout/${mintResponse.data.uuid}`} target="_blank">
                            SHARE
                          </Link>
                        </p>
                        {userData  && // TODO: add condition && !userData.stripeConnected
                          <>
                            <h2 style={{ color: '#EA3339' }}>Important:</h2>
                            <Box width={'350px'}>
                              <h2>In order to sell your
                                collectible or access
                                pass, you must first
                              </h2>
                            </Box>
                            <h1 onClick={connectStripe} style={{ color: '#FEF200', textDecoration: 'underline' }}>
                              Setup Stripe
                            </h1>
                            <Box>
                              <h2>
                                Skip to
                              </h2>
                              <h2
                                  onClick={() => navigate(`/gallery/${userData.uuid}`)}
                                  style={{ textDecoration: 'underline' }}
                              >
                                View Gallery
                              </h2>
                            </Box>
                          </>
                        }
                      </>
                    )) :
                  (<div>Error</div>)
                  }
                </>
            )}
          </div>
        ) : (
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <h2>Upload Collectible</h2>
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

            <BasicInput
              label="Title *"
              name="title"
              placeholder="Item name"
              required={true}
              type="text"
              onChange={onChangeHandler}
            />
            <AreaInput
              label="Description"
              name="description"
              placeholder="Elaborate on the story or purpose"
              required={false}
              type="text"
              onChange={handleAreaChange}
            />
            <BasicInput
              label="Attach exclusive unlockable content"
              name="link"
              placeholder="Link to unlisted youtube, exclusive Discord chat or file to download"
              required={false}
              type="text"
              onChange={onChangeHandler}
            />
            <div className="quantity-price-container">
              <div className="quantity-price-title">
                {/* <h2>Choose Quantity and Price</h2> */}
                <h2>Choose Quantity</h2>
              </div>
              <div className="quantity-input">
                <SpecialInput
                  label="Quantity *"
                  name="quantity"
                  placeholder="0"
                  required={true}
                  type="number"
                  onChange={onChangeHandler}
                />

                {/* <SpecialInput
                  label="Price (USD)"
                  name="price"
                  placeholder="0"
                  required={false}
                  type="number"
                  onChange={onChangeHandler}
                /> */}
              </div>
            </div>
            <Button label={"Create"} disabled={(files.length === 0 || title === '' || quantity === 0)} />
          </Stack>
        )}
            </form>
      </div>

  );
};

export default Mint;

