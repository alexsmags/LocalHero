'use client';
import React, { useState } from 'react';
import { Card, Button } from '@nextui-org/react';

const businesses = [
  {
    id: 1,
    name: 'Handmade Artisans',
    category: 'Artisans',
    description: 'Beautiful handmade crafts and products.',
    website: 'https://handmadeartisans.com',
    contact: 'info@handmadeartisans.com',
    location: '123 Artisan Lane, Artisan City',
    image: 'https://via.placeholder.com/300x150?text=Handmade+Artisans',
  },
  {
    id: 2,
    name: 'Local Groceries',
    category: 'Goods',
    description: 'Fresh and organic produce from local farms.',
    website: 'https://localgroceries.com',
    contact: 'contact@localgroceries.com',
    location: '456 Farm Way, Greenfield',
    image: 'https://via.placeholder.com/300x150?text=Local+Groceries',
  },
  {
    id: 3,
    name: 'Tech Repairs',
    category: 'Services',
    description: 'Quick and reliable tech repair services.',
    website: 'https://techrepairs.com',
    contact: 'support@techrepairs.com',
    location: '789 Tech Street, Silicon Valley',
    image: 'https://via.placeholder.com/300x150?text=Tech+Repairs',
  },
  {
    id: 4,
    name: 'Vintage Clothing',
    category: 'Goods',
    description: 'Unique vintage and retro-style clothing.',
    website: 'https://vintageclothing.com',
    contact: 'hello@vintageclothing.com',
    location: '321 Retro Avenue, Fashion City',
    image: 'https://via.placeholder.com/300x150?text=Vintage+Clothing',
  },
  {
    id: 5,
    name: 'Cafe Delight',
    category: 'Services',
    description: 'Cozy coffee shop with locally sourced beans.',
    website: 'https://cafedelight.com',
    contact: 'hello@cafedelight.com',
    location: '654 Coffee Blvd, Brewtown',
    image: 'https://via.placeholder.com/300x150?text=Cafe+Delight',
  },
  {
    id: 6,
    name: 'Urban Flora',
    category: 'Goods',
    description: 'Specializing in exotic plants and urban gardening tools.',
    website: 'https://urbanflora.com',
    contact: 'contact@urbanflora.com',
    location: '789 Green Thumb Rd, Bloom City',
    image: 'https://via.placeholder.com/300x150?text=Urban+Flora',
  },
  {
    id: 7,
    name: 'Crafty Creators',
    category: 'Artisans',
    description: 'Custom handmade gifts and personalized decorations.',
    website: 'https://craftycreators.com',
    contact: 'support@craftycreators.com',
    location: '234 Artisan Alley, Handmade Town',
    image: 'https://via.placeholder.com/300x150?text=Crafty+Creators',
  },
  {
    id: 8,
    name: 'Tech Haven',
    category: 'Services',
    description: 'Advanced IT solutions and gadget repairs for all your needs.',
    website: 'https://techhaven.com',
    contact: 'info@techhaven.com',
    location: '1024 Silicon Ave, Techopolis',
    image: 'https://via.placeholder.com/300x150?text=Tech+Haven',
  },
  {
    id: 9,
    name: 'Baker’s Bliss',
    category: 'Goods',
    description: 'Freshly baked goods and custom cakes for special occasions.',
    website: 'https://bakersbliss.com',
    contact: 'order@bakersbliss.com',
    location: '567 Sweet Street, Crumble City',
    image: 'https://via.placeholder.com/300x150?text=Baker%27s+Bliss',
  },
  {
    id: 10,
    name: 'Wellness Retreat',
    category: 'Services',
    description: 'Relaxing spa treatments and wellness packages.',
    website: 'https://wellnessretreat.com',
    contact: 'relax@wellnessretreat.com',
    location: '321 Tranquility Blvd, Serenity Hills',
    image: 'https://via.placeholder.com/300x150?text=Wellness+Retreat',
  },
];
const LocalBusinessesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
  
    const filteredBusinesses = businesses.filter((business) => {
      return (
        (business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterCategory === '' || business.category === filterCategory)
      );
    });
  
    return (
      <div style={{ padding: '20px' }}>
        {/* Search and Filter Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '15px',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                maxWidth: '400px',
                flex: '1',
                padding: '10px 15px',
                borderRadius: '25px',
                border: '2px solid #28a745',
                fontSize: '16px',
                outline: 'none',
              }}
            />
  
            {/* Filter Dropdown */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                maxWidth: '200px',
                flex: '0',
                padding: '10px 15px',
                borderRadius: '25px',
                border: '2px solid #28a745',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                outline: 'none',
              }}
            >
              <option value="">All Categories</option>
              <option value="Artisans">Artisans</option>
              <option value="Goods">Goods</option>
              <option value="Services">Services</option>
            </select>
          </div>
        </div>
  
        {/* Business Cards */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((business) => (
              <Card
                key={business.id}
                style={{
                  maxWidth: '300px',
                  padding: '0',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Image Section */}
                <img
                  src={business.image}
                  alt={business.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
  
                {/* Content Section */}
                <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0 }}>{business.name}</h3>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#888' }}>{business.category}</span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#555', flexGrow: 1 }}>{business.description}</p>
                  <p style={{ fontSize: '0.9rem', color: '#555' }}>
                    <b>Location:</b> {business.location}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '15px' }}>
                    <b>Contact:</b> {business.contact}
                  </p>
                  <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                    <Button
                      size="sm"
                      color="primary"
                      style={{
                        backgroundColor: '#28a745',
                        color: '#ffffff',
                        borderRadius: '20px',
                        padding: '8px 20px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                      onClick={() => window.open(business.website, '_blank')}
                    >
                      Visit {business.name}
                    </Button>
                  </div>
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