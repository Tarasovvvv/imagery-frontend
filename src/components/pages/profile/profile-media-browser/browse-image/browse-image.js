import { useState, useEffect } from "react";
import BrowseImageModal from "./browse-image-modal/browse-image-modal";
import "./browse-image.css";

export default function BrowseImage(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });
  return (
    <>
      <div
        className="browse-image"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <BrowseImageModal
          status={props.status}
          data={props.data}
          user={props.user}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}
