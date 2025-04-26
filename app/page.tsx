import { ArrowRight, Github, Mail, Phone } from "lucide-react"
import Link from "next/link"
import AnimatedBackground from "@/components/animated-background"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import ContactForm from "@/components/contact-form"
import Image from "next/image"
import AchievementCard from "@/components/achievement-card"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Aparna</div>
          <div className="hidden md:flex space-x-6">
            <Link href="#about" className="text-white hover:text-purple-300 transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-white hover:text-purple-300 transition-colors">
              Skills
            </Link>
            <Link href="#achievements" className="text-white hover:text-purple-300 transition-colors">
              Achievements
            </Link>
            <Link href="#projects" className="text-white hover:text-purple-300 transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-white hover:text-purple-300 transition-colors">
              Contact
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              className="bg-purple-600 text-white px-4 py-1 rounded-full hover:bg-purple-700 transition-colors"
              rel="noreferrer"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
            <span className="text-purple-400">Aparna</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 animate-fadeIn animation-delay-300">
            <span className="typing-text">Passionate Coder | Creative Problem Solver | Lifelong Learner</span>
          </p>
          <div className="flex justify-center space-x-4 animate-fadeIn animation-delay-600">
            <Link
              href="#contact"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full flex items-center transition-all transform hover:scale-105"
            >
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#projects"
              className="bg-transparent border border-white text-white px-6 py-3 rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
            >
              View my work
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="h-8 w-8 text-white transform rotate-90" />
        </div>
      </section>

      {/* Rest of the page content remains unchanged */}
      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/aparna-profile.jpeg" alt="Aparna" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-500/30 hover:opacity-0 transition-opacity duration-300"></div>
            </div>
            <div>
              <p className="text-gray-200 mb-6 leading-relaxed">
                I'm a B.Tech student at Gayatri Vidya Parishad College Of Engineering with a passion for Python Full
                Stack development and content creation.
              </p>
              <p className="text-gray-200 mb-6 leading-relaxed">
                With strong skills in Python, C, HTML, CSS, and Django, I've worked on various projects including web
                applications and games. I'm also experienced in public speaking and video editing.
              </p>
              <p className="text-gray-200 mb-6 leading-relaxed">
                As an academic achiever with a CGPA of 9.72, I'm constantly looking to expand my knowledge and take on
                new challenges in the tech world.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#contact"
                  className="bg-white text-purple-700 px-6 py-2 rounded-full hover:bg-purple-100 transition-colors"
                >
                  Contact Me
                </Link>
                <Link
                  href="#skills"
                  className="border border-white text-white px-6 py-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  My Skills
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills & Education</h2>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
            <div className="flex flex-wrap gap-3">
              <SkillBadge name="Python" level={95} />
              <SkillBadge name="C" level={90} />
              <SkillBadge name="C++" level={75} />
              <SkillBadge name="Java" level={75} />
              <SkillBadge name="HTML" level={80} />
              <SkillBadge name="CSS" level={80} />
              <SkillBadge name="JavaScript" level={70} />
              <SkillBadge name="MySQL" level={75} />
              <SkillBadge name="Git" level={80} />
              <SkillBadge name="Linux" level={70} />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Education</h3>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-4 hover:bg-white/10 transition-colors">
              <h4 className="text-xl font-semibold text-purple-400">Bachelor of Technology</h4>
              <p className="text-gray-300">Computer Science & Engineering</p>
              <p className="text-gray-300">Gayatri Vidya Parishad College Of Engineering(A)</p>
              <p className="text-gray-400 text-sm mt-2">2023 - 2027 | CGPA: 9.72</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-4 hover:bg-white/10 transition-colors">
              <h4 className="text-xl font-semibold text-purple-400">Intermediate, MPC</h4>
              <p className="text-gray-300">Sri Chaitanya Junior College</p>
              <p className="text-gray-400 text-sm mt-2">2021 - 2023 | Percentage: 98.6%</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-4 hover:bg-white/10 transition-colors">
              <h4 className="text-xl font-semibold text-purple-400">School Education</h4>
              <p className="text-gray-300">Dr. K.K.R's Gowtham School</p>
              <p className="text-gray-400 text-sm mt-2">2014 - 2020 | Percentage: 100%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Achievements</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <AchievementCard
              title="Academic Topper"
              description="Received Academic Topper Achievement Certificate from the institution with CGPA: 9.89 [sem-1: 9.77, sem-2: 10.00, sem-3: 9.44]"
            />
            <AchievementCard
              title="LeetCode Problem Solver"
              description="Solved nearly 50 problems on LeetCode, demonstrating strong algorithmic and problem-solving skills"
            />
            <AchievementCard
              title="Python Certification"
              description="Earned Python advanced certificate from Infosys Springboard"
            />
            <AchievementCard
              title="Hackathon Participant"
              description="Participated in Hackathon, gaining valuable experience in rapid development and teamwork"
            />
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Extracurricular Activities</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <p className="text-gray-200">📝 Asci Club – Documentation lead</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <p className="text-gray-200">🤝 An NSS Volunteer</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <p className="text-gray-200">🔌 An IEEE Volunteer</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <p className="text-gray-200">💡 An IIC Volunteer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">My Projects</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title="E-Commerce Website"
              description="A full-stack e-commerce platform with user authentication, product catalog, and payment integration."
              tags={["React", "Node.js", "MongoDB"]}
              image="/images/ecommerce-project.jpeg"
            />
            <ProjectCard
              title="Real Estate Website"
              description="A property listing website with search functionality, property details, and contact forms."
              tags={["HTML", "CSS", "JavaScript"]}
              image="/images/real-estate-project.jpeg"
            />
            <ProjectCard
              title="Memory Matching Game"
              description="A fun memory matching game where players need to find matching pairs of cards. Test your memory skills with this interactive game."
              tags={["HTML", "CSS", "JavaScript"]}
              image="/images/memory-game-project.jpeg"
            />
            <ProjectCard
              title="Portfolio Website"
              description="A personal portfolio website showcasing skills, projects, and professional information."
              tags={["Next.js", "Tailwind CSS", "Animation"]}
              image="/images/portfolio-project.jpeg"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Get In Touch</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-center text-gray-200">
                  <Phone className="h-5 w-5 mr-3 text-purple-400" />
                  <span>8074422692</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <Mail className="h-5 w-5 mr-3 text-purple-400" />
                  <a href="mailto:aparnakl2006@gmail.com" className="hover:text-purple-300 transition-colors">
                    aparnakl2006@gmail.com
                  </a>
                </div>
                <div className="flex items-center text-gray-200">
                  <Github className="h-5 w-5 mr-3 text-purple-400" />
                  <a
                    href="https://github.com/Aparna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-300 transition-colors"
                  >
                    github.com/Aparna
                  </a>
                </div>
                <div className="flex items-center text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-purple-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                  <a
                    href="https://linkedin.com/in/Aparna_2006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-300 transition-colors"
                  >
                    linkedin.com/in/Aparna_2006
                  </a>
                </div>
                <div className="flex items-center text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-purple-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path>
                  </svg>
                  <a
                    href="https://leetcode.com/Aparna3_005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-300 transition-colors"
                  >
                    leetcode.com/Aparna3_005
                  </a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-white mb-4 md:mb-0">Aparna</div>
            <div className="flex space-x-6">
              <a href="mailto:aparnakl2006@gmail.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/Aparna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/Aparna_2006"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
              <a
                href="https://leetcode.com/Aparna3_005"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Aparna. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
