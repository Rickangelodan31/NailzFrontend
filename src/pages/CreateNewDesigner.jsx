import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
const CreateNewDesigner = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [telephone, setTelephone] = useState(0);
  const { token } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = new FormData();
    const image = event.target.image.files[0];
    fData.append("description", description);
    fData.append("title", title);
    fData.append("style", style);
    fData.append("telephone", telephone);
    fData.append("image", image);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Designer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        {" "}
        <label>
          {" "}
          Description{" "}
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          {" "}
          Title{" "}
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          {" "}
          Style{" "}
          <input
            type="text"
            value={style}
            onChange={(event) => setStyle(event.target.value)}
          />
        </label>
        <label>
          {" "}
          Image <input type="file" name="image" accept="image/jpg, image/png" />
        </label>
        <label>
          {" "}
          Phone Number{" "}
          <input
            type="number"
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
};

export default CreateNewDesigner;
