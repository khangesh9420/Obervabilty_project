const { useState, useEffect } = React;

function Hero() {
  useEffect(() => {
    new Typed('#typed-name', {
      strings: ['Khangesh Matte'],
      typeSpeed: 100,
      showCursor: false
    });
    if (window.tsParticles) {
      tsParticles.load('tsparticles', {
        fullScreen: { enable: false },
        background: { color: 'transparent' },
        particles: {
          number: { value: 40 },
          color: { value: '#ffffff' },
          links: { enable: true, color: '#ffffff' },
          move: { enable: true, speed: 1 },
          size: { value: 2 }
        }
      });
    }
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div id="tsparticles" className="absolute inset-0 -z-10"></div>
      <h1 id="typed-name" className="text-5xl md:text-6xl font-extrabold mb-4"></h1>
      <p className="text-xl md:text-2xl mb-6">DevOps Engineer | Automation | Cloud | CI/CD</p>
      <div className="flex space-x-4">
        <a href="cv.pdf" className="px-4 py-2 bg-teal-500 rounded shadow hover:bg-teal-600">Download CV</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener" className="text-2xl"><i className="fab fa-linkedin"></i></a>
        <a href="mailto:khangesh@example.com" className="text-2xl"><i className="fas fa-envelope"></i></a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900" data-aos="fade-up">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center">
        <img src="https://via.placeholder.com/200" alt="Khangesh Matte" className="w-48 h-48 rounded-full mb-6 md:mb-0 md:mr-8 shadow-lg transform hover:scale-105 transition-transform" />
        <p className="text-lg">
          I am a DevOps engineer with 3 years of experience in automation, CI/CD, Kubernetes, cloud (AWS & Azure), containerization, and security.
        </p>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    'docker', 'kubernetes', 'terraform', 'jenkins', 'githubactions',
    'prometheus', 'grafana', 'amazonwebservices', 'azure', 'python', 'cplusplus'
  ];
  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800" data-aos="fade-up">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {skills.map(s => (
            <div key={s} className="flex flex-col items-center">
              <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s}/${s}-original.svg`} alt={s} className="w-12 h-12" />
              <span className="mt-2 capitalize text-sm">{s.replace(/githubactions/,'GitHub Actions').replace(/amazonwebservices/,'AWS')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const experiences = [
    {
      role: 'DevOps Engineer',
      company: 'Tech Solutions GmbH',
      location: 'Bochum, Germany',
      years: '2022 - Present',
      achievements: ['Reduced deployment time by 40%', 'Implemented GitOps practices']
    },
    {
      role: 'Automation Engineer',
      company: 'InnovateX',
      location: 'Berlin, Germany',
      years: '2020 - 2022',
      achievements: ['Built CI/CD pipelines', 'Monitoring & Observability improvements']
    }
  ];
  return (
    <section id="experience" className="py-16 bg-white dark:bg-gray-900" data-aos="fade-up">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <div className="relative border-l-2 border-teal-500 ml-4">
          {experiences.map((exp, idx) => (
            <div key={idx} className="mb-10 ml-4">
              <div className="absolute -left-4 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white">{idx + 1}</div>
              <h3 className="text-xl font-semibold">{exp.role} - {exp.company}</h3>
              <span className="text-sm italic">{exp.location} | {exp.years}</span>
              <ul className="list-disc ml-5 mt-2">
                {exp.achievements.map((a, i) => <li key={i} className="hover:text-teal-500">{a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: 'Infrastructure Automation',
      image: 'https://via.placeholder.com/300x200',
      description: 'Automated infrastructure provisioning with Terraform and Ansible.',
      tools: ['Terraform', 'Ansible', 'AWS']
    },
    {
      title: 'GitOps Pipeline',
      image: 'https://via.placeholder.com/300x200',
      description: 'Implemented GitOps workflows using ArgoCD and Kubernetes.',
      tools: ['ArgoCD', 'Kubernetes', 'Helm']
    },
    {
      title: 'Monitoring & Observability',
      image: 'https://via.placeholder.com/300x200',
      description: 'Built monitoring stack with Prometheus and Grafana.',
      tools: ['Prometheus', 'Grafana', 'Alertmanager']
    }
  ];
  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-800" data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
              <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tools.map(t => <span key={t} className="text-sm bg-teal-100 dark:bg-teal-800 px-2 py-1 rounded">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const achievements = [
    { icon: 'fa-rocket', text: 'Reduced deployment time by 40%' },
    { icon: 'fa-code', text: 'Boosted code quality with SonarQube & Black Duck' }
  ];
  return (
    <section id="achievements" className="py-16 bg-white dark:bg-gray-900" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Achievements</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
              <i className={`fa ${a.icon} text-teal-500 text-2xl`}></i>
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name required';
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.message) newErrors.message = 'Message required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      alert('Message sent!');
      setForm({ name: '', email: '', message: '' });
    }
  };
  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-800" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-2 rounded bg-white dark:bg-gray-700" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 rounded bg-white dark:bg-gray-700" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <textarea placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full p-2 rounded bg-white dark:bg-gray-700" rows="4"></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Send</button>
          </form>
          <div className="w-full h-64">
            <iframe title="map" src="https://www.google.com/maps?q=Bochum%2C%20Germany&output=embed" className="w-full h-full border-0" allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <div>
      <nav className="fixed w-full z-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
          <a href="#hero" className="font-bold">KM</a>
          <button onClick={() => setDark(!dark)} className="p-2 rounded">
            {dark ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
        </div>
      </nav>
      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <footer className="text-center p-4 bg-gray-100 dark:bg-gray-800">© {new Date().getFullYear()} Khangesh Matte</footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
