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
  isOpen: boolean; // The visibility state of the modal
  onClose: () => void; // Function to close the modal
  onApply: (zipcode: string, radius: number) => void; // Function to apply filters
  initialZipcode?: string; // Optional initial zipcode
  initialRadius?: number; // Optional initial radius
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

  // Validate inputs before applying filters
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

  // Handle form submission
  const handleApplyFilters = () => {
    if (!validateInputs()) return;

    // Trigger parent onApply first
    onApply(zipcode, radius);

    // Then close the modal
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
            fontFamily: "PPGoshaBold, sans-serif",
            color: "#04b54e",
          }}
        >
          Filter by Location
        </ModalHeader>
        <ModalBody>
          {/* Zipcode Input */}
          <Input
            name="zipcode"
            label="Zipcode"
            placeholder="Enter Zipcode"
            fullWidth
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.zipcode ? "red" : undefined,
            }}
          />
          {formErrors.zipcode && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {formErrors.zipcode}
            </p>
          )}

          {/* Radius Input */}
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            >
              Radius (km)
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#888", fontFamily: "PPGoshaBold, sans-serif" }}>
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
                  fontFamily: "PPGoshaBold, sans-serif",
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
              fontFamily: "PPGoshaBold, sans-serif",
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
              fontFamily: "PPGoshaBold, sans-serif",
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
