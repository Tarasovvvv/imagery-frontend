import { useState, useEffect } from "react";
import AddImageToCollectionModal from "./add-image-to-collections-modal/add-image-to-collection-modal";
import "./add-image-to-collection.css";

export default function AddImageToCollection(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });
  return (
    <>
      <div
        className="aitc-modal"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <AddImageToCollectionModal
          data={props.data}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}
