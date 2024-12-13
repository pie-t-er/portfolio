import React, { useState, useEffect, useRef } from 'react';

function SkillBar({ skill, level }) {
  const [width, setWidth] = useState(0); // Initialize with 0 width
  const [animate, setAnimate] = useState(false); // State to trigger animation
  const skillRef = useRef(null); // Reference to the skill bar element

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trigger animation when the skill bar enters the viewport
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimate(true); // Trigger animation when in view
            setWidth(level);  // Set width to the skill level
            observer.disconnect(); // Stop observing after triggering
          }
        });
      },
      { threshold: 0.5 } // Trigger animation when 50% of the element is visible
    );

    if (skillRef.current) {
      observer.observe(skillRef.current); // Start observing the skill bar element
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current); // Clean up observer on unmount
      }
    };
  }, [level]);

  return (
    <div className="flex items-center" ref={skillRef}>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full bg-blue-500`}
          style={{
            width: `${animate ? width : 0}%`, // Animate from 0% to level
            transition: 'width 2s ease-out', // Explicit transition duration
          }}
        ></div>
      </div>
      <span className="ml-4 text-brand-primary">{skill}</span>
    </div>
  );
}

function Skills() {
  // Categorized skills data
  const skills = {
    languages: [
      { skill: "Python", level: 80 },
      { skill: "JavaScript", level: 70 },
      { skill: "C++", level: 60 },
      { skill: "CSS", level: 50 },
    ],
    frameworks: [
      { skill: "React", level: 75 },
      { skill: "Flask", level: 65 },
      { skill: "Tailwind CSS", level: 60 },
      { skill: "Electron", level: 55 },
    ],
    tools: [
      { skill: "Git", level: 85 },
      { skill: "Jupyter", level: 70 },
      { skill: "Agile", level: 80 },
    ],
    softSkills: [
      { skill: "Communication", level: 95 },
      { skill: "Problem-Solving", level: 90 },
      { skill: "Teamwork", level: 92 },
      { skill: "Adaptability", level: 85 },
      { skill: "Time Management", level: 88 },
    ],
  };

  // Helper function to render a skill category section
  const renderSkillCategory = (category, title) => {
    return (
      <div>
        <h3 className="text-2xl font-semibold text-brand-primary mb-4">{title}</h3>
        <div className="space-y-4">
          {category.map((skill) => (
            <SkillBar key={skill.skill} skill={skill.skill} level={skill.level} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-brand-primary">My Skills</h2>

        <div className="space-y-12">
          {/* Render each skill category */}
          {renderSkillCategory(skills.languages, "Languages")}
          {renderSkillCategory(skills.frameworks, "Frameworks")}
          {renderSkillCategory(skills.tools, "Tools/Techniques")}
          {renderSkillCategory(skills.softSkills, "Soft Skills")}
        </div>
      </div>
    </section>
  );
}


export default Skills;