"use client";
import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
// import { useDropzone } from "react-dropzone";
import CustomButton from "./CustomButton";
import Image from "next/image";
import styles from "../global.css";

interface ImageUploadProps {
  selectedImages: any;
  register: any;
  name: string;
  handleFileChange: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  register,
  name = "",
  selectedImages,
  handleFileChange,
}) => {
  console.log(selectedImages);

  const stylesA = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "grid", flexDirection: "column", rowGap: "10px" }}>
      {selectedImages && (
        <Image
          src={URL.createObjectURL(selectedImages)}
          height={200}
          width={200}
          alt="Selected Image"
        />
      )}
      <label htmlFor="fileInput" style={stylesA}>
        Select File
        <input
          className={(styles as any).fileInput}
          type="file"
          id="fileInput"
          {...register("file")}
          onChange={handleFileChange}
          hidden
        />
      </label>
      {/* {selectedImages.length > 0 &&
        selectedImages.map((e: File) => {
          <img
            src={URL.createObjectURL(e)}
            height={200}
            width={200}
            alt="Selected Image"
          />;
        })} */}
    </div>
  );
};

export default memo(ImageUpload);
