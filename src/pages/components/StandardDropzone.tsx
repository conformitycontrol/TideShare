import { useCallback, useMemo, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import axios from "axios";

import { api } from "~/utils/api";
import { Box, Button, Container, Stack } from "@mui/material";
import { Fullscreen } from "@mui/icons-material";

export const StandardDropzone = () => {
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
  const { mutateAsync: fetchPresignedUrls } =
    api.s3.getStandardUploadPresignedUrl.useMutation();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const apiUtils = api.useContext();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      maxFiles: 1,
      maxSize: 5 * 2 ** 30, // roughly 5GB
      multiple: false,
      onDropAccepted: (files, _event) => {
        const file = files[0] as File;

        fetchPresignedUrls({
          key: file.name,
        })
          .then((url) => {
            setPresignedUrl(url);
            setSubmitDisabled(false);
          })
          .catch((err) => console.error(err));
      },
    });

  const files = useMemo(() => {
    if (!submitDisabled)
      return acceptedFiles.map((file) => (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ));
    return null;
  }, [acceptedFiles, submitDisabled]);

  const handleSubmit = useCallback(async () => {
    if (acceptedFiles.length > 0 && presignedUrl !== null) {
      const file = acceptedFiles[0] as File;
      await axios
        .put(presignedUrl, file.slice(), {
          headers: { "Content-Type": file.type },
        })
        .then((response) => {
          console.log(response);
          console.log("Successfully uploaded ", file.name);
        })
        .catch((err) => console.error(err));
      setSubmitDisabled(true);
      await apiUtils.s3.getObjects.invalidate();
    }
  }, [acceptedFiles, apiUtils.s3.getObjects, presignedUrl]);

  return (
    <Stack direction="column">
      <Box  sx={{ p: 3, backgroundColor: "#a9a9a9", width: "300px", height: "300px"}}{...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Box sx={{ backgroundColor: "#a9a9a9"}}>Drop the file here</Box>
        ) : (
          <Box>Drag and drop files here, or click to select files</Box>
        )}
      </Box>
      <aside>
        <h4>Files pending upload</h4>
        <ul>{files}</ul>
      </aside>
      <Button
        
        variant="outlined"
        sx={{ mb: 3, width: "300px", color: "#000000" }}
        onClick={() => void handleSubmit()}
        disabled={
          presignedUrl === null || acceptedFiles.length === 0 || submitDisabled
        }
      >
        Upload
      </Button>
    </Stack>
  );
};
