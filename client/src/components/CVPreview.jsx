import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper, Typography, Box, Divider, Grid, Chip, LinearProgress, Link, Avatar, Fade, Button, Menu, MenuItem
} from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LanguageIcon from '@mui/icons-material/Language';
import InterestsIcon from '@mui/icons-material/Interests';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from "./Navbar";
import Footer from "./Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const accent = "#1769aa";
const accentGradient = "linear-gradient(90deg, #1769aa 0%, #00bcd4 100%)";
const lightAccent = "#e3f2fd";

const sectionTitle = (icon, text) => (
  <Box display="flex" alignItems="center" mt={3} mb={1}>
    {icon}
    <Typography variant="h6" sx={{
      color: accent, ml: 1,
      letterSpacing: 1.5,
      fontWeight: 700,
      textTransform: "uppercase"
    }}>{text}</Typography>
    <Divider sx={{ flex: 1, ml: 2, borderColor: accent, opacity: 0.3 }} />
  </Box>
);

const CVPreview = ({ data }) => {
  const navigate = useNavigate();
  const printRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDownloadPdf = async () => {
    // Hide elements not needed in PDF
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Restore hidden elements
    if (navbar) navbar.style.display = 'block';
    if (footer) footer.style.display = 'block';

    const fileName = data.fullName 
      ? `${data.fullName.replace(/\s+/g, "_")}_CV.pdf`
      : "cv.pdf";
    pdf.save(fileName);
  };



  const handleEditCV = () => {
    navigate(-1); // Go back to previous page (CV form)
  };

  if (!data) {
    return <Typography variant="h6" align="center">No CV data available. Please fill out the form.</Typography>;
  }

  return (
    <>
      <Navbar className="navbar" />
      
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 3 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEditCV}
          sx={{
            backgroundColor: "#e3f2fd",
            color: "#1769aa",
            '&:hover': { backgroundColor: "#bbdefb" }
          }}
        >
          Edit CV
        </Button>

        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleMenuClick}
          sx={{
            background: accentGradient,
            color: "#ffffff",
            '&:hover': { opacity: 0.9 }
          }}
        >
          Download CV
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDownloadPdf}>PDF Format</MenuItem>
          
        </Menu>
      </Box>

      {/* CV Content */}
      <div ref={printRef}>
        <Fade in timeout={900}>
          <Box sx={{
            minHeight: "100vh",
            background: "radial-gradient(circle at 60% 15%, #e3f2fd 0%, #f8fafc 100%)",
            py: 6,
            px: 1
          }}>
            <Paper elevation={8} sx={{
              p: 0, maxWidth: 1100, mx: "auto", borderRadius: 5,
              overflow: "hidden",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 8px 32px 0 rgba(23,105,170,0.12)"
            }}>
              {/* Header Section */}
              <Box sx={{
                background: accentGradient,
                color: "white",
                p: { xs: 3, md: 5 },
                textAlign: "center",
                position: "relative"
              }}>
                <Avatar
                  src={data.avatarUrl}
                  alt={data.fullName}
                  sx={{
                    width: 110, height: 110, mx: "auto", mb: 2,
                    border: "4px solid #fff",
                    boxShadow: "0 4px 16px rgba(23,105,170,0.2)",
                    background: "#fff",
                    color: accent,
                    fontSize: 48
                  }}
                />
                <Typography variant="h3" fontWeight="bold" letterSpacing={2}>
                  {data.fullName}
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, opacity: 0.9 }}>
                  {data.profession}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.8 }}>
                  {data.email} | {data.phone} | {data.address}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {data.linkedin && <Link href={data.linkedin} target="_blank" rel="noopener" color="inherit" underline="hover" sx={{ mx: 1 }}>LinkedIn</Link>}
                  {data.github && <Link href={data.github} target="_blank" rel="noopener" color="inherit" underline="hover" sx={{ mx: 1 }}>GitHub</Link>}
                  {data.portfolio && <Link href={data.portfolio} target="_blank" rel="noopener" color="inherit" underline="hover" sx={{ mx: 1 }}>Portfolio</Link>}
                </Box>
              </Box>

              {/* Main Content */}
              <Grid container spacing={0}>
                {/* Left Column */}
                <Grid item xs={12} md={4} sx={{
                  background: "linear-gradient(180deg, #e3f2fd 80%, #fff 100%)",
                  p: { xs: 3, md: 4 },
                  minHeight: "100%",
                  borderRight: { md: `2px solid ${lightAccent}` }
                }}>
                  {/* Profile */}
                  <Box mb={3}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: accent, mb: 1, letterSpacing: 1 }}>Profile</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.85 }}>{data.summary}</Typography>
                  </Box>
                  
                  {/* Skills */}
                  {sectionTitle(<CodeIcon sx={{ color: accent }} />, "Skills")}
                  {data.skills?.map((skill, idx) => (
                    <Box key={idx} sx={{ mb: 1 }}>
                      <Typography variant="body2" fontWeight="bold">{skill.skill}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={parseInt(skill.percentage, 10)}
                        sx={{
                          height: 10, borderRadius: 5, background: "#bbdefb",
                          "& .MuiLinearProgress-bar": { background: accentGradient }
                        }}
                      />
                    </Box>
                  ))}

                  {/* Languages */}
                  {sectionTitle(<LanguageIcon sx={{ color: accent }} />, "Languages")}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {data.languages?.map((lang, idx) => (
                      <Chip key={idx} label={`${lang.language} (${lang.level})`} sx={{
                        background: accentGradient, color: "white", fontWeight: 600, letterSpacing: 1
                      }} />
                    ))}
                  </Box>

                  {/* Interests */}
                  {sectionTitle(<InterestsIcon sx={{ color: accent }} />, "Interests")}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {data.interests?.map((interest, idx) => (
                      <Chip key={idx} label={interest} sx={{
                        background: "#fff", color: accent, border: `1px solid ${accent}`,
                        fontWeight: 600, letterSpacing: 1
                      }} />
                    ))}
                  </Box>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={8} sx={{ p: { xs: 3, md: 5 } }}>
                  {/* Experience */}
                  {sectionTitle(<WorkIcon sx={{ color: accent }} />, "Experience")}
                  {data.experience?.map((exp, idx) => (
                    <Box key={idx} mb={3} sx={{
                      background: "#f4fafd",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: "0 2px 8px rgba(23,105,170,0.07)"
                    }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {exp.title} <span style={{ color: accent }}>@ {exp.company}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">{exp.years}</Typography>
                      <Typography variant="body2" sx={{ mb: 1, mt: 1, opacity: 0.9 }}>{exp.description}</Typography>
                    </Box>
                  ))}

                  {/* Education */}
                  {sectionTitle(<SchoolIcon sx={{ color: accent }} />, "Education")}
                  {data.education?.map((edu, idx) => (
                    <Box key={idx} mb={2} sx={{
                      background: "#f8fafc",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: "0 1px 4px rgba(23,105,170,0.05)"
                    }}>
                      <Typography variant="subtitle1" fontWeight="bold">{edu.degree}</Typography>
                      <Typography variant="body2" color="text.secondary">{edu.institution} ({edu.year})</Typography>
                    </Box>
                  ))}

                  {/* Projects */}
                  {sectionTitle(<CodeIcon sx={{ color: accent }} />, "Projects")}
                  {data.projects?.map((proj, idx) => (
                    <Box key={idx} mb={2} sx={{
                      background: "#f4fafd",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: "0 1px 4px rgba(23,105,170,0.05)"
                    }}>
                      <Typography variant="subtitle1" fontWeight="bold">{proj.name}</Typography>
                      <Typography variant="body2">{proj.description}</Typography>
                      {proj.link && <Link href={proj.link} target="_blank" rel="noopener" sx={{ color: accent, fontWeight: 600 }}>View Project</Link>}
                    </Box>
                  ))}

                  {/* Certifications */}
                  {sectionTitle(<EmojiEventsIcon sx={{ color: accent }} />, "Certifications")}
                  {data.certifications?.map((cert, idx) => (
                    <Box key={idx} mb={2} sx={{
                      background: "#f8fafc",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: "0 1px 4px rgba(23,105,170,0.05)"
                    }}>
                      <Typography variant="subtitle1" fontWeight="bold">{cert.name}</Typography>
                      <Typography variant="body2">{cert.issuer} ({cert.year})</Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Fade>
      </div>

      <Footer className="footer" />
    </>
  );
};

export default CVPreview;
