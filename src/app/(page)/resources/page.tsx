'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';


const resources = [
  {
    id: 1,
    title: 'How to Build an Online Presence',
    description: 'Learn the basics of creating a professional online presence for your business or craft.',
    link: 'https://example.com/online-presence-guide',
    category: 'Business',
  },
  {
    id: 2,
    title: 'Crafting Tutorials for Beginners',
    description: 'Step-by-step video guides to help artisans refine their craft.',
    link: 'https://example.com/crafting-tutorials',
    category: 'Artisan',
  },
  {
    id: 3,
    title: 'Social Media Marketing 101',
    description: 'Discover effective strategies to promote your business on social media platforms.',
    link: 'https://example.com/social-media-marketing',
    category: 'Marketing',
  },
];

const videos = [
  {
    id: 1,
    title: 'Getting Started with Knitting',
    videoUrl: 'https://www.youtube.com/embed/0zGNjHnZ91c',
  },
  {
    id: 2,
    title: 'How to Start a Business',
    videoUrl: 'https://www.youtube.com/embed/0Q4BZhTVSqk',
  },
  {
    id: 3,
    title: 'Make Your Own Strawberry Jam',
    videoUrl: 'https://www.youtube.com/embed/dcc4ZaRYhQc',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Jane Doe',
    feedback: 'These resources helped me grow my small crafting business. Highly recommend!',
  },
  {
    id: 2,
    name: 'John Smith',
    feedback: 'The tutorials are detailed and easy to follow. I’ve learned so much!',
  },
];

const faqs = [
  {
    question: 'Are the resources free?',
    answer: 'Yes, most of the resources and tutorials are free to access.',
  },
  {
    question: 'How can I contribute my own guides?',
    answer: 'You can submit your guides through the "Submit a Resource" button on this page.',
  },
  {
    question: 'Can I request a specific type of resource?',
    answer: 'Yes, feel free to contact us with your requests, and we’ll do our best to include them.',
  },
];

type FAQItemProps = {
  question: string;
  answer: string;
};


const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        border: '1px solid #E9ECEF',
        borderRadius: '10px',
        marginBottom: '10px',
        overflow: 'hidden',
        backgroundColor: isOpen ? '#f8f9fa' : '#FFFFFF',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
          padding: '15px',
          backgroundColor: '#04b54e',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h4 style={{ margin: 0 }}>{question}</h4>
        <span style={{ fontSize: '20px' }}>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div style={{ padding: '15px', color: '#555' }}>
          <p style={{ margin: 0 }}>{answer}</p>
        </div>
      )}
    </div>
  );
};

const ResourcesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        
        AOS.init({
          duration: 1000, // Animation duration in ms
          easing: 'ease-in-out',
          once: true, // Animation triggers only once
        });
      }, []);
    
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    arrows: true,
  };
  return (
    <div style={{ backgroundColor: '#E9ECEF', paddingBottom: '40px' }}>
      <section
        data-aos="fade-up"
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#04b54e',
          color: '#FFFFFF',
        }}
      >
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '20px' }}>
          Empower Your Business and Craft
        </h1>
        <p style={{ fontSize: '20px', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
          Discover tools, resources, and tutorials to help artisans and businesses thrive in the digital age.
        </p>
        <Button
          onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
          style={{
            marginTop: '30px',
            backgroundColor: '#FFFFFF',
            color: '#04b54e',
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '25px',
          }}
        >
          Get Started
        </Button>
      </section>
      <section data-aos="fade-up" style={{ padding: '40px 34px' }}>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#04b54e',
          }}
        >
          Watch and Learn
        </h2>
        <Slider {...sliderSettings} >
          {videos.map((video) => (
            <div key={video.id} style={{ padding: '10px', cursor: 'pointer' }}>
              <iframe
                width="100%"
                height="200"
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  borderRadius: '10px',
                  border: '2px solid #E9ECEF',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              ></iframe>
              <h3 style={{ fontSize: '18px', margin: '10px 0 5px', color: '#333333', textAlign: 'center' }}>
                {video.title}
              </h3>
            </div>
          ))}
        </Slider>
      </section>

      {/* Featured Guides Section */}
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
          Featured Guides
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {resources.map((resource) => (
            <div
              key={resource.id}
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
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#04b54e' }}>{resource.title}</h3>
              <p style={{ fontSize: '14px', color: '#555555', marginBottom: '20px' }}>{resource.description}</p>
              <Button
                onClick={() => window.open(resource.link, '_blank')}
                style={{
                  backgroundColor: '#04b54e',
                  color: '#FFFFFF',
                  borderRadius: '25px',
                  width: '100%',
                  fontWeight: 'bold',
                  padding: '10px',
                }}
              >
                Read More
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* User Stories Section */}
      <section data-aos="fade-up" style={{ padding: '40px 20px', backgroundColor: '#E9ECEF' }}>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#04b54e',
          }}
        >
          User Stories
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E9ECEF',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px' }}>
                "{testimonial.feedback}"
              </p>
              <h4 style={{ fontWeight: 'bold', color: '#04b54e' }}>- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
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
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Footer Contact CTA */}
      <footer
        data-aos="fade-up"
        style={{
          padding: '60px 20px',
          backgroundColor: '#04b54e',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Join Our Community</h2>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Have a resource or guide to share? Want to request something new? Let’s build something amazing together!
        </p>
        <Button
          onClick={() => alert('Submit your resources now!')}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#04b54e',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '15px 30px',
            borderRadius: '25px',
          }}
        >
          Submit a Resource
        </Button>
      </footer>
    </div>
  );
};

export default ResourcesPage;