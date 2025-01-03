import React from 'react';
import DarkModeToggle from './DarkMode';
import DownloadResume from './Resume';

function Hero() {
  return (
    <section className="hero bg-brand-primary text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Hello, I'm Pieter Alley
        </h1>
        <p className="text-xl mb-6">
          I'm a passionate web developer with a love for building dynamic, user-friendly applications. 
          Take a look at my work and experience below!
        </p>
        <a 
          href="#projects"
          className="bg-white text-brand-primary py-2 px-6 rounded-lg text-lg hover:bg-brand-secondary transition duration-300"
        >
          See My Projects
        </a>
        <DownloadResume />
      </div>
    </section>
  );
}

export default Hero;