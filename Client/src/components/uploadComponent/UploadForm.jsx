import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Upload.css";

const UploadForm = () => {
  const [result, setResult] = useState("");
  const [pitchDeck, setPitchDeck] = useState(null);
  const [displayContent, setDisplayContent] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      setPitchDeck(response.data);
      setResult("File uploaded successfully");
      setDisplayContent(false);
      setUploaded(true);
      toast.success("File uploaded successfully");
    } catch (error) {
      setResult("Error occurred during upload: " + error.message);
      toast.error("Error occurred during upload: " + error.message);
    }
  };

  const handleDisplayContent = () => {
    setDisplayContent(!displayContent);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchPitchDeck = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pitchdecks");
        if (response.data.length > 0) {
          setPitchDeck(response.data[0]);
          setUploaded(true);
          setDisplayContent(false); // Set displayContent to false initially
        } else {
          setPitchDeck(null);
          setResult("");
          setUploaded(false);
        }
      } catch (error) {
        setResult("");
        setUploaded(false);
        setDisplayContent(false);
        toast.error(
          "Error occurred while fetching pitch deck: " + error.message
        );
      }
    };

    fetchPitchDeck();
  }, []);

  useEffect(() => {
    // Clear pitch deck and display content when the component unmounts
    return () => {
      setPitchDeck(null);
      setDisplayContent(false);
    };
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="container">
      <h1>Pitch Deck Upload</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="file-input-wrapper">
          <label htmlFor="file" className="file-label">
            <span>Choose a PDF, PowerPoint file or Docx</span>
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="file-input"
            onChange={handleFileChange}
          />

          <span className="selected-file-name">
            {selectedFile ? selectedFile.name : "No file selected"}
          </span>
        </div>
        <button type="submit" className="upload-button">
          Upload
        </button>
        {uploaded && (
          <button onClick={handleRefresh} className="refresh-button">
            Refresh
          </button>
        )}
      </form>

      <ToastContainer />
      {uploaded && result === "File uploaded successfully" && pitchDeck && (
        <div className="pitch-deck">
          <h2>Uploaded Pitch Deck</h2>
          <button
            onClick={handleDisplayContent}
            className="display-button"
            style={{ display: "block" }}
          >
            {displayContent ? "Close Content" : "Display Content"}
          </button>
          {displayContent && (
            <div className="content">
              <h3>Title:</h3>
              <p>{pitchDeck.title}</p>
              <h3>Content:</h3>
              <p>{pitchDeck.content}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
