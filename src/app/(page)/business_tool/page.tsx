'use client';
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import AddBusinessModal from "../../../../components/CRUD - Business/Modals/ModalAddBusiness";
import EditBusinessModal from "../../../../components/CRUD - Business/Modals/ModalEditBusiness";
import ConfirmationModal from "../../../../components/CRUD - Business/Modals/ConfirmationModal";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUserBusinesses, deleteBusiness } from "../../../../backend/lib/HelperBusiness";
import {Spinner} from "@nextui-org/react";

interface Business {
  _id: string;
  name: string;
  category: string;
  description: string;
  contactEmail: string;
  location: string;
}

interface Category {
  _id: string;
  name: string;
}

const BusinessCRUDPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [businessToDelete, setBusinessToDelete] = useState<string | null>(null);
  const [categories] = useState<Category[]>([
    { _id: "1", name: "Food" },
    { _id: "2", name: "Retail" },
    { _id: "3", name: "Professional Services" },
    { _id: "4", name: "Education" },
    { _id: "5", name: "Home Services" },
    { _id: "6", name: "Other" },
  ]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch businesses with React Query
  const { data: businesses = [], isLoading, isFetching } = useQuery({
    queryKey: ["businesses", session?.user?.id],
    queryFn: async () => {
      const response = await getUserBusinesses(session?.user?.id);
      return Array.isArray(response) ? response : []; // Ensure response is an array
    },
    enabled: !!session?.user?.id, // Ensure query only runs if session.user.id exists
  });

  // Mutation for deleting a business
  const deleteMutation = useMutation({
    mutationFn: deleteBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      setDeleteModalOpen(false);
      setSuccessMessage("Business deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
    },
    onError: (error) => {
      console.error("Error deleting business:", error);
    },
  });

  const handleDeleteBusiness = (id: string) => {
    setBusinessToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteBusiness = () => {
    if (businessToDelete) {
      deleteMutation.mutate(businessToDelete);
    }
  };

  const handleUpdateBusiness = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["businesses"] });
    setSuccessMessage("Business updated successfully!");
    setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f1f1f1",
        minHeight: "100vh",
      }}
    >
      {successMessage && (
        <div
          style={{
            backgroundColor: "#D4EDDA",
            color: "#155724",
            border: "1px solid #C3E6CB",
            borderRadius: "8px",
            padding: "10px 20px",
            marginBottom: "20px",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
          }}
        >
          {successMessage}
        </div>
      )}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              color: "#04b54e",
              fontFamily: "PPGoshaBold, sans-serif",
              margin: 0,
              fontSize: "32px",
              lineHeight: "1.2",
              fontWeight: "bold",
            }}
          >
            Business Management
          </h1>
          <Button
            style={{
              backgroundColor: "#04b54e",
              color: "#FFFFFF",
              fontFamily: "PPGoshaBold, sans-serif",
            }}
            onClick={() => setAddModalOpen(true)}
          >
            Add Business
          </Button>
        </div>

        {isLoading || isFetching ? (
          <Spinner color="success"/>
        ) : Array.isArray(businesses) && businesses.length === 0 ? (
          <p style={{ fontSize: "18px", color: "#888", textAlign: "center" }}>
            No businesses found. <br />
            <span style={{ color: "#28a745", fontWeight: "bold" }}>
              Click on "Add Business" to get started!
            </span>
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {Array.isArray(businesses) ? (
              businesses.map((business: Business) => (
                <Card
                  key={business._id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <CardHeader
                    style={{
                      fontFamily: "PPGoshaBold, sans-serif",
                      fontSize: "18px",
                      color: "#04b54e",
                      paddingBottom: "0",
                    }}
                  >
                    {business.name}
                  </CardHeader>
                  <CardBody>
                    <p>
                      <strong>Category:</strong> {business.category}
                    </p>
                    <p>
                      <strong>Description:</strong> {business.description}
                    </p>
                    <p>
                      <strong>Email:</strong> {business.contactEmail}
                    </p>
                    <p>
                      <strong>Location:</strong> {business.location}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15px",
                      }}
                    >
                      <Button
                        size="sm"
                        style={{
                          backgroundColor: "#FFC107",
                          color: "#000000",
                          fontFamily: "PPGoshaBold, sans-serif",
                          marginRight: "10px",
                        }}
                        onClick={() => {
                          setSelectedBusiness(business);
                          setEditModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        style={{
                          backgroundColor: "#DC3545",
                          color: "#FFFFFF",
                          fontFamily: "PPGoshaBold, sans-serif",
                        }}
                        onClick={() => handleDeleteBusiness(business._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <p>No businesses available or invalid data format.</p>
            )}
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddBusinessModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSuccessMessage={(message: string) => {
            setSuccessMessage(message);
            setTimeout(() => setSuccessMessage(null), 3000); // Clear after 3 seconds
          }}
          categories={categories}
        />
      )}

      {isEditModalOpen && selectedBusiness && (
        <EditBusinessModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedBusiness(null);
          }}
          business={selectedBusiness}
          onSave={handleUpdateBusiness}
          categories={categories}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDeleteBusiness}
          message="Are you sure you want to delete this business? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default BusinessCRUDPage;
