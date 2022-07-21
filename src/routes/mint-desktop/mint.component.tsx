import { useState, ChangeEvent } from "react";
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {
  AreaInput,
  BasicInput,
  SpecialInput,
  MintButton,
} from "../../components/mint-input/mint-input.component";

import "./mint.styles.scss";

const Mint = () => {
  const [files, setFiles] = useState<FileValidated[]>([]);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // todo
  };

  const updateFiles = (incommingFiles: FileValidated[]) => {
    setFiles(incommingFiles);
  };

  const handleDelete = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mint-container">
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <h1>Drag and Drop your NFT file</h1>
          <Dropzone
            onChange={updateFiles}
            value={files}
            //onClean
            accept={"audio/*, video/*, image/*"}
            maxFileSize={104857600}
            label={"Drop Files here\nor click to browse"}
            minHeight={"195px"}
            maxHeight={"500px"}
            disableScroll
            style={{ marginBottom: "20%" }}
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
            label="Name *"
            name="name"
            placeholder="Item name"
            required={true}
            type="text"
          />
          <AreaInput
            label="Description *"
            name="description"
            placeholder="Fill in the detailed desceiption of your NFT"
            required={true}
            type="text"
          />
          <BasicInput
            label="External link *"
            name="external-link"
            placeholder="Ex: https://www.harmony.one"
            required={true}
            type="text"
          />
        </Stack>

        <Divider orientation="vertical" flexItem variant="middle">
          <h1 className='column-divider'>and</h1>
        </Divider>

        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <h1>Choose Quantity and Price</h1>
          <SpecialInput
            label="Amount *"
            name="amount"
            placeholder="0"
            required={true}
            type="number"
          />
          
          <SpecialInput
            label="Price *"
            name="price"
            placeholder="0"
            required={true}
            type="number"
          />
          <MintButton label={"Create"} />
        </Stack>
      </div>
    </form>
  );
};

export default Mint;
