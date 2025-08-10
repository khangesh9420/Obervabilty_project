CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT NOT NULL
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE experience (
  id SERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  years TEXT NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (title, description, tech) VALUES
('Infrastructure Automation', 'Automated infrastructure with Terraform and Ansible', 'Terraform, Ansible, AWS'),
('Monitoring & Observability', 'Implemented monitoring stack with Prometheus and Grafana', 'Prometheus, Grafana, Kubernetes'),
('CI/CD Migration', 'Migrated pipelines to GitHub Actions for faster delivery', 'GitHub Actions, Docker, Kubernetes');

INSERT INTO skills (name, category) VALUES
('Docker', 'Containerization'),
('Kubernetes', 'Containerization'),
('Terraform', 'Automation'),
('Jenkins', 'CI/CD'),
('GitHub Actions', 'CI/CD'),
('Prometheus', 'Monitoring'),
('Grafana', 'Monitoring'),
('Python', 'Languages');

INSERT INTO experience (role, company, years) VALUES
('DevOps Engineer', 'TechCorp', '2019-2021'),
('Senior DevOps Engineer', 'CloudOps', '2021-Present');
