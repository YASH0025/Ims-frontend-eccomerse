// CustomAlert.tsx
import React from "react";
import Modal from "react-modal";

const CustomAlert = ({ message, isOpen, onClose }: any) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div>
        <h2>{message}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default CustomAlert;
