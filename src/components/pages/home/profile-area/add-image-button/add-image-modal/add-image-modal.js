import { useEffect, useState } from "react";
import Modal from "react-modal";
import UploadArea from "./upload-area/upload-area";
import "./add-image-modal.css";

export default function AddImageModal(props) {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        props.onClose();
      }}
      style={{
        overlay: {
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        },
        content: {
          inset: "calc(50% - 200px) calc(50% - 322px) auto",
          padding: "0",
          border: "0px solid transparent",
        },
      }}
    >
      <div className="add-image-modal-page padding-10px">
        Загрузка изображений
        <UploadArea
          onClose={() => {
            props.onClose();
          }}
        />
      </div>
    </Modal>
  );
}
