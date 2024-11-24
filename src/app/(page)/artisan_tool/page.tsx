'use client';
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import AddArtisanModal from "../../../../components/CRUD - Artisan/Modals/ModalAddArtisan";
import EditArtisanModal from "../../../../components/CRUD - Artisan/Modals/ModalEditArtisan";
import ConfirmationModal from "../../../../components/CRUD - Artisan/Modals/ConfirmationModal";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUserArtisans, deleteArtisan } from "../../../../backend/lib/HelperArtisan";
import {Spinner} from "@nextui-org/react";

interface Artisan {
  _id: string;
  name: string;
  skills: string[];
  bio: string;
  contactEmail: string;
  location: string;
}

const ArtisanCRUDPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [artisanToDelete, setArtisanToDelete] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data: artisans = [], isLoading, isFetching, refetch } = useQuery({
    queryKey: ["artisans", session?.user?.id],
    queryFn: () => getUserArtisans(session?.user?.id),
    enabled: !!session?.user?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteArtisan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artisans"] });
      setDeleteModalOpen(false);
      setSuccessMessage("Artisan deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
    onError: (error) => {
      console.error("Error deleting artisan:", error);
    },
  });

  const handleDeleteArtisan = (id: string) => {
    setArtisanToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteArtisan = () => {
    if (artisanToDelete) {
      deleteMutation.mutate(artisanToDelete);
    }
  };

  const handleUpdateArtisan = () => {
    setEditModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["artisans"] });
    setSuccessMessage("Artisan updated successfully!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleAddArtisanSuccess = () => {
    setAddModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["artisans"] });
    setSuccessMessage("Artisan added successfully!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f1f1f1", minHeight: "100vh" }}>
      {successMessage && (
        <div style={{ backgroundColor: "#D4EDDA", color: "#155724", padding: "10px 20px", marginBottom: "20px" }}>
          {successMessage}
        </div>
      )}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "8px", padding: "20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h1 style={{ color: "#04b54e", fontFamily: "PPGoshaBold, sans-serif", fontSize: "32px", fontWeight: "bold" }}>
            Artisan Management
          </h1>
          <Button style={{ backgroundColor: "#04b54e", color: "#FFFFFF" }} onClick={() => setAddModalOpen(true)}>
            Add Artisan
          </Button>
        </div>

        {isLoading || isFetching ? (
          <Spinner color="success"/>
        ) : Array.isArray(artisans) && artisans.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {artisans.map((artisan: Artisan) => (
              <Card key={artisan._id} style={{ border: "1px solid #e0e0e0", borderRadius: "10px", boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)" }}>
                <CardHeader style={{ color: "#04b54e", fontSize: "18px" }}>{artisan.name}</CardHeader>
                <CardBody>
                  <p><strong>Skills:</strong> {artisan.skills.join(", ")}</p>
                  <p><strong>Bio:</strong> {artisan.bio}</p>
                  <p><strong>Email:</strong> {artisan.contactEmail}</p>
                  <p><strong>Location:</strong> {artisan.location}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                    <Button
                      size="sm"
                      style={{ backgroundColor: "#FFC107", color: "#000000", marginRight: "10px" }}
                      onClick={() => {
                        setSelectedArtisan(artisan);
                        setEditModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      style={{ backgroundColor: "#DC3545", color: "#FFFFFF" }}
                      onClick={() => handleDeleteArtisan(artisan._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <p>No artisans found.</p>
        )}
      </div>

      {isAddModalOpen && (
        <AddArtisanModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSuccessMessage={handleAddArtisanSuccess}
        />
      )}

      {isEditModalOpen && selectedArtisan && (
        <EditArtisanModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedArtisan(null);
          }}
          artisan={selectedArtisan}
          onSave={handleUpdateArtisan}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDeleteArtisan}
          message="Are you sure you want to delete this artisan? This action cannot be undone."
        />
      )}
    </div>
  );
};


export default ArtisanCRUDPage;
