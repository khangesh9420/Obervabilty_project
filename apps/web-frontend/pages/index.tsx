import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'

type Project = { id: number; title: string; description: string; tech: string }
type Skill = { id: number; name: string; category: string }
type Experience = { id: number; role: string; company: string; years: string }

interface HomeProps {
  projects: Project[]
  skills: Skill[]
  experience: Experience[]
}

export default function Home({ projects, skills, experience }: HomeProps) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/telemetry/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/' })
    })
  }, [])

  const [status, setStatus] = useState<string | null>(null)
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    setStatus(res.ok ? 'Message sent!' : 'Error sending message')
    form.reset()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Button onClick={() => document.documentElement.classList.toggle('dark')} className="absolute top-4 right-4">Toggle</Button>
      <section className="h-screen flex flex-col items-center justify-center">
        <motion.h1 className="text-4xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Khangesh Matte
        </motion.h1>
        <p className="mt-2">DevOps Engineer | Automation | Cloud | CI/CD</p>
      </section>
      <section id="skills" className="p-8">
        <h2 className="text-2xl mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map(s => (
            <div key={s.id} className="p-4 border rounded text-center">{s.name}</div>
          ))}
        </div>
      </section>
      <section id="experience" className="p-8 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl mb-4">Experience</h2>
        <ul>
          {experience.map(e => (
            <li key={e.id} className="mb-2">{e.role} - {e.company} ({e.years})</li>
          ))}
        </ul>
      </section>
      <section id="projects" className="p-8">
        <h2 className="text-2xl mb-4">Projects</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="p-4 border rounded">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm">{p.description}</p>
              <p className="text-xs mt-2 italic">{p.tech}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="achievements" className="p-8 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl mb-4">Achievements</h2>
        <ul className="list-disc ml-4">
          <li>Reduced deployment time by 40%</li>
          <li>Boosted code quality with SonarQube & Black Duck</li>
        </ul>
      </section>
      <section id="contact" className="p-8">
        <h2 className="text-2xl mb-4">Contact</h2>
        <form onSubmit={submit} className="flex flex-col max-w-md">
          <input name="name" placeholder="Name" className="mb-2 p-2 border rounded" required />
          <input name="email" type="email" placeholder="Email" className="mb-2 p-2 border rounded" required />
          <textarea name="message" placeholder="Message" className="mb-2 p-2 border rounded" required />
          <Button type="submit">Send</Button>
        </form>
        {status && <p className="mt-2">{status}</p>}
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const base = process.env.API_BASE_URL || 'http://gateway:8080'
  const [projects, skills, experience] = await Promise.all([
    fetch(`${base}/api/projects`).then(r => r.json()),
    fetch(`${base}/api/skills`).then(r => r.json()),
    fetch(`${base}/api/experience`).then(r => r.json()),
  ])
  return { props: { projects, skills, experience } }
}
