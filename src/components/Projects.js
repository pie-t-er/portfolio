import React from 'react';

const projects = [
  {
    title: 'Happy Campers',
    description: 'A camping trip itinerary creator implemented entirely in C++, leveraging data on thousands of American campsites to generate personalized trip plans.',
    technologies: ['C++', 'Algorithms', 'Data Structures'],
    features: [
      'Optimized travel route generation',
      'Integrated amenity and pricing details',
      'Command-line interface for trip planning'
    ],
    githubLink: "https://github.com/pie-t-er/happy-campers"
  },
  {
    title: 'Tennis Oracle',
    description: 'A machine learning model trained on hitorical tennis data built using SciKit-Learn, leveraging data on thousands of player rankings and historical game data to predict game winners. Model achieves 70% accuracy.',
    technologies: ['Machine Learning', 'Web Scraping', 'Data Application'],
    features: [
      'Reliable game prediction',
      'Integrated multiple large datasets',
      'written in a Jupyter Notebook'
    ],
    githubLink: "https://github.com/PRANETALLU/TennisOracle/tree/main"
  },
  {
    title: 'Hower',
    description: 'A time management system that improves upon the ability to manage and keep track of time. Hower enables users to put the power back in how they get things done. Life should be lived doing, rather than planning.',
    technologies: ['Agile', 'Python Flask', 'UI/UX'],
    features: [
      'Time/task/event management',
      'User authentication',
      'Sleek and minimalist UI'
    ],
    githubLink: "https://github.com/pie-t-er/hower"
  },
  {
    title: 'Noah',
    description: "The training application for Ghana's Ark Foundation team on website maintenance.",
    technologies: ['Agile', 'Electron React', 'UI/UX'],
    features: [
      'Modularized tutorital formulation',
      'Custom tutorial creation',
      'Simple UI, easily navigable'
    ],
    githubLink: "https://github.com/eli-johnson-04/noah"
  }
];

function ProjectCard({ project }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-bold text-brand-primary mb-3">
        {project.title}
      </h3>
      <p className="text-gray-700 mb-4">
        {project.description}
      </p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span 
              key={tech} 
              className="bg-brand-secondary/10 text-brand-secondary px-2 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
        <ul className="list-disc list-inside text-gray-700">
          {project.features.map(feature => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      
      {project.githubLink && (
        <div className="mt-4">
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-primary hover:underline"
          >
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-brand-primary">
          My Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        
        {/* Button to Projects Page */}
        <div className="text-center mt-8">
          <a href="/projects" className="inline-block bg-brand-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-brand-secondary transition duration-300">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}


export default Projects;