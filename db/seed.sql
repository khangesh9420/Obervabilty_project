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
  location TEXT NOT NULL,
  dates TEXT NOT NULL,
  highlights TEXT NOT NULL
);

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL
);

CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  years TEXT NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (title, description, tech) VALUES
('Infrastructure Automation', 'Hybrid cloud deployment with Terraform, Ansible, ArgoCD and Helm', 'Terraform, Ansible, ArgoCD, Helm'),
('Monitoring & Observability', 'Prometheus + Grafana dashboards with alerting', 'Prometheus, Grafana'),
('CI/CD & Migration', 'Migrated Azure DevOps to GitHub Actions integrating SonarQube and Black Duck', 'GitHub Actions, SonarQube, Black Duck');

INSERT INTO skills (name, category) VALUES
('Python', 'Languages'),
('C++', 'Languages'),
('Docker', 'Cloud & DevOps'),
('Kubernetes', 'Cloud & DevOps'),
('Terraform', 'Automation'),
('Ansible', 'Automation'),
('Jenkins', 'CI/CD'),
('GitHub Actions', 'CI/CD'),
('Prometheus', 'Monitoring & Logging'),
('Grafana', 'Monitoring & Logging'),
('AWS', 'Cloud & DevOps'),
('Azure', 'Cloud & DevOps'),
('Git', 'Repo Managers'),
('Scrum', 'Methodology'),
('Linux', 'Others');

INSERT INTO experience (role, company, location, dates, highlights) VALUES
('DevOps Engineer', 'T and S Services GmbH (AGCO, VWIF)', 'Stuttgart, Germany', 'Jun 2022 – Present', 'Designed hybrid-cloud infrastructure with Terraform and Ansible;Implemented GitOps workflows with ArgoCD and Helm'),
('Embedded Software Developer', 'Continental AG', 'Hamburg, Germany', 'Mar 2021 – Sep 2021', 'Developed embedded C++ modules;Automated testing pipelines'),
('Embedded Systems Engineer', 'Minilec India Pvt Ltd', 'Pune, India', 'Dec 2017 – Jan 2019', 'Designed embedded firmware;Led hardware-software integration');

INSERT INTO achievements (description) VALUES
('Reduced deployment time by 40% through pipeline automation'),
('Boosted code quality with SonarQube and Black Duck'),
('Built monitoring dashboards for real-time insights');

INSERT INTO education (degree, institution, years) VALUES
('M.S. in Embedded Systems', 'Hamburg University of Technology', '2019-2021'),
('B.E. in Electronics', 'Savitribai Phule Pune University', '2013-2017');

