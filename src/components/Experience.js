import React from 'react';

const experiences = [
  {
    title: 'Study Abroad: UI/UX Design & Software Engineering Internship',
    company: 'UF in Ghana - Accra, Ghana',
    date: 'Summer 2024',
    highlights: [
      'Collaborated with a local non-profit to revamp and design a web presence',
      'Developed an app and created a handoff document for digital assets',
      'Conducted user research and usability testing in a cross-cultural context'
    ],
    technologies: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'React', 'Electron', 'GitHub']
  },
  {
    title: 'Certified Trainer',
    company: 'Chipotle - Tampa/Gainesville, FL',
    date: 'September 2020 - May 2024',
    highlights: [
      'Cross-trained in every operational role, demonstrating adaptability',
      'Trained new team members, enhancing overall team performance',
      'Upheld commitment to sustainability and quality'
    ],
    technologies: ['Team Leadership', 'Training', 'Customer Service']
  },
  {
    title: 'Walk-Around Camp Counselor',
    company: 'Chanco on the James - Spring Grove, VA',
    date: 'Summer 2023/2024',
    highlights: [
      'Supervised 300+ kids using development principles',
      'Lifeguard, First-Aid, and CPR Certified',
      'Guided campers in skill-building and educational workshops'
    ],
    technologies: ['Youth Development', 'Leadership', 'Safety Management']
  }
];

function ExperienceCard({ experience }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 transition-all hover:shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-brand-primary">
            {experience.title}
          </h3>
          <p className="text-gray-700 text-md">
            {experience.company}
          </p>
        </div>
        <span className="text-sm text-gray-500 font-medium">
          {experience.date}
        </span>
      </div>
      
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
        {experience.highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
      
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map(tech => (
          <span 
            key={tech} 
            className="bg-brand-secondary/10 text-brand-secondary px-2 py-1 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-12 bg-brand-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-brand-primary">
          Professional Experience
        </h2>
        
        <div className="max-w-2xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;