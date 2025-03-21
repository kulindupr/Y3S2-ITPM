import React from "react";
import { Paper, Typography, Divider, Button, LinearProgress, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CVPreview = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return <Typography variant="h6" align="center">No CV data available. Please fill out the form.</Typography>;
  }

  return (

    
    <Paper
      elevation={5}
      style={{
        padding: 30,
        maxWidth: 900,
        margin: "auto",
        borderRadius: 10,
        backgroundColor: "#f5faff", // Light blue background
        color: "#003366", // Dark blue text
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" mb={2} style={{ backgroundColor: "#003366", padding: 20, borderRadius: "10px 10px 0 0", color: "white" }}>
        <Typography variant="h4" gutterBottom>{data.fullName}</Typography>
        <Typography variant="subtitle1">{data.email} | {data.phone} | {data.address}</Typography>
        {data.linkedin && (
          <Typography variant="subtitle1">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
              {data.linkedin}
            </a>
          </Typography>
        )}
      </Box>

      {/* Summary Section */}
      <Typography variant="h5" color="#003366" gutterBottom>Personal Profile</Typography>
      <Typography>{data.summary}</Typography>
      <Divider style={{ margin: "10px 0", backgroundColor: "#003366" }} />

      {/* Education Section */}
      <Typography variant="h5" color="#003366" gutterBottom>Education</Typography>
      {data.education.length > 0 ? (
        data.education.map((edu, index) => (
          <Box key={index} mb={2}>
            <Typography variant="body1">
              <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
            </Typography>
          </Box>
        ))
      ) : (
        <Typography>No education added</Typography>
      )}
      <Divider style={{ margin: "10px 0", backgroundColor: "#003366" }} />

      {/* Experience Section */}
      <Typography variant="h5" color="#003366" gutterBottom>Experience</Typography>
      {data.experience.length > 0 ? (
        data.experience.map((exp, index) => (
          <Box key={index} mb={2}>
            <Typography variant="body1">
              <strong>{exp.title}</strong> at {exp.company} ({exp.years} years)
            </Typography>
          </Box>
        ))
      ) : (
        <Typography>No experience added</Typography>
      )}
      <Divider style={{ margin: "10px 0", backgroundColor: "#003366" }} />

      {/* Skills Section with Progress Bars */}
      <Typography variant="h5" color="#003366" gutterBottom>Skills</Typography>
      {data.skills.length > 0 ? (
        data.skills.map((skill, index) => (
          <Grid container spacing={2} alignItems="center" key={index} style={{ marginBottom: 10 }}>
            <Grid item xs={4}>
              <Typography>{skill.skill}</Typography>
            </Grid>
            <Grid item xs={6}>
              <LinearProgress
                variant="determinate"
                value={parseInt(skill.percentage, 10)}
                style={{ height: 10, borderRadius: 5, backgroundColor: "#99c2ff" }} // Blue progress bar
              />
            </Grid>
            <Grid item xs={2}>
              <Typography>{skill.percentage}%</Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography>No skills added</Typography>
      )}
      <Divider style={{ margin: "10px 0", backgroundColor: "#003366" }} />

      {/* Edit Button */}
      <Box textAlign="center" mt={3}>
        <Button
          variant="contained"
          onClick={() => navigate("/cv-form")}
          style={{ backgroundColor: "#003366", color: "white", padding: "10px 20px", borderRadius: 8 }}
        >
          Edit CV
        </Button>
      </Box>
    </Paper>
  );
};

export default CVPreview;
