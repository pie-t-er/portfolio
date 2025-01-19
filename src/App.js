import React from 'react';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Skills from './components/Skills';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main className="flex-grow">
        <Projects />
        <Experience />
        <Skills />
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        © 2025 Pieter Alley
      </footer>
    </div>
  );
}


export default App;