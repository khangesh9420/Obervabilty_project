import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'

type Project = { id: number; title: string; description: string; tech: string }
type Skill = { id: number; name: string; category: string }
type Experience = { id: number; role: string; company: string; location: string; dates: string; highlights: string | null }
type Achievement = { id: number; description: string }
type Education = { id: number; degree: string; institution: string; years: string }

interface HomeProps {
  projects: Project[]
  skills: Skill[]
  experience: Experience[]
  achievements: Achievement[]
  education: Education[]
}

export default function Home({ projects, skills, experience, achievements, education }: HomeProps) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/telemetry/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/' })
    })
  }, [])

  const [status, setStatus] = useState<string | null>(null)
  const [summary, setSummary] = useState(
    'DevOps engineer with 3 years of experience in automation, CI/CD, Kubernetes and cloud security.'
  )
  const [editingSummary, setEditingSummary] = useState(false)
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      body: (form.elements.namedItem('body') as HTMLTextAreaElement).value
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
      <section
        className="h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/devops-bg.svg')" }}
      >
        <motion.h1
          className="text-4xl font-bold bg-black/50 px-4 py-2 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Khangesh Matte - DevOps Engineer
        </motion.h1>
        <p className="mt-2 bg-black/50 px-4 py-1 rounded">Automation | Cloud | CI/CD</p>
        <div className="mt-4 flex gap-4">
          <a href="/cv.pdf" target="_blank" rel="noopener">
            <Button>View CV</Button>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener" className="underline">
            LinkedIn
          </a>
          <a href="mailto:khangesh@example.com" className="underline">
            Email
          </a>
        </div>
      </section>
      <section id="summary" className="p-8 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl mb-4">Summary</h2>
        {editingSummary ? (
          <form
            onSubmit={e => {
              e.preventDefault()
              setEditingSummary(false)
            }}
            className="flex flex-col gap-2"
          >
            <textarea
              className="p-2 border rounded bg-white text-gray-900"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => setEditingSummary(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p>{summary}</p>
            <Button className="mt-2" onClick={() => setEditingSummary(true)}>
              Edit
            </Button>
          </>
        )}
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
        {experience.map(e => (
          <div key={e.id} className="mb-4">
            <h3 className="font-semibold">{e.role} - {e.company}</h3>
            <p className="text-sm italic">{e.location} | {e.dates}</p>
            <ul className="list-disc ml-4">
              {(e.highlights?.split(';') || []).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
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
          {achievements.map(a => (
            <li key={a.id}>{a.description}</li>
          ))}
        </ul>
      </section>
      <section id="education" className="p-8">
        <h2 className="text-2xl mb-4">Education</h2>
        <ul>
          {education.map(ed => (
            <li key={ed.id} className="mb-2">{ed.degree} - {ed.institution} ({ed.years})</li>
          ))}
        </ul>
      </section>
      <section id="contact" className="p-8 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl mb-4">Contact</h2>
        <form onSubmit={submit} className="flex flex-col max-w-md">
          <input name="name" placeholder="Name" className="mb-2 p-2 border rounded" required />
          <input name="email" type="email" placeholder="Email" className="mb-2 p-2 border rounded" required />
          <input name="subject" placeholder="Subject" className="mb-2 p-2 border rounded" required />
          <textarea name="body" placeholder="Message" className="mb-2 p-2 border rounded" required />
          <Button type="submit">Send</Button>
        </form>
        {status && <p className="mt-2">{status}</p>}
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const base = process.env.API_BASE_URL || 'http://gateway:8080'
  const [projects, skills, experience, achievements, education] = await Promise.all([
    fetch(`${base}/api/projects`).then(r => r.json()),
    fetch(`${base}/api/skills`).then(r => r.json()),
    fetch(`${base}/api/experience`).then(r => r.json()),
    fetch(`${base}/api/achievements`).then(r => r.json()),
    fetch(`${base}/api/education`).then(r => r.json()),
  ])
  return { props: { projects, skills, experience, achievements, education } }
}
