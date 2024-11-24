import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const SaveChangesModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to save the changes?",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ borderRadius: "12px" }}>
      <ModalContent>
        {/* Header */}
        <ModalHeader
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#D4EDDA",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                color: "#28A745",
                fontWeight: "bold",
              }}
            >
              ✓
            </span>
          </div>
          <h2
            style={{
              fontFamily: "PPGoshaBold, sans-serif",
              color: "#333",
              margin: 0,
            }}
          >
            Save Changes?
          </h2>
        </ModalHeader>

        {/* Body */}
        <ModalBody>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              color: "#555",
              margin: 0,
            }}
          >
            {message}
          </p>
        </ModalBody>

        {/* Footer */}
        <ModalFooter
          style={{
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#E9ECEF",
              color: "#6C757D",
              fontFamily: "Arial, sans-serif",
              border: "none",
              width: "100px",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#28A745",
              color: "#FFFFFF",
              fontFamily: "Arial, sans-serif",
              border: "none",
              width: "100px",
            }}
            onClick={onConfirm}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveChangesModal;
