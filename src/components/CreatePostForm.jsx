import React, { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

// Component for creating a new post
const CreatePostForm = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [price, setPrice] = useState("");
  const [telephone, setTelephone] = useState(0);
  const { token } = useContext(SessionContext);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = new FormData();
    const image = event.target.image.files[0];
    fData.append("description", description);
    fData.append("title", title);
    fData.append("style", style);
    fData.append("price", price);
    fData.append("telephone", telephone);
    fData.append("image", image);

    try {
      // Sending a POST request to the API endpoint
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Designers`, // API endpoint URL
        {
          method: "POST", // HTTP method
          headers: {
            Authorization: `Bearer ${token}`, // Authorization token
          },
          body: fData, // Form data
        }
      );
      if (response.ok) {
        // If the request is successful, navigate to the home page
        const data = await response.json();
        console.log(data); // Log the response data
        navigate("/"); // Navigate to the home page
      } else {
        // If there is an error, log the error message
        const errorData = await response.json();
        console.log("Error:", errorData);
      }
    } catch (error) {
      // If there is an error with the fetch operation, log the error
      console.log(error);
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      {/* Input for Description */}
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      {/* Input for Title */}
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      {/* Input for Style */}
      <label>
        Style
        <input
          type="text"
          value={style}
          onChange={(event) => setStyle(event.target.value)}
        />
      </label>
      {/* Input for Image */}
      <label>
        Image
        <input type="file" name="image" accept="image/jpg, image/png" />
      </label>
      {/* Input for Price */}
      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      {/* Input for Phone Number */}
      <label>
        Phone Number
        <input
          type="number"
          value={telephone}
          onChange={(event) => setTelephone(event.target.value)}
        />
      </label>
      {/* Submit button */}
      <button>Submit</button>
    </form>
  );
};

export default CreatePostForm;
