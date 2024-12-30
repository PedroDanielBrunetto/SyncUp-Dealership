"use client";

import React, { useState } from "react";
import crypto from "crypto";

interface ImageInputProps {
  onImageChange: (file: File, filename: string, contentType: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar tamanho máximo de 1MB
    if (file.size > 1024 * 1024) {
      setError("O arquivo deve ter no máximo 1MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    const hash = crypto.randomBytes(8).toString("hex");
    const filename = `${file.name.split(".")[0]}-${hash}.${file.name
      .split(".")
      .pop()}`;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);

    onImageChange(file, filename, file.type);
  };

  return (
    <div className="image-input">
      <label className="image-input-label">
        <div className="image-preview">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover h-full w-full rounded-lg lg:h-[460px] cursor-pointer"
            />
          ) : (
            <span className="cursor-pointer bg-gray-200 p-2 rounded-md text-sm">
              Clique para selecionar uma imagem
            </span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="image-input-field"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </label>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageInput;
