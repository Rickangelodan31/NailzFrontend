import { useRef, useState } from "react";
import { Button, Group } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";

const ProfilePage = () => {
  const [files, setFiles] = useState([]); // State to store dropped files
  const dropzoneRef = useRef();

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };
  return (
    <>
      <h1>Profile</h1>
      <Dropzone
        ref={dropzoneRef}
        onDrop={handleDrop}
        accept={[IMAGE_MIME_TYPE]}
      ></Dropzone>

      <Group justify="center" mt="md">
        <Button onClick={() => dropzoneRef.current.open()}>Select files</Button>
      </Group>

      <div>
        {files.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </>
  );
};

export default ProfilePage;
