'use client';
import React, { useState, useEffect } from 'react';
import { Card, Button } from '@nextui-org/react';
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useRouter, useSearchParams } from 'next/navigation';
import { getArtisanssFiltered } from "../../../../backend/lib/HelperArtisan";
import {Spinner} from "@nextui-org/react";

interface Artisan {
  _id: string;
  name: string;
  skills: string[];
  bio: string;
  image?: string;
  website?: string;
  contactEmail: string;
  phone?: string;
  location: string;
  owner?: string;
  createdAt: string;
  updatedAt: string;
}

const LocalArtisansPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("term") || "");
  const [filterSkill, setFilterSkill] = useState(searchParams.get("skill") || "");
  const [loading, setLoading] = useState(true);
  const [focused, setFocused] = useState(false); // State to track input focus

  const fetchArtisans = async (filters: Record<string, string>) => {
    setLoading(true);
    try {
      const data = await getArtisanssFiltered(filters);
      setArtisans(data);
    } catch (error) {
      console.log("Failed to fetch artisans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("term", searchTerm);
    if (filterSkill) params.append("skill", filterSkill);

    router.push(`?${params.toString()}`);
    fetchArtisans(Object.fromEntries(params.entries()));
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  const clearSkillFilter = () => {
    setFilterSkill("");
    const params = new URLSearchParams();
    if (searchTerm) params.append("term", searchTerm);

    router.push(`?${params.toString()}`);
    fetchArtisans(Object.fromEntries(params.entries()));
  };

  useEffect(() => {
    const filters: Record<string, string> = {};
    if (searchParams.get("term")) filters.term = searchParams.get("term")!;
    if (searchParams.get("skill")) filters.skill = searchParams.get("skill")!;

    fetchArtisans(filters);
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
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5',
          marginBottom: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '20px' }}>
          {artisans.length} results
        </span>
        <div style={{ position: 'relative', flex: '1', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search for artisans..."
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
              onClick={clearSearchTerm}
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
          value={filterSkill}
          onChange={(e) => {
            setFilterSkill(e.target.value);
            const params = new URLSearchParams();
            if (searchTerm) params.append("term", searchTerm);
            if (e.target.value) params.append("skill", e.target.value);

            router.push(`?${params.toString()}`);
            fetchArtisans(Object.fromEntries(params.entries())); // Trigger API call immediately
          }}
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
          <option value="">All Skills</option>
          <option value="Woodworking">Woodworking</option>
          <option value="Pottery">Pottery</option>
          <option value="Painting">Painting</option>
          <option value="Sculpting">Sculpting</option>
          <option value="Jewelry Making">Jewelry Making</option>
          <option value="Weaving">Weaving</option>
          <option value="Embroidery">Embroidery</option>
          <option value="Leather Crafting">Leather Crafting</option>
          <option value="Metalworking">Metalworking</option>
          <option value="Calligraphy">Calligraphy</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Furniture Making">Furniture Making</option>
          <option value="Tailoring">Tailoring</option>
          <option value="Knitting">Knitting</option>
          <option value="Quilting">Quilting</option>
          <option value="Glass Blowing">Glass Blowing</option>
          <option value="Ceramics">Ceramics</option>
          <option value="Photography">Photography</option>
          <option value="Illustration">Illustration</option>
          <option value="Digital Art">Digital Art</option>
          <option value="Soap Making">Soap Making</option>
          <option value="Candle Making">Candle Making</option>
          <option value="Papercraft">Papercraft</option>
          <option value="Blacksmithing">Blacksmithing</option>
          <option value="Baking">Baking</option>
          <option value="Tattoo Art">Tattoo Art</option>
          <option value="Makeup Artistry">Makeup Artistry</option>
          <option value="Hair Styling">Hair Styling</option>
          <option value="Floristry">Floristry</option>
          <option value="Stonemasonry">Stonemasonry</option>
          <option value="Mosaic Making">Mosaic Making</option>
          <option value="Bookbinding">Bookbinding</option>
          <option value="Basket Weaving">Basket Weaving</option>
          <option value="Toy Making">Toy Making</option>
          <option value="Fashion Design">Fashion Design</option>
          <option value="Screen Printing">Screen Printing</option>
          <option value="Sign Painting">Sign Painting</option>
          <option value="Other">Other</option>
        </select>
      </form>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {filterSkill && (
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
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(4, 181, 78, 1)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(4, 181, 78, 0.2)';
              e.currentTarget.style.color = 'rgba(4, 181, 78, 1)';
            }}
          >
            <span>{filterSkill}</span>
            <AiOutlineClose
              onClick={(e) => {
                e.stopPropagation();
                clearSkillFilter();
              }}
              style={{
                marginLeft: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'inherit',
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Spinner color="success"/>
        ) : artisans.length > 0 ? (
          artisans.map((artisan) => (
            <Card
              key={artisan._id}
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
                src={artisan.image || 'https://via.placeholder.com/300x150?text=Artisan+Image'}
                alt={artisan.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>{artisan.name}</h3>
                <p style={{ margin: '0 0 5px', fontSize: '14px', color: '#555' }}>{artisan.bio}</p>
                <p><b>Skills:</b> {artisan.skills.join(", ")}</p>
                <p><b>Location:</b> {artisan.location}</p>
                <p><b>Email:</b> {artisan.contactEmail}</p>
                {artisan.phone && <p><b>Phone:</b> {artisan.phone}</p>}
                {artisan.website && (
                  <Button
                    size="sm"
                    onClick={() => window.open(artisan.website, '_blank')}
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
          <p style={{ fontSize: '18px', color: '#888' }}>No artisans found.</p>
        )}
      </div>
    </div>
  );
};

export default LocalArtisansPage;
