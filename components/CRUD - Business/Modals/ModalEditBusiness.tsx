import React, { useReducer, useEffect, useState } from "react";
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
import SaveChangesModal from "./SaveChangesModal"; // Import the SaveChangesModal
import { updateBusiness } from "../../../backend/lib/HelperBusiness";

const formReducer = (state: any, event: any) => {
  if (!event.target || !event.target.name) return state;
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

interface Category {
  _id: string;
  name: string;
}

const EditBusinessModal = ({
  isOpen,
  onClose,
  categories,
  business,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  business: any;
  onSave: (updatedBusiness: any) => void;
}) => {
  const [formData, setFormData] = useReducer(formReducer, {
    name: "",
    category: "",
    description: "",
    imageUrl: "",
    website: "",
    contactEmail: "",
    phone: "",
    location: "",
  });

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Populate form data when modal opens or `business` changes
  useEffect(() => {
    if (business) {
      const matchedCategory = categories.find(
        (cat) => cat.name === business.category
      );
      setFormData({ target: { name: "name", value: business.name || "" } });
      setFormData({
        target: { name: "category", value: matchedCategory?._id || "" },
      });
      setFormData({
        target: { name: "description", value: business.description || "" },
      });
      setFormData({
        target: { name: "imageUrl", value: business.imageUrl || "" },
      });
      setFormData({
        target: { name: "website", value: business.website || "" },
      });
      setFormData({
        target: { name: "contactEmail", value: business.contactEmail || "" },
      });
      setFormData({ target: { name: "phone", value: business.phone || "" } });
      setFormData({
        target: { name: "location", value: business.location || "" },
      });
    }
  }, [business, categories]);

  // Detect changes between form data and original business data
  useEffect(() => {
    if (business) {
      const matchedCategory = categories.find(
        (cat) => cat.name === business.category
      )?._id;

      const originalData = {
        name: business.name || "",
        category: matchedCategory || "",
        description: business.description || "",
        imageUrl: business.imageUrl || "",
        website: business.website || "",
        contactEmail: business.contactEmail || "",
        phone: business.phone || "",
        location: business.location || "",
      };

      setHasChanges(JSON.stringify(formData) !== JSON.stringify(originalData));
    }
  }, [formData, business, categories]);

  const handleSave = async () => {
    try {
      const categoryName =
        categories.find((cat) => cat._id === formData.category)?.name || "";

      const updatedBusiness = {
        ...formData,
        category: categoryName, // Use category name instead of _id
      };

      console.log("Saving Data:", updatedBusiness);
      const response = await updateBusiness(business._id, updatedBusiness);

      onSave(response);

      onClose();
    } catch (error) {
      console.error("Failed to update business:", error);
    }
  };

  const handleSaveClick = () => {
    if (hasChanges) {
      setIsConfirmationOpen(true);
    } else {
      handleSave(); // Save directly if no changes were made
    }
  };

  return (
    <>
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
              name="name"
              placeholder="Enter the business name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData(e)}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            />
            <Select
              name="category"
              label="Category"
              placeholder="Select a category"
              fullWidth
              selectedKeys={new Set([formData.category])}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys).join(""); // Convert Set to a single key
                setFormData({ target: { name: "category", value: selectedKey } }); // Store the selected _id
              }}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            >
              {categories.map((cat) => (
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
              name="description"
              placeholder="Provide a brief description of the business"
              fullWidth
              value={formData.description}
              onChange={(e) => setFormData(e)}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            />
            <Input
              label="Image URL"
              name="imageUrl"
              placeholder="Enter an image URL (optional)"
              fullWidth
              value={formData.imageUrl}
              onChange={(e) => setFormData(e)}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            />
            <Input
              label="Website"
              name="website"
              placeholder="Enter the business website (optional)"
              fullWidth
              value={formData.website}
              onChange={(e) => setFormData(e)}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            />
            <Input
              label="Email"
              name="contactEmail"
              placeholder="Enter contact email"
              fullWidth
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData(e)}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            />
            <Input
              label="Phone"
              name="phone"
              placeholder="Enter contact number (optional)"
              fullWidth
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(e)}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            />
            <Input
              label="Location"
              name="location"
              placeholder="Enter business location"
              fullWidth
              value={formData.location}
              onChange={(e) => setFormData(e)}
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
                backgroundColor: hasChanges ? "#04b54e" : "#d3d3d3", // Gray when disabled
                color: "#FFFFFF",
                fontFamily: "PPGoshaBold, sans-serif",
                width: "120px",
              }}
              onClick={handleSaveClick}
              disabled={!hasChanges} // Disable button if no changes
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Confirmation Modal */}
      <SaveChangesModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => {
          handleSave();
          setIsConfirmationOpen(false);
        }}
        message="Are you sure you want to save the changes?"
      />
    </>
  );
};

export default EditBusinessModal;
