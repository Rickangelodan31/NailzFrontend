import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";


const CreateNewDesign = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [price, setPrice] = useState("");
  const [telephone, setTelephone] = useState("");
  const { token } = useContext(SessionContext);
  const [error, setError] = useState(null);

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleTelephoneChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setTelephone(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = new FormData();
    const image = event.target.image.files[0];
    fData.append("description", description);
    fData.append("title", title);
    fData.append("style", style);
    fData.append("telephone", telephone);
    fData.append("image", image);
    fData.append("price", price);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/designers`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/profile");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create design post");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`Error: ${error.message}`);
    }
  };
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Style
          <input
            type="text"
            value={style}
            onChange={(event) => setStyle(event.target.value)}
          />
        </label>
        <label>
          Image
          <input type="file" name="image" accept="image/jpg, image/png" />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
        </label>
        <label>
          Phone Number
          <input
            type="number"
            value={telephone}
            onChange={handleTelephoneChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleBack}>Back</button>

    </div>
  );
};

export default CreateNewDesign;
