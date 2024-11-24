'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import AddBusinessModal from "../../../../components/CRUD - Business/Modals/ModalAddBusiness";
import EditBusinessModal from "../../../../components/CRUD - Business/Modals/ModalEditBusiness";
import ConfirmationModal from "../../../../components/CRUD - Business/Modals/ConfirmationModal";
import { getUserBusinesses, deleteBusiness } from "../../../../backend/lib/HelperBusiness";

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
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [businessToDelete, setBusinessToDelete] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = () => {
      const hardcodedCategories: Category[] = [
        { _id: "1", name: "Artisans" },
        { _id: "2", name: "Business" },
        { _id: "3", name: "Tech" },
        { _id: "4", name: "Retail" },
        { _id: "5", name: "Services" },
      ];
      setCategories(hardcodedCategories);
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (session?.user?.id) {
        try {
          const userBusinesses = await getUserBusinesses(session.user.id);
          setBusinesses(Array.isArray(userBusinesses) ? userBusinesses : []);
        } catch (error) {
          console.error("Error fetching businesses:", error);
          setBusinesses([]);
        }
      }
    };

    fetchBusinesses();
  }, [session]);

  const handleAddOrUpdateBusiness = (businessData: Omit<Business, "_id">) => {
    if (selectedBusiness) {
      setBusinesses((prev) =>
        prev.map((b) =>
          b._id === selectedBusiness._id ? { ...selectedBusiness, ...businessData } : b
        )
      );
    } else {
      const newBusiness: Business = { ...businessData, _id: Date.now().toString() };
      setBusinesses((prev) => [...prev, newBusiness]);
    }
    setAddModalOpen(false);
    setSelectedBusiness(null);
  };

  const confirmDeleteBusiness = async () => {
    if (businessToDelete) {
      try {
        await deleteBusiness(businessToDelete);
        setBusinesses((prev) => prev.filter((b) => b._id !== businessToDelete));
        setSuccessMessage("Business deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        console.error("Failed to delete business:", error);
      } finally {
        setDeleteModalOpen(false);
        setBusinessToDelete(null);
      }
    }
  };

  const handleEditBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setEditModalOpen(true);
  };

  const handleDeleteBusiness = (id: string) => {
    setBusinessToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleSaveChanges = async (updatedBusiness: Business) => {
    try {
      const response = await getUserBusinesses(session?.user?.id);
      setBusinesses(response);
    } catch (error) {
      console.error("Failed to fetch updated businesses:", error);
    } finally {
      setEditModalOpen(false);
    }
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

        {businesses.length === 0 ? (
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
            {businesses.map((business, index) => (
              <Card
                key={`${business._id}-${index}`}
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
                      onClick={() => handleEditBusiness(business)}
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
            ))}
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddBusinessModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setAddModalOpen(false);
            setSelectedBusiness(null);
          }}
          onSubmit={handleAddOrUpdateBusiness}
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
          onSave={handleSaveChanges}
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
