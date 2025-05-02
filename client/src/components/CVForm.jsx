import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField, Button, Grid, Paper, Typography, LinearProgress, Divider, IconButton, Chip
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Footer from "./Footer";
import Navbar from "./Navbar";

const sectionTitleStyle = { marginTop: 24, marginBottom: 8, color: "#1769aa" };

// --- DUMMY DATA ---
const dummyData = {
  fullName: "Alex Johnson",
  profession: "React Frontend Developer",
  address: "123 Main Street, San Francisco, CA",
  phone: "+1 555-123-4567",
  email: "alex.johnson@example.com",
  linkedin: "https://linkedin.com/in/alexjohnson",
  github: "https://github.com/alexjohnson",
  portfolio: "https://alexjohnson.dev",
  summary: "Results-driven React Developer with 3+ years of experience building scalable web applications. Passionate about UI/UX, performance, and modern JavaScript frameworks. Adept at collaborating with cross-functional teams to deliver high-quality products.",
  education: [
    {
      degree: "B.Sc. in Computer Science",
      institution: "Stanford University",
      year: "2021"
    },
    {
      degree: "High School Diploma",
      institution: "San Francisco High School",
      year: "2017"
    }
  ],
  experience: [
    {
      title: "Frontend Developer",
      company: "TechNova Inc.",
      years: "2022 - Present",
      description: "Developed and maintained core features for a SaaS dashboard using React, Redux, and Material-UI. Improved performance by 30% and mentored junior developers."
    },
    {
      title: "React Intern",
      company: "Webify Solutions",
      years: "2021 - 2022",
      description: "Built reusable UI components and contributed to migration from class to functional components with hooks."
    }
  ],
  skills: [
    { skill: "React.js", percentage: "90" },
    { skill: "JavaScript (ES6+)", percentage: "85" },
    { skill: "Redux Toolkit", percentage: "80" },
    { skill: "HTML/CSS", percentage: "80" },
    { skill: "Material-UI", percentage: "75" },
    { skill: "TypeScript", percentage: "60" }
  ],
  projects: [
    {
      name: "Personal Portfolio",
      description: "A modern, responsive portfolio website built with React and styled-components.",
      link: "https://alexjohnson.dev"
    },
    {
      name: "E-commerce Dashboard",
      description: "Developed an admin dashboard for an e-commerce platform using React, Redux, and Chart.js.",
      link: "https://github.com/alexjohnson/ecommerce-dashboard"
    }
  ],
  certifications: [
    {
      name: "React Developer Certification",
      issuer: "freeCodeCamp",
      year: "2023"
    },
    {
      name: "JavaScript Algorithms and Data Structures",
      issuer: "Coursera",
      year: "2022"
    }
  ],
  languages: [
    { language: "English", level: "Native" },
    { language: "Spanish", level: "Intermediate" }
  ],
  interests: [
    "UI/UX Design",
    "Open Source",
    "Traveling",
    "Photography"
  ]
};
// --- END DUMMY DATA ---

