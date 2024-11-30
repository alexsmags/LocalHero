'use client';
import React, { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: 'ease-in-out',
      once: true, // Animation triggers only once
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#F9FAFB', paddingBottom: '40px' }}>
      {/* Hero Section */}
      <section
        data-aos="fade-up"
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#04b54e',
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
      <Image
            src="/images/community.jpg"
            alt="Community Banner"
            width={1500} 
            height={400} 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.5,
                zIndex: -1,
            }}
/>

        <h1
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: '1.3',
          }}
        >
          About Local Hero
        </h1>
        <p style={{ fontSize: '20px', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
          At <strong>Local Hero</strong>, we are dedicated to empowering communities by bridging the gap between local
          businesses, artisans, and the people who value their craft. Our mission is to foster meaningful connections
          that help neighborhoods thrive.
        </p>
      </section>

      <section data-aos="fade-up" style={{ padding: '40px 20px' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <img
            src="/images/mission.jpg"
            alt="Mission Image"
            style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
          />
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#04b54e',
            }}
          >
            Our Mission
          </h2>
          <p style={{ fontSize: '18px', color: '#555555', lineHeight: '1.8' }}>
            We believe in the power of local. Our mission is to connect people to their local communities by making it
            easier to discover businesses, artisans, and craftspeople nearby. Whether it’s finding a handmade treasure,
            supporting a local entrepreneur, or learning a new skill from an artisan, we’re here to make it happen.
          </p>
        </div>
      </section>

      <section data-aos="fade-up" style={{ padding: '40px 20px', backgroundColor: '#FFFFFF' }}>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#04b54e',
          }}
        >
          Our Values
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {[
            {
              title: 'Community',
              description: 'Building stronger communities by promoting local connections.',
              img: '/images/hands.jpg',
            },
            {
              title: 'Sustainability',
              description:
                'Encouraging sustainable practices through local sourcing and eco-conscious initiatives.',
              img: '/images/community.jpg',
            },
            {
              title: 'Creativity',
              description:
                'Celebrating the talent, skill, and artistry of local artisans and makers.',
              img: '/images/creativity.png',
            },
          ].map((value, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E9ECEF',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <img
                src={value.img}
                alt={`${value.title} Image`}
                style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }}
              />
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#04b54e' }}>{value.title}</h3>
              <p style={{ fontSize: '14px', color: '#555555', marginBottom: '20px' }}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        data-aos="fade-up"
        style={{
          padding: '60px 20px',
          backgroundColor: '#04b54e',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Join the Movement</h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', lineHeight: '1.8' }}>
          Whether you’re a local business, an artisan, or someone looking to connect with their community, Local Hero is
          here for you. Together, we can create thriving neighborhoods and celebrate the best of local culture.
        </p>
        <Button
          onClick={() => alert('Thank you for joining Local Hero!')}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#04b54e',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '15px 30px',
            borderRadius: '25px',
          }}
        >
          Get Involved
        </Button>
      </section>
    </div>
  );
};

export default AboutUsPage;
