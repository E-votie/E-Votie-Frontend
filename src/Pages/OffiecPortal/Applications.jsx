import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Divider, Typography } from "@mui/material";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CountingEffect from "../../Components/CountingEffect.jsx";
import PercentageCountingEffect from "../../Components/PercentageCountingEffect.jsx";
import MiniCalendar from "../../Components/MiniCalendar.jsx";

// Mock Data for Dashboard Stats
const ElectionDutyApplications = [
  {
    id: 1,
    title: "Total Projects",
    value: 40,
    icon: <EmojiPeopleIcon style={{ fontSize: 40, color: "#4caf50" }} />,
    percentage: 8.5,
    isPositive: true,
  },
  {
    id: 2,
    title: "Pending Tasks",
    value: 15,
    icon: <EmojiPeopleIcon style={{ fontSize: 40, color: "#f57c00" }} />,
    percentage: -3.2,
    isPositive: false,
  },
  {
    id: 3,
    title: "Completed Tasks",
    value: 25,
    icon: <EmojiPeopleIcon style={{ fontSize: 40, color: "#2196f3" }} />,
    percentage: 10.1,
    isPositive: true,
  },
];

// Mock Data for Notifications
const notifications = [
  { id: 1, message: "Project A is nearing the deadline." },
  { id: 2, message: "Team meeting scheduled for tomorrow." },
  { id: 3, message: "Update your progress report by 5 PM." },
  { id: 4, message: "Client feedback session postponed." },
  { id: 5, message: "New project requirements shared via email." },
];

// Mock Data for Tasks
const tasks = [
  { id: 1, task: "Complete the UI for Dashboard", status: "In Progress" },
  { id: 2, task: "Fix API integration issues", status: "Pending" },
  { id: 3, task: "Update the Documentation", status: "Completed" },
  { id: 4, task: "Deploy the latest build to staging", status: "In Progress" },
  { id: 5, task: "Prepare presentation for stakeholders", status: "Pending" },
];

// Mock Data for Activity Feed
const activities = [
  { id: 1, activity: "Logged in", time: "10 minutes ago" },
  { id: 2, activity: "Updated project milestones", time: "30 minutes ago" },
  { id: 3, activity: "Commented on task: API issues", time: "1 hour ago" },
  { id: 4, activity: "Logged out", time: "2 hours ago" },
];

// Helper Function to Format Dates
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

// Main Dashboard Component
const Applications = () => {
  const [userName, setUserName] = useState("John Doe");
  const [stats, setStats] = useState(statsData);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({ theme: "Light", notifications: true });

  // Simulating API call on component mount
  useEffect(() => {
    setLoading(true);
    const fetchStats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      setLoading(false);
    };
    fetchStats();
  }, []);

  const toggleTheme = () => {
    setSettings((prev) => ({ ...prev, theme: prev.theme === "Light" ? "Dark" : "Light" }));
  };

  return (
    <div className={`flex flex-col p-6 gap-8 bg-${settings.theme === "Light" ? "gray-50" : "gray-800"}`}>
      {/* Header */}
      <Header userName={userName} />

      <Divider />

      {/* Stats Section */}
      <StatsSection stats={stats} loading={loading} />

      <Divider />

      {/* Main Content Area */}
      <div className="flex flex-row justify-between gap-4">
        {/* Notifications Section */}
        <NotificationsSection notifications={notifications} />

        {/* Activity Feed */}
        <ActivityFeed activities={activities} />
      </div>

      <Divider />

      {/* Task Section */}
      <TasksSection tasks={tasks} />

      <Divider />

      {/* Settings Panel */}
      <SettingsPanel settings={settings} toggleTheme={toggleTheme} />

      <Divider />

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Header Component
const Header = ({ userName }) => {
  return (
    <header className="flex flex-row justify-between items-center">
      <motion.h1
        className="text-3xl font-bold text-gray-800"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome, {userName}
      </motion.h1>
      <motion.h2
        className="text-xl text-gray-600"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard Overview
      </motion.h2>
    </header>
  );
};

// Stats Section Component
const StatsSection = ({ stats, loading }) => {
  return (
    <section className="flex flex-row flex-wrap gap-6 justify-between">
      {loading ? (
        <Typography variant="h6">Loading stats...</Typography>
      ) : (
        stats.map((stat) => <StatCard key={stat.id} stat={stat} />)
      )}
    </section>
  );
};

// Individual Stat Card Component
const StatCard = ({ stat }) => {
  const { title, value, icon, percentage, isPositive } = stat;

  return (
    <motion.div
      className="w-[300px] bg-white p-6 rounded-lg shadow-md flex flex-col justify-between items-start gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row gap-3 items-center">
        {icon}
        <Typography variant="h6" className="font-bold">
          {title}
        </Typography>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <CountingEffect value={value} duration={1000} />
        <div className="flex flex-row items-center gap-2">
          <PercentageCountingEffect value={percentage} duration={500} />
          <ArrowCircleUpIcon
            className={isPositive ? "text-green-500" : "text-red-500"}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Notifications Section Component
const NotificationsSection = ({ notifications }) => {
  return (
    <div className="w-3/4">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      <ul className="list-disc pl-6">
        {notifications.map((notification) => (
          <motion.li
            key={notification.id}
            className="text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {notification.message}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

// Tasks Section Component
const TasksSection = ({ tasks }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

// Individual Task Card Component
const TaskCard = ({ task }) => {
  return (
    <li className="mb-2">
      <Typography className="text-gray-700 font-medium">
        {task.task} -{" "}
        <span
          className={`${
            task.status === "Completed"
              ? "text-green-500"
              : task.status === "Pending"
              ? "text-orange-500"
              : "text-blue-500"
          }`}
        >
          {task.status}
        </span>
      </Typography>
    </li>
  );
};

// Activity Feed Component
const ActivityFeed = ({ activities }) => {
  return (
    <div className="w-1/4">
      <h3 className="text-lg font-semibold mb-4">Activity Feed</h3>
      <ul className="list-disc pl-6">
        {activities.map((activity) => (
          <motion.li
            key={activity.id}
            className="text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activity.activity} - {activity.time}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

// Settings Panel Component
const SettingsPanel = ({ settings, toggleTheme }) => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Settings</h3>
      <div className="flex flex-row justify-between items-center">
        <span>Theme: {settings.theme}</span>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="text-center text-gray-600 mt-4">
      <Typography variant="body2">© 2024 Dashboard Inc. All Rights Reserved.</Typography>
    </footer>
  );
};

export default Applications;