const CVForm = ({ setCvData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(dummyData);
  const [errors, setErrors] = useState({});

  const handleChange = (e, idx, field, section) => {
    if (section) {
      const updated = [...formData[section]];
      updated[idx][field] = e.target.value;
      setFormData({ ...formData, [section]: updated });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleArrayChange = (e, idx, section) => {
    const updated = [...formData[section]];
    updated[idx] = e.target.value;
    setFormData({ ...formData, [section]: updated });
  };

  const addEntry = (section, obj) => {
    setFormData({ ...formData, [section]: [...formData[section], obj] });
  };

  const removeEntry = (idx, section) => {
    const updated = formData[section].filter((_, i) => i !== idx);
    setFormData({ ...formData, [section]: updated });
  };

  const validateForm = () => {
    let newErrors = {};
    ["fullName", "profession", "address", "phone", "email", "summary"].forEach((field) => {
      if (!formData[field]) newErrors[field] = `${field} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCvData(formData);
    navigate("/cv-preview");
  };

  return (

   <>
   <Navbar/>
    <Paper elevation={4} sx={{ p: 4, maxWidth: 900, mx: "auto", my: 4, borderRadius: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1769aa" }}>
        Build Your Modern CV
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Basic Info */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Profession/Title" name="profession" value={formData.profession} onChange={handleChange} error={!!errors.profession} helperText={errors.profession} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="GitHub" name="github" value={formData.github} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Summary" name="summary" value={formData.summary} onChange={handleChange} error={!!errors.summary} helperText={errors.summary} multiline rows={3} />
          </Grid>

          {/* Experience */}
          <Grid item xs={12}><Divider sx={{ my: 2 }} /><Typography variant="h6" sx={sectionTitleStyle}>Experience</Typography></Grid>
          {formData.experience.map((exp, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={3}>
                <TextField label="Job Title" value={exp.title} onChange={e => handleChange(e, idx, "title", "experience")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Company" value={exp.company} onChange={e => handleChange(e, idx, "company", "experience")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField label="Years" value={exp.years} onChange={e => handleChange(e, idx, "years", "experience")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Description" value={exp.description} onChange={e => handleChange(e, idx, "description", "experience")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton color="error" onClick={() => removeEntry(idx, "experience")}><RemoveCircleOutlineIcon /></IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addEntry("experience", { title: "", company: "", years: "", description: "" })}>Add Experience</Button>
          </Grid>

          {/* Education */}
          <Grid item xs={12}><Divider sx={{ my: 2 }} /><Typography variant="h6" sx={sectionTitleStyle}>Education</Typography></Grid>
          {formData.education.map((edu, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={4}>
                <TextField label="Degree" value={edu.degree} onChange={e => handleChange(e, idx, "degree", "education")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Institution" value={edu.institution} onChange={e => handleChange(e, idx, "institution", "education")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Year" value={edu.year} onChange={e => handleChange(e, idx, "year", "education")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton color="error" onClick={() => removeEntry(idx, "education")}><RemoveCircleOutlineIcon /></IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addEntry("education", { degree: "", institution: "", year: "" })}>Add Education</Button>
          </Grid>

          {/* Skills */}
          <Grid item xs={12}><Divider sx={{ my: 2 }} /><Typography variant="h6" sx={sectionTitleStyle}>Skills</Typography></Grid>
          {formData.skills.map((skill, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={5}>
                <TextField label="Skill" value={skill.skill} onChange={e => handleChange(e, idx, "skill", "skills")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField label="Proficiency (%)" type="number" value={skill.percentage} onChange={e => handleChange(e, idx, "percentage", "skills")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton color="error" onClick={() => removeEntry(idx, "skills")}><RemoveCircleOutlineIcon /></IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addEntry("skills", { skill: "", percentage: "" })}>Add Skill</Button>
          </Grid>

          {/* Projects */}
          <Grid item xs={12}><Divider sx={{ my: 2 }} /><Typography variant="h6" sx={sectionTitleStyle}>Projects</Typography></Grid>
          {formData.projects.map((proj, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={4}>
                <TextField label="Project Name" value={proj.name} onChange={e => handleChange(e, idx, "name", "projects")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField label="Description" value={proj.description} onChange={e => handleChange(e, idx, "description", "projects")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField label="Link" value={proj.link} onChange={e => handleChange(e, idx, "link", "projects")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton color="error" onClick={() => removeEntry(idx, "projects")}><RemoveCircleOutlineIcon /></IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addEntry("projects", { name: "", description: "", link: "" })}>Add Project</Button>
          </Grid>

          {/* Certifications */}
          <Grid item xs={12}><Divider sx={{ my: 2 }} /><Typography variant="h6" sx={sectionTitleStyle}>Certifications</Typography></Grid>
          {formData.certifications.map((cert, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={5}>
                <TextField label="Certification Name" value={cert.name} onChange={e => handleChange(e, idx, "name", "certifications")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField label="Issuer" value={cert.issuer} onChange={e => handleChange(e, idx, "issuer", "certifications")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField label="Year" value={cert.year} onChange={e => handleChange(e, idx, "year", "certifications")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton color="error" onClick={() => removeEntry(idx, "certifications")}><RemoveCircleOutlineIcon /></IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addEntry("certifications", { name: "", issuer: "", year: "" })}>Add Certification</Button>
          </Grid>

          {/* Languages */}
          <Grid item xs={12}><Divider sx={{ my: 2 }} /><Typography variant="h6" sx={sectionTitleStyle}>Languages</Typography></Grid>
          {formData.languages.map((lang, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={5}>
                <TextField label="Language" value={lang.language} onChange={e => handleChange(e, idx, "language", "languages")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField label="Proficiency (e.g., Fluent, Intermediate)" value={lang.level} onChange={e => handleChange(e, idx, "level", "languages")} fullWidth />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton color="error" onClick={() => removeEntry(idx, "languages")}><RemoveCircleOutlineIcon /></IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addEntry("languages", { language: "", level: "" })}>Add Language</Button>
          </Grid>

          {/* Interests */}
          <Grid item xs={12}><Divider sx={{ my: 2 }} /><Typography variant="h6" sx={sectionTitleStyle}>Interests</Typography></Grid>
          {formData.interests.map((interest, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <TextField label="Interest" value={interest} onChange={e => handleArrayChange(e, idx, "interests")} fullWidth />
              <IconButton color="error" onClick={() => removeEntry(idx, "interests")}><RemoveCircleOutlineIcon /></IconButton>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addEntry("interests", "")}>Add Interest</Button>
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, px: 4, fontWeight: "bold" }}>
              Create CV
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
<Footer/>
    </>
  );
};

export default CVForm;
