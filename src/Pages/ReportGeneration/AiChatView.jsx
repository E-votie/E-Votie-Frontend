import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";

export const AiChatView = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/chat", {
        message: question,
      });
      setResponse(data);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { answer, resource } = response;

    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 3,
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {resource?.type === "image" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body1" sx={{ flex: 1 }}>
              {answer}
            </Typography>
            <Box
              component="img"
              src={resource.url}
              alt={resource.caption}
              sx={{
                width: { xs: "100%", md: "40%" },
                borderRadius: 2,
              }}
            />
          </Box>
        ) : resource?.type === "bar-graph" ? (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {answer}
            </Typography>
            <Bar
              data={{
                labels: resource.bars.map((bar) => bar.bar_name),
                datasets: [
                  {
                    label: resource.y_label,
                    data: resource.bars.map((bar) => bar.heigth),
                    backgroundColor: resource.bars.map((bar) => bar.color),
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: resource.title,
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: resource.x_label },
                    grid: { display: false },
                  },
                  y: {
                    title: { display: true, text: resource.y_label },
                  },
                },
              }}
            />
          </>
        ) : resource?.type === "line-graph" ? (
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              p: 3,
              mt: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              {answer}
            </Typography>
            <Line
              data={{
                labels: resource.x_values,
                datasets: resource.lines.map((line) => ({
                  label: line.line_name,
                  data: line.values,
                  borderColor: line.color,
                  backgroundColor: line.color,
                  tension: 0.4,
                  fill: true,
                })),
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                  title: {
                    display: true,
                    text: resource.title,
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: resource.x_label },
                    grid: { display: false },
                  },
                  y: {
                    title: { display: true, text: resource.y_label },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        ) : resource?.type === "doughnut-chart" ? (
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              p: 3,
              mt: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
              {answer}
            </Typography>
            <Doughnut
              data={{
                labels: resource.labels,
                datasets: [
                  {
                    data: resource.values,
                    backgroundColor: resource.colors,
                    borderColor: "#ffffff",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: "bottom" },
                  title: {
                    display: true,
                    text: "Doughnut Chart Representation",
                  },
                },
              }}
            />
          </Box>
        ): (
          // Text only
          <Typography variant="body1">{answer}</Typography>
        )}
        {resource?.type === "image" && (
          <Typography
            variant="caption"
            sx={{ textAlign: "center", display: "block", mt: 1 }}
          >
            {resource.caption}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 3,
        py: 5,
        bgcolor: "#f9fafb",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: "#ec4899",
          }}
        >
          Ask Anything...
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ec4899" },
                "&:hover fieldset": { borderColor: "#ec4899" },
                "&.Mui-focused fieldset": { borderColor: "#ec4899" },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#ec4899", "&:hover": { bgcolor: "#e11d48" } }}
            onClick={handleSubmit}
            disabled={!question.trim() || loading}
          >
            Search
          </Button>
        </Box>
        <Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <CircularProgress size={60} sx={{ color: "#ec4899" }} />
            </Box>
          ) : (
            renderResponse()
          )}
        </Box>
      </Box>
    </Box>
  );
};
