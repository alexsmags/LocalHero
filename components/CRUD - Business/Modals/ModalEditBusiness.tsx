import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { updateBusiness } from "../../../backend/lib/HelperBusiness";

const EditBusinessModal = ({
  isOpen,
  onClose,
  categories,
  business,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  business: any;
  onSave: (updatedBusiness: any) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: "",
    website: "",
    contactEmail: "",
    phone: "",
    location: "",
  });

  // Populate the form with the selected business data when modal opens
  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || "",
        category: business.category || "",
        description: business.description || "",
        imageUrl: business.imageUrl || "",
        website: business.website || "",
        contactEmail: business.contactEmail || "",
        phone: business.phone || "",
        location: business.location || "",
      });
    }
  }, [business]); // Sync formData with `business` prop
  

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category select change
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Handle form submission to update the business
  const handleSave = async () => {
    try {
      const updatedBusiness = await updateBusiness(business._id, formData);
      onSave(updatedBusiness); // Pass the updated business back to the parent
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update business:", error);
    }
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
          Edit Business
        </ModalHeader>
        <ModalBody>
          <Input
            label="Business Name"
            placeholder="Enter the business name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
          />
          <Select
            label="Category"
            placeholder="Select a category"
            value={formData.category}
            onChange={(value: any) => handleSelectChange(value)}
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
          >
            {categories.map((cat: any) => (
              <SelectItem
                key={cat._id}
                value={cat._id}
                style={{
                  fontFamily: "PPGoshaBold, sans-serif",
                  padding: "5px 10px",
                }}
              >
                {cat.name}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            label="Description"
            placeholder="Provide a brief description of the business"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
          />
          <Input
            label="Image URL"
            placeholder="Enter an image URL (optional)"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
          />
          <Input
            label="Website"
            placeholder="Enter the business website (optional)"
            name="website"
            value={formData.website}
            onChange={handleChange}
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
          />
          <Input
            label="Email"
            placeholder="Enter contact email"
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
          />
          <Input
            label="Phone"
            placeholder="Enter contact number (optional)"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
          />
          <Input
            label="Location"
            placeholder="Enter business location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
          />
        </ModalBody>
        <ModalFooter
          style={{
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
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
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBusinessModal;
