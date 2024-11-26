import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { BarChart, Settings, Notifications, Person } from "@mui/icons-material";
import MiniCalendar from "../../Components/MiniCalendar";

const Workspace = () => {
  const [user, setUser] = useState("Alex Johnson");
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    setNotifications([
      "System update scheduled for tonight.",
      "New message from the project manager.",
      "Reminder: Submit your timesheet.",
    ]);

    setTasks([
      { id: 1, title: "Design Homepage", status: "In Progress" },
      { id: 2, title: "Fix API Endpoint Issues", status: "Pending" },
      { id: 3, title: "Test User Authentication", status: "Completed" },
    ]);

    setAnalytics({
      visitors: 1240,
      engagementRate: 67,
      newUsers: 94,
    });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`workspace ${theme}`}>
      {sidebarOpen && <Sidebar />}
      <div className="content flex flex-col gap-6 p-6">
        <Header user={user} toggleSidebar={toggleSidebar} />
        <MainContent
          analytics={analytics}
          tasks={tasks}
          notifications={notifications}
        />
        <Footer />
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <motion.aside
      className="sidebar bg-gray-900 text-white p-4 w-64"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Typography variant="h5" className="font-bold mb-6">
        Workspace Menu
      </Typography>
      <ul className="flex flex-col gap-4">
        <SidebarItem icon={<BarChart />} label="Overview" />
        <SidebarItem icon={<Settings />} label="Settings" />
        <SidebarItem icon={<Notifications />} label="Notifications" />
        <SidebarItem icon={<Person />} label="Profile" />
      </ul>
    </motion.aside>
  );
};

const SidebarItem = ({ icon, label }) => {
  return (
    <motion.li
      className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      {icon}
      <Typography>{label}</Typography>
    </motion.li>
  );
};

const Header = ({ user, toggleSidebar }) => {
  return (
    <motion.header
      className="header flex justify-between items-center p-4 bg-gray-100 shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="bg-gray-300 p-2 rounded-md"
        onClick={toggleSidebar}
      >
        Toggle Sidebar
      </button>
      <Typography variant="h5" className="font-bold">
        Welcome, {user}
      </Typography>
    </motion.header>
  );
};

const MainContent = ({ analytics, tasks, notifications }) => {
  return (
    <motion.main
      className="main-content grid grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnalyticsCard analytics={analytics} />
      <TasksSection tasks={tasks} />
      <NotificationsSection notifications={notifications} />
    </motion.main>
  );
};

const AnalyticsCard = ({ analytics }) => {
  return (
    <motion.div
      className="analytics-card bg-white p-4 rounded-md shadow-md"
      whileHover={{ scale: 1.02 }}
    >
      <Typography variant="h6" className="font-bold mb-4">
        Analytics
      </Typography>
      {analytics ? (
        <ul>
          <li>Visitors: {analytics.visitors}</li>
          <li>Engagement Rate: {analytics.engagementRate}%</li>
          <li>New Users: {analytics.newUsers}</li>
        </ul>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </motion.div>
  );
};

const TasksSection = ({ tasks }) => {
  return (
    <div className="tasks-section bg-white p-4 rounded-md shadow-md">
      <Typography variant="h6" className="font-bold mb-4">
        Tasks
      </Typography>
      <ul>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

const TaskCard = ({ task }) => {
  const statusClass =
    task.status === "Completed"
      ? "text-green-500"
      : task.status === "Pending"
      ? "text-yellow-500"
      : "text-blue-500";

  return (
    <motion.li
      className="flex justify-between mb-2"
      whileHover={{ x: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span>{task.title}</span>
      <span className={`font-medium ${statusClass}`}>{task.status}</span>
    </motion.li>
  );
};

const NotificationsSection = ({ notifications }) => {
  return (
    <div className="notifications-section bg-white p-4 rounded-md shadow-md">
      <Typography variant="h6" className="font-bold mb-4">
        Notifications
      </Typography>
      <ul>
        {notifications.map((notification, index) => (
          <motion.li
            key={index}
            className="mb-2"
            whileHover={{ scale: 1.03 }}
          >
            {notification}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer text-center p-4 bg-gray-100">
      <Typography variant="body2">© 2024 MyWorkspace Inc.</Typography>
    </footer>
  );
};

export default Workspace;
