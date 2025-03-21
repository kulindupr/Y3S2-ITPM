import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Paper, Typography, LinearProgress } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

const CVForm = ({ setCvData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    linkedin: "",
    summary: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ title: "", company: "", years: "" }],
    skills: [{ skill: "", percentage: "" }],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, index, field, section) => {
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[index][field] = e.target.value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addEntry = (section) => {
    const newEntry =
      section === "experience" ? { title: "", company: "", years: "" } :
      section === "education" ? { degree: "", institution: "", year: "" } :
      { skill: "", percentage: "" };

    setFormData({ ...formData, [section]: [...formData[section], newEntry] });
  };

  const removeEntry = (index, section) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const validateForm = () => {
    let newErrors = {};
    ["fullName", "address", "phone", "email", "summary"].forEach((field) => {
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
    <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h5">Fill Your CV Details</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {["fullName", "address", "phone", "email", "linkedin", "summary"].map((key) => (
            <Grid item xs={12} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                error={!!errors[key]}
                helperText={errors[key] || ""}
                multiline={key === "summary"}
                rows={key === "summary" ? 3 : 1}
              />
            </Grid>
          ))}

          {/* Experience Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Experience</Typography>
            {formData.experience.map((exp, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <TextField fullWidth label="Job Title" value={exp.title} onChange={(e) => handleChange(e, index, "title", "experience")} />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Company" value={exp.company} onChange={(e) => handleChange(e, index, "company", "experience")} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Years" value={exp.years} onChange={(e) => handleChange(e, index, "years", "experience")} />
                </Grid>
                <Grid item xs={1}>
                  <Button color="error" onClick={() => removeEntry(index, "experience")}>X</Button>
                </Grid>
              </Grid>
            ))}
            <Button onClick={() => addEntry("experience")}>Add Experience</Button>
          </Grid>

          {/* Education Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Education</Typography>
            {formData.education.map((edu, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <TextField fullWidth label="Degree" value={edu.degree} onChange={(e) => handleChange(e, index, "degree", "education")} />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Institution" value={edu.institution} onChange={(e) => handleChange(e, index, "institution", "education")} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Year" value={edu.year} onChange={(e) => handleChange(e, index, "year", "education")} />
                </Grid>
                <Grid item xs={1}>
                  <Button color="error" onClick={() => removeEntry(index, "education")}>X</Button>
                </Grid>
              </Grid>
            ))}
            <Button onClick={() => addEntry("education")}>Add Education</Button>
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Skills</Typography>
            {formData.skills.map((skill, index) => (
              <Grid container spacing={2} alignItems="center" key={index}>
                <Grid item xs={4}>
                  <TextField fullWidth label="Skill" value={skill.skill} onChange={(e) => handleChange(e, index, "skill", "skills")} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Percentage" type="number" value={skill.percentage} onChange={(e) => handleChange(e, index, "percentage", "skills")} />
                </Grid>
                <Grid item xs={4}>
                  <LinearProgress variant="determinate" value={skill.percentage} />
                </Grid>
                <Grid item xs={1}>
                  <Button color="error" onClick={() => removeEntry(index, "skills")}>X</Button>
                </Grid>
              </Grid>
            ))}
            <Button onClick={() => addEntry("skills")}>Add Skill</Button>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
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
