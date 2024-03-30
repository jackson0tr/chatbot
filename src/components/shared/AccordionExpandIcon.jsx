import React, { useState, useEffect, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { SectionContext } from "../context/SectionContextProvider.jsx";
import { Box, Button, Link } from "@mui/material";
import InputCom from "./InputCom.jsx";
import { useFormik } from "formik";
import axios from "axios";

export default function AccordionExpandIcon({ submissions }) {
  const { getSectionNum } = useContext(SectionContext);
  const [sections, setSections] = useState([]);
  const initialValues = {
    feedback: "",
    taskIds: [], 
  };

  const onSubmit = async (values) => {
    try {
      for (let i = 0; i < values.feedback.length; i++) {
        const feed = {
          feedback: values.feedback[i],
          taskId: values.taskIds[i], 
        };

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/supervisor/feedback`,
          feed
        );
        console.log(data);
        if (data.message === "success") {
          showSnackbar({
            message: "task submitted successfully",
            severity: "success",
          });
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const inputs = [
    {
      id: "feedback",
      type: "text",
      name: "feedback",
      title: "Feedback",
      value: formik.values.feedback,
    },
  ];
  const renderInputs = inputs.map((input, index) => (
    <InputCom
      key={index}
      type={input.type}
      name={input.name}
      id={input.id}
      title={input.title}
      value={input.value[index]} // Use index to access corresponding feedback value
      placeholder={input.title}
      onChange={(e) => {
        formik.setFieldValue(`feedback[${index}]`, e.target.value);
      }}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));

  useEffect(() => {
    const fetchSections = async () => {
      const sectionsData = await Promise.all(
        submissions.map((submission) => getSectionNum(submission.section))
      );
      setSections(sectionsData);
      formik.setFieldValue(
        "taskIds",
        submissions.map((submission) => submission.taskId)
      );
    };

    fetchSections();
  }, [submissions, getSectionNum]);

  return (
    <div>
      {submissions.map((submission, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography>Section: {sections[index]}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Task : {submission.taskId.txt}</Typography>
            <Box>
              {submission.file && <Link href={submission.file}>File</Link>}
            </Box>
            <Box>
              {submission.txt && <Typography>{submission.txt}</Typography>}
            </Box>
            <Box>
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                {renderInputs}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(43, 1, 62, 0.5)",
                    "&:hover": {
                      backgroundColor: "rgba(43, 1, 62, 0.8)",
                    },
                    width: "100%",
                    mt: 1,
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
