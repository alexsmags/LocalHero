'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import AddBusinessModal from "../../../../components/CRUD - Business/Modals/ModalAddBusiness";
import EditBusinessModal from "../../../../components/CRUD - Business/Modals/ModalEditBusiness";
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
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const handleDeleteBusiness = async (id: string) => {
    try {
      await deleteBusiness(id);
      setBusinesses((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Failed to delete business:", error);
    }
  };

  const handleEditBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setEditModalOpen(true);
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
    </div>
  );
};

export default BusinessCRUDPage;
