import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
} from "@nextui-org/react";

interface LocationFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (zipcode: string, radius: number) => void; 
  initialZipcode?: string; 
  initialRadius?: number; 
}

export default function LocationFilterModal({
  isOpen,
  onClose,
  onApply,
  initialZipcode = "",
  initialRadius = 10,
}: LocationFilterModalProps) {
  const [zipcode, setZipcode] = useState(initialZipcode);
  const [radius, setRadius] = useState(initialRadius);
  const [formErrors, setFormErrors] = useState({ zipcode: "", radius: "" });

  
  const validateInputs = () => {
    const errors = { zipcode: "", radius: "" };
    let isValid = true;

    if (!zipcode.trim()) {
      errors.zipcode = "Zipcode is required.";
      isValid = false;
    }

    if (isNaN(radius) || radius <= 0) {
      errors.radius = "Radius must be a positive number.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };


  const handleApplyFilters = () => {
    if (!validateInputs()) return;
    onApply(zipcode, radius);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style={{
        borderRadius: "10px",
      }}
    >
      <ModalContent>
        <ModalHeader
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "#04b54e",
          }}
        >
          Filter by Location
        </ModalHeader>
        <ModalBody>
          <Input
            name="zipcode"
            label="Zipcode"
            placeholder="Enter Zipcode"
            fullWidth
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "Poppins, sans-serif",
              borderColor: formErrors.zipcode ? "red" : undefined,
            }}
          />
          {formErrors.zipcode && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {formErrors.zipcode}
            </p>
          )}

          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Radius (km)
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#888", fontFamily: "Poppins, sans-serif" }}>
                1 km
              </span>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  accentColor: "#04b54e",
                }}
              />
              <span
                style={{
                  color: "#888",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {radius} km
              </span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter style={{ justifyContent: "space-between", gap: "10px" }}>
          <Button
            style={{
              backgroundColor: "#FFFFFF",
              color: "#04b54e",
              border: "1px solid #04b54e",
              fontFamily: "Poppins, sans-serif",
              width: "120px",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            style={{
              backgroundColor: "#04b54e",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              width: "120px",
            }}
            onClick={handleApplyFilters}
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
