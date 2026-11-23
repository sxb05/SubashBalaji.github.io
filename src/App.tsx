import Nav from "./components/Nav";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Education from "./components/Education";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="top">
        <Hero />
        <Projects />
        <TechStack />
        <Education />
        <About />
      </main>
      <Contact />
      <footer>
        <div className="wrap">© {new Date().getFullYear()} Subash Balaji S <span>·</span> Built with React &amp; TypeScript</div>
      </footer>
    </>
  );
}
