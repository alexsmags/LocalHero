import React, { useReducer, useEffect, useState } from "react";
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
import SaveChangesModal from "./SaveChangesModal"; 
import { updateArtisan } from "../../../backend/lib/HelperArtisan";
import SkillsInput from "../skills"; 

const formReducer = (state: any, event: any) => {
  if (!event.target || !event.target.name) return state;
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const EditArtisanModal = ({
  isOpen,
  onClose,
  artisan,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  artisan: any;
  onSave: (updatedArtisan: any) => void;
}) => {
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

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Populate form data when modal opens or `artisan` changes
  useEffect(() => {
    if (artisan) {
      setFormData({ target: { name: "name", value: artisan.name || "" } });
      setFormData({
        target: { name: "skills", value: artisan.skills?.join(", ") || "" },
      }); // Convert array to comma-separated string
      setFormData({
        target: { name: "bio", value: artisan.bio || "" },
      });
      setFormData({
        target: { name: "imageUrl", value: artisan.imageUrl || "" },
      });
      setFormData({
        target: { name: "website", value: artisan.website || "" },
      });
      setFormData({
        target: { name: "contactEmail", value: artisan.contactEmail || "" },
      });
      setFormData({ target: { name: "phone", value: artisan.phone || "" } });
      setFormData({
        target: { name: "location", value: artisan.location || "" },
      });
      setFormData({
        target: {
          name: "socialMedia",
          value: artisan.socialMedia?.join(", ") || "",
        },
      }); // Convert array to comma-separated string
    }
  }, [artisan]);

  // Detect changes between form data and original artisan data
  useEffect(() => {
    if (artisan) {
      const originalData = {
        name: artisan.name || "",
        skills: artisan.skills?.join(", ") || "",
        bio: artisan.bio || "",
        imageUrl: artisan.imageUrl || "",
        website: artisan.website || "",
        contactEmail: artisan.contactEmail || "",
        phone: artisan.phone || "",
        location: artisan.location || "",
        socialMedia: artisan.socialMedia?.join(", ") || "",
      };

      setHasChanges(JSON.stringify(formData) !== JSON.stringify(originalData));
    }
  }, [formData, artisan]);

  const handleSave = async () => {
    try {
      const updatedArtisan = {
        ...formData,
        skills: formData.skills.split(",").map((skill: string) => skill.trim()), // Convert string to array
        socialMedia: formData.socialMedia
          .split(",")
          .map((link: string) => link.trim()), // Convert string to array
      };

      console.log("Saving Data:", updatedArtisan);
      const response = await updateArtisan(artisan._id, updatedArtisan);

      onSave(response);

      onClose();
    } catch (error) {
      console.error("Failed to update artisan:", error);
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
            Edit Artisan
          </ModalHeader>
          <ModalBody
              style={{
                maxHeight: "700px", // Limit modal body height
                overflowY: "auto",
              }}>
            <Input
              label="Artisan Name"
              name="name"
              placeholder="Enter the artisan's name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData(e)}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            />
            <SkillsInput
              initialSkills={artisan?.skills || []} // Pass artisan's skills for editing
              onChange={(skills: string[]) =>
                setFormData({ target: { name: "skills", value: skills.join(",") } })
              }
            />
            <Textarea
              label="Bio"
              name="bio"
              placeholder="Provide a brief bio of the artisan"
              fullWidth
              value={formData.bio}
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
              placeholder="Enter the artisan's website (optional)"
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
              placeholder="Enter artisan's location"
              fullWidth
              value={formData.location}
              onChange={(e) => setFormData(e)}
              style={{
                backgroundColor: "#f9f9f9",
                fontFamily: "PPGoshaBold, sans-serif",
              }}
            />
            <Textarea
              label="Social Media Links"
              name="socialMedia"
              placeholder="Enter social media links, separated by commas"
              fullWidth
              value={formData.socialMedia}
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

export default EditArtisanModal;
