"use client"

import Stars from "./components/Stars";
import BloomBackground from "./components/BloomBackground";
import GradientTitle from "./components/GradientTitle";
import GradientText from "./components/GradientText";
import GradientButton from "./components/GradientButton";
import ViewMoreLink from "./components/ViewMoreLink";
import FadeIn from "./components/FadeIn";
import ParallaxSection from "./components/ParallaxSection";
import Section from './components/Section';
import Heading from './components/Heading';
import Paragraph from './components/Paragraph';
import GradientDivider from "./components/GradientDivider";
import ProjectsSlider, { Project } from "./components/ProjectsSlider";
import DollarSigns from "./components/DollarSigns";
import ContactForm from "./components/ContactForm";
import { useState } from "react";
import Modal from "./components/Modal";
import ProjectCard from "./components/ProjectsSlider/ProjectCard";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="w-full">
      <BloomBackground />
      <Stars numOfStars={150} />
      <main className="min-h-screen flex flex-col justify-center items-center relative z-10">
        <GradientTitle>
          Discover the true potential<br/>
          of your idea.
        </GradientTitle>
        <FadeIn duration={2.5}>
          <GradientText className="mt-6">
            I&apos;m <span className="text-white font-semibold">Ícaro Borges</span>, turning your ideas into reality with
            <br />
            creativity and collaboration.
          </GradientText>
        </FadeIn>
        <FadeIn duration={1}>
          <GradientButton
            content="Contact me"
            onClick={() => {
              const contactSection = document.getElementById("contact-section");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </FadeIn>
        <FadeIn duration={1.5}>
          <ViewMoreLink
            className="mt-12"
            sectionId="about-section"
          />
        </FadeIn>
      </main>
      <ParallaxSection className="pt-48 px-0 md:px-16">
        <Section id="about-section" className="flex flex-col gap-48 items-center md:gap-0 md:flex-row justify-between px-8 md:px-0">
          <div className="flex flex-col gap-8">
            <Heading
              level={2}
            >
              Who said great software <br/>
              has to cost a fortune?
            </Heading>
            <Paragraph className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#A3A3A3] to-[#71717A]">
              Great software doesn&apos;t have to be out of reach. Whether <br/>
              you&apos;ve got a big idea or a small project, it can be brought to <br/>
              life without all the stress. Let&apos;s make it happen, together, with <br/>
              solutions that work for you.
            </Paragraph>
          </div>
          <DollarSigns />
        </Section>
        <Section id="services-section" className="flex flex-col gap-8 mt-48 px-8 md:px-0">
          <Heading level={2} className="py-1">
            What about my <br/>
            professional experience?
          </Heading>
          <ProjectsSlider
            onClick={handleProjectClick}
          />
          <GradientDivider
            className="my-24"
          />
        </Section>
        <Section id="contact-section" className="flex flex-col items-center gap-8 mt-12">
          <Heading level={2} className="py-1">
            Get in touch
          </Heading>
          <ContactForm />
        </Section>
      </ParallaxSection>
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}>
          {selectedProject && (
            <div>
              <ProjectCard
                title={selectedProject.title}
                description={selectedProject.description}
                tags={selectedProject.tags}
                techTags={selectedProject.techTags}
                imageSrc={selectedProject.imageSrc}
                imageAlt={selectedProject.imageAlt}
                redirect={selectedProject.redirect || "none"}
                disabled={!selectedProject.redirect}
              />
            </div>
          )}
      </Modal>
    </div>
  );
}
