'use client';
import React, { useState, useEffect } from 'react';
import { Card, Button } from '@nextui-org/react';
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useRouter, useSearchParams } from 'next/navigation';
import { getBusinessesFiltered } from "../../../../backend/lib/HelperBusiness";
import { Spinner } from "@nextui-org/react";
import LocationFilterModal from '../../../../components/Modals/LocationFilterModal'; // Import the modal

interface Business {
  _id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  website?: string;
  contactEmail: string;
  phone?: string;
  location: string;
  owner?: string;
  createdAt: string;
  updatedAt: string;
}

const LocalBusinessesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("term") || "");
  const [filterCategory, setFilterCategory] = useState(searchParams.get("category") || "");
  const [searchRadius, setSearchRadius] = useState(searchParams.get("radius") || "");
  const [searchZipcode, setSearchZipcode] = useState(searchParams.get("zipcode") || "");
  const [loading, setLoading] = useState(true);
  const [focused, setFocused] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchBusinesses = async (filters: Record<string, string>) => {
    setLoading(true);
    try {
      const data = await getBusinessesFiltered(filters);
      setBusinesses(data);
    } catch (error) {
      console.log("Failed to fetch businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("term", searchTerm);
    if (filterCategory) params.append("category", filterCategory);
    if (searchRadius) params.append("radius", searchRadius);
    if (searchZipcode) params.append("zipcode", searchZipcode);

    router.push(`?${params.toString()}`);
    fetchBusinesses(Object.fromEntries(params.entries()));
  };

  const applyLocationFilter = (zipcode: string, radius: number) => {
    setSearchZipcode(zipcode);
    setSearchRadius(radius.toString());
    const params = new URLSearchParams();
    if (searchTerm) params.append("term", searchTerm);
    if (filterCategory) params.append("category", filterCategory);
    if (zipcode) params.append("zipcode", zipcode);
    if (radius) params.append("radius", radius.toString());

    router.push(`?${params.toString()}`);
    fetchBusinesses(Object.fromEntries(params.entries()));
  };

  const handleCategoryChange = (newCategory: string) => {
    setFilterCategory(newCategory);
    const params = new URLSearchParams();
    if (searchTerm) params.append("term", searchTerm);
    if (newCategory) params.append("category", newCategory);
    if (searchRadius) params.append("radius", searchRadius);
    if (searchZipcode) params.append("zipcode", searchZipcode);

    router.push(`?${params.toString()}`);
    fetchBusinesses(Object.fromEntries(params.entries()));
  };

  const clearCategoryFilter = () => {
    setFilterCategory("");
    const params = new URLSearchParams();
    if (searchTerm) params.append("term", searchTerm);
    if (searchRadius) params.append("radius", searchRadius);
    if (searchZipcode) params.append("zipcode", searchZipcode);

    router.push(`?${params.toString()}`);
    fetchBusinesses(Object.fromEntries(params.entries()));
  };

  const clearRadiusFilter = () => {
    setSearchRadius("");
    setSearchZipcode("");
    const params = new URLSearchParams();
    if (searchTerm) params.append("term", searchTerm);
    if (filterCategory) params.append("category", filterCategory);

    router.push(`?${params.toString()}`);
    fetchBusinesses(Object.fromEntries(params.entries()));
  };

  useEffect(() => {
    const filters: Record<string, string> = {};
    if (searchParams.get("term")) filters.term = searchParams.get("term")!;
    if (searchParams.get("category")) filters.category = searchParams.get("category")!;
    if (searchParams.get("radius")) filters.radius = searchParams.get("radius")!;
    if (searchParams.get("zipcode")) filters.zipcode = searchParams.get("zipcode")!;

    fetchBusinesses(filters);
  }, [searchParams]);

  return (
    <div style={{ padding: '20px' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5',
          marginBottom: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          gap: '10px'
        }}
      >
        <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '20px' }}>
          {businesses.length} results
        </span>
        <div style={{ position: 'relative', flex: '1', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search for businesses..."
            value={searchTerm}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 100)}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 15px',
              borderRadius: '25px',
              border: '2px solid #28a745',
              fontSize: '16px',
              outline: 'none',
              paddingRight: '50px',
            }}
          />
          {searchTerm && focused && (
            <AiOutlineClose
              onClick={() => setSearchTerm("")}
              style={{
                position: 'absolute',
                right: '40px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#888',
              }}
            />
          )}
          <button
            type="submit"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: '#28a745',
            }}
          >
            <AiOutlineSearch />
          </button>
        </div>
        <select
          value={filterCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '25px',
            border: '2px solid #28a745',
            fontSize: '16px',
            backgroundColor: '#ffffff',
            outline: 'none',
            marginLeft: '10px',
          }}
        >
          <option value="">All Categories</option>
          <option value="Food">Food and Beverage</option>
          <option value="Retail">Retail and Shopping</option>
          <option value="Professional Services">Personal and Professional Services</option>
          <option value="Education">Education and Childcare</option>
          <option value="Home Services">Home Services</option>
          <option value="Other">Other</option>
        </select>
        <Button
          style={{
            border: '2px solid #28a745',
            backgroundColor: 'white',
            color: '#28a745',
            borderRadius: '25px',
            fontWeight: 'bold',
          }}
          onClick={() => setModalOpen(true)}
        >
          Filter by Location
        </Button>
      </form>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {filterCategory && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px 10px',
              backgroundColor: 'rgba(4, 181, 78, 0.2)',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#04b54e',
              fontWeight: '500',
              cursor: 'pointer',
            }}
            onClick={clearCategoryFilter}
          >
            <span>{filterCategory}</span>
            <AiOutlineClose
              style={{ marginLeft: '5px', cursor: 'pointer', fontSize: '14px', color: 'inherit' }}
            />
          </div>
        )}
        {(searchRadius && searchZipcode) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px 10px',
              backgroundColor: 'rgba(40, 167, 69, 0.2)',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#28a745',
              fontWeight: '500',
              cursor: 'pointer',
            }}
            onClick={clearRadiusFilter}
          >
            <span>{searchRadius} km around {searchZipcode}</span>
            <AiOutlineClose
              style={{ marginLeft: '5px', cursor: 'pointer', fontSize: '14px', color: 'inherit' }}
            />
          </div>
        )}
      </div>

      <LocationFilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onApply={applyLocationFilter}
        initialZipcode={searchZipcode}
        initialRadius={Number(searchRadius) || 10}
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Spinner color="success" />
        ) : businesses.length > 0 ? (
          businesses.map((business) => (
            <Card
              key={business._id}
              style={{
                maxWidth: '300px',
                width: '100%',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
              }}
            >
              <img
                src={business.image || 'https://via.placeholder.com/300x150?text=Business+Image'}
                alt={business.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>{business.name}</h3>
                <p style={{ margin: '0 0 5px', fontSize: '14px', color: '#555' }}>{business.description}</p>
                <p><b>Category:</b> {business.category}</p>
                <p><b>Location:</b> {business.location}</p>
                <p><b>Email:</b> {business.contactEmail}</p>
                {business.phone && <p><b>Phone:</b> {business.phone}</p>}
                {business.website && (
                  <Button
                    size="sm"
                    onClick={() => window.open(business.website, '_blank')}
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      borderRadius: '25px',
                      width: '100%',
                      marginTop: '15px',
                    }}
                  >
                    Visit Website
                  </Button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <p style={{ fontSize: '18px', color: '#888' }}>No businesses found.</p>
        )}
      </div>
    </div>
  );
};

export default LocalBusinessesPage;
