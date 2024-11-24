import React, { useReducer, useState, useCallback, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addArtisan } from "../../../backend/lib/HelperArtisan";
import { toggleChangeAction } from "../../../backend/redux/reducer";
import SkillsInput from "../skills"; // Assuming SkillsInput is properly imported
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
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

export default function AddArtisanModal({ isOpen, onClose, onSuccessMessage }: any) {
  const [formData, setFormData] = useReducer(formReducer, {
    name: "",
    skills: "",
    bio: "",
    imageUrl: "",
    website: "",
    contactEmail: "",
    phone: "",
    location: "",
    socialMedia: "",
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
    mutationFn: addArtisan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artisans"] });
      onSuccessMessage("Artisan added successfully!");
      handleModalClose();
    },
    onError: (error) => {
      console.error("Error adding artisan:", error);
    },
  });

  const validateForm = () => {
    const errors: any = {};
    if (!formData.name.trim()) errors.name = "Artisan name is required";
    if (!formData.skills.trim()) errors.skills = "At least one skill is required";
    if (!formData.bio.trim()) errors.bio = "Bio is required";
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
  const handleSkillsChange = useCallback((skills: string[]) => {
    setFormData({ target: { name: "skills", value: skills.join(",") } });
  }, []); // Ensure dependencies are stable
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    const model = {
      name: formData.name,
      skills: formData.skills.split(",").map((skill: string) => skill.trim()), // Convert skills to array
      bio: formData.bio,
      imageUrl: formData.imageUrl,
      website: formData.website,
      contactEmail: formData.contactEmail,
      phone: formData.phone,
      location: formData.location,
      socialMedia: formData.socialMedia.split(",").map((link: string) => link.trim()), // Convert social media links to array
      owner: userId,
    };

    addMutation.mutate(model);
  };

  const handleModalClose = () => {
    setFormData({});
    setFormErrors({});
    onClose();
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
        <ModalHeader
          style={{
            fontFamily: "PPGoshaBold, sans-serif",
            color: "#04b54e",
          }}
        >
          Add New Artisan
        </ModalHeader>
        <ModalBody
          style={{
            maxHeight: "700px", // Limit modal body height
            overflowY: "auto", // Enable scrolling for long content
            backgroundColor: "#f9f9f9",
            padding: "20px",
          }}
        >
          <Input
            name="name"
            label="Artisan Name"
            placeholder="Enter the artisan's name"
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

          <SkillsInput
            onChange={handleSkillsChange}
          />
          {renderError("skills")}

          <Textarea
            name="bio"
            label="Bio"
            placeholder="Provide a brief bio of the artisan"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
              borderColor: formErrors.bio ? "red" : undefined,
            }}
            value={formData.bio}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("bio")}

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
            placeholder="Enter the artisan's website (optional)"
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
            placeholder="Enter artisan's location"
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

          <Textarea
            name="socialMedia"
            label="Social Media Links"
            placeholder="Enter social media links, separated by commas (optional)"
            fullWidth
            style={{
              backgroundColor: "#f9f9f9",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
            value={formData.socialMedia}
            onChange={(e) =>
              setFormData({ target: { name: e.target.name, value: e.target.value } })
            }
          />
          {renderError("socialMedia")}
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
            Add Artisan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
