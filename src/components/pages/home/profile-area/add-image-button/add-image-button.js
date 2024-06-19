import { useState, useEffect } from "react";
import AddImageModal from "./add-image-modal/add-image-modal";
import "./add-image-button.css";

export default function AddImageButton() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });
  return (
    <>
      <button
        className="add-image-button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Добавить изображение
      </button>
      <AddImageModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
