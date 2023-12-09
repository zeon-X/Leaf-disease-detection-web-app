"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image"; // Import next/image
import { imgpreview } from "../../public/assets";
import Swal from "sweetalert2";

const CropForm = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null); // To store the prediction result

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Display image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.showLoading();

    let API_ROOT = "http://localhost:8000";

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("model_name", selectedCrop);
    formData.append("file", selectedFile);

    try {
      let res = await axios.post(`${API_ROOT}/predict`, formData);
      // Display the class and confidence on the page
      setPredictionResult({
        class: res?.data?.class,
        confidence: res?.data?.confidence,
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the form.");
    }
    Swal.close();
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <div className="form-control w-full max-w-sm mb-2">
          <label className="label">
            <span className="label-text"> Select Crop:</span>
          </label>
          <select
            id="crop"
            name="crop"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="select select-sm select-bordered"
          >
            <option disabled selected>
              Select Crop
            </option>
            <option value="Rice">Rice</option>
            <option value="Corn">Corn</option>
            <option value="Wheat">Wheat</option>
            <option value="Potato">Potato</option>
            <option value="Sugarcane">Sugarcane</option>
          </select>
        </div>

        <div className="form-control w-full max-w-sm mb-2">
          <label htmlFor="photo" className="label cursor-pointer">
            <span className="label-text">Upload a Photo</span>
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered file-input-sm w-full max-w-sm"
            placeholder="Upload a Photo"
          />
        </div>

        {imagePreview && (
          <div className="mb-4">
            <label htmlFor="photo" className="label ">
              <span className="label-text"> Image Preview:</span>
            </label>

            {/* Use next/image for displaying the image */}
            <Image
              src={imagePreview}
              alt="Image Preview"
              width={340}
              height={255}
              className="rounded-xl"
            />
          </div>
        )}

        <button type="submit" className="btn btn-sm mt-4">
          Get Result
        </button>
      </form>

      {/* Display prediction result */}
      {predictionResult && (
        <div className="my-4 ">
          <h2 className="text-lg text-[#fff] font-semibold mb-2">
            Prediction Result:
          </h2>
          <p className="text-[#fff]">Class: {predictionResult?.class}</p>
          <p className="text-[#fff]">
            Confidence: {Math.floor(predictionResult?.confidence * 100)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default CropForm;
