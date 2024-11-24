import React, { useState, useEffect } from "react";

interface SkillsInputProps {
  initialSkills?: string[]; // Pre-selected skills for editing
  onChange: (skills: string[]) => void;
}

const SkillsInput: React.FC<SkillsInputProps> = ({ initialSkills = [], onChange }) => {
  const predefinedSkills = [
    "Woodworking",
    "Pottery",
    "Painting",
    "Sculpting",
    "Jewelry Making",
    "Weaving",
    "Embroidery",
    "Leather Crafting",
    "Metalworking",
    "Calligraphy",
    "Graphic Design",
    "Carpentry",
    "Furniture Making",
    "Tailoring",
    "Knitting",
    "Quilting",
    "Glass Blowing",
    "Ceramics",
    "Photography",
    "Illustration",
    "Digital Art",
    "Soap Making",
    "Candle Making",
    "Papercraft",
    "Blacksmithing",
    "Baking",
    "Tattoo Art",
    "Makeup Artistry",
    "Hair Styling",
    "Floristry",
    "Stonemasonry",
    "Mosaic Making",
    "Bookbinding",
    "Basket Weaving",
    "Toy Making",
    "Fashion Design",
    "Screen Printing",
    "Sign Painting",
    "Upholstery",
    "Other"
  ];
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialSkills);
  const [customSkill, setCustomSkill] = useState("");

  useEffect(() => {
    setSelectedSkills(initialSkills); // Update selected skills when `initialSkills` changes
  }, []);

  const toggleSkill = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill) // Remove skill
      : [...selectedSkills, skill]; // Add skill
    setSelectedSkills(updatedSkills);
    onChange(updatedSkills);
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      const updatedSkills = [...selectedSkills, customSkill];
      setSelectedSkills(updatedSkills);
      onChange(updatedSkills);
    }
    setCustomSkill("");
  };

  return (
    <div>
      <label>Skills</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
        {predefinedSkills.map((skill) => (
          <div
            key={skill}
            onClick={() => toggleSkill(skill)}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              backgroundColor: selectedSkills.includes(skill) ? "#04b54e" : "#f0f0f0",
              color: selectedSkills.includes(skill) ? "#fff" : "#000",
              border: "1px solid #04b54e",
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
