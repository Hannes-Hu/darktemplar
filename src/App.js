import React from 'react';
import './styles/App.css';
import Background from './components/Background';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import VoluntaryActivities from './components/VoluntaryActivities';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Background />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <VoluntaryActivities />
        <Contact />
      </main>
    </div>
  );
}

export default App;
