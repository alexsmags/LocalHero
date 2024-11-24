import React, { useReducer, useState, useCallback, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addBusiness } from "../../../backend/lib/HelperBusiness";
import { toggleChangeAction } from "../../../backend/redux/reducer";
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

const formReducer = (state: any, event: any) => {
  if (!event.target || !event.target.name) {
    console.error("Invalid input:", event);
    return state;
  }
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};
interface Category {
  _id: string;
  name: string;
}
export default function AddBusinessModal({ isOpen, onClose, categories, onSuccessMessage }: any) {
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

  const [formErrors, setFormErrors] = useState<any>({});
  const [userId, setUserID] = useState("");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProps = async () => {
      const response = await fetch("/api/auth/session");
      const users = await response.json();
      setUserID(users.user.id);
    };
    getProps();
  }, []);

  const addMutation = useMutation({
    mutationFn: addBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      onSuccessMessage("Business added successfully!"); // Notify parent
      handleModalClose();
    },
    onError: (error) => {
      console.error("Error adding business:", error);
    },
  });
  const handler = useCallback(() => {
    dispatch(toggleChangeAction());
  }, [dispatch]);

  const validateForm = () => {
    const errors: any = {};
    if (!formData.name.trim()) errors.name = "Business name is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (!formData.contactEmail.trim())
      errors.contactEmail = "Email is required";
    else if (!/.+@.+\..+/.test(formData.contactEmail))
      errors.contactEmail = "Please enter a valid email address";
    if (!formData.location.trim())
      errors.location = "Location is required";
    if (formData.phone && !/^\+?[0-9\s-]+$/.test(formData.phone))
      errors.phone = "Please enter a valid phone number";
    if (formData.website && !/^https?:\/\/.+/.test(formData.website))
      errors.website = "Please enter a valid website URL";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    const model = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      imageUrl: formData.imageUrl,
      website: formData.website,
      contactEmail: formData.contactEmail,
      phone: formData.phone,
      location: formData.location,
      owner: userId,
    };

    addMutation.mutate(model);
  };

  const handleModalClose = () => {
    setFormData({}); // Reset form data
    setFormErrors({}); // Reset errors
    onClose(); // Close the modal
  };

  const renderError = (field: string) =>
    formErrors[field] && (
      <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
        {formErrors[field]}
      </p>
    );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style={{
        borderRadius: "10px",
      }}
    >
      <ModalContent>
        <ModalHeader style={{ fontFamily: "PPGoshaBold, sans-serif", color: "#04b54e" }}>
          Add New Business
        </ModalHeader>
        <ModalBody>
          <Input
            name="name"
            label="Business Name"
            placeholder="Enter the business name"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.name ? "red" : undefined,
            }}
            value={formData.name}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("name")}

          <Select
            name="category"
            label="Category"
            placeholder="Select a category"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.category ? "red" : undefined,
            }}
            onChange={(selectedValue) => {
              const selectedId = selectedValue.target.value;
              const selectedCategory = categories.find((cat: Category) => cat._id === selectedId);
              const selectedCategoryName = selectedCategory?.name || ""; 
              setFormData({ target: { name: "category", value: selectedCategoryName } });
            }}
            value={formData.category}
          >
            {categories.map((cat: any) => (
              <SelectItem
                key={cat._id}
                value={cat.name}
                style={{ fontFamily: "PPGoshaBold, sans-serif", padding: "5px 10px" }}
              >
                {cat.name}
              </SelectItem>
            ))}
          </Select>

          {renderError("category")}

          <Textarea
            name="description"
            label="Description"
            placeholder="Provide a brief description of the business"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.description ? "red" : undefined,
            }}
            value={formData.description}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("description")}

          <Input
            name="imageUrl"
            label="Image URL"
            placeholder="Enter an image URL (optional)"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("imageUrl")}

          <Input
            name="website"
            label="Website"
            placeholder="Enter the business website (optional)"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.website ? "red" : undefined,
            }}
            value={formData.website}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("website")}

          <Input
            name="contactEmail"
            label="Email"
            placeholder="Enter contact email"
            type="email"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.contactEmail ? "red" : undefined,
            }}
            value={formData.contactEmail}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("contactEmail")}

          <Input
            name="phone"
            label="Phone"
            placeholder="Enter contact number (optional)"
            type="tel"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.phone ? "red" : undefined,
            }}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("phone")}

          <Input
            name="location"
            label="Location"
            placeholder="Enter business location"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.location ? "red" : undefined,
            }}
            value={formData.location}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("location")}
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
            onClick={handleModalClose}
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
            onClick={handleSubmit}
          >
            Add Business
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
