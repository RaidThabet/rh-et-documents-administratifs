import { useEffect, useState } from 'react';
import { Card } from '@heroui/card';
import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';
import { UserRoleStats, UserTaskStats, getAllStats } from '../actions/statsActions';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {Navigate} from "react-router";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Define color palette for charts
const chartColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)'
];

function StatsReportsPage() {
  const [usersByRole, setUsersByRole] = useState<UserRoleStats[]>([]);
  const [absenteeismRate, setAbsenteeismRate] = useState<string>('');
  const [tasksByUser, setTasksByUser] = useState<UserTaskStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks'>('overview');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAllStats();
        
        // Set data with fallbacks for each property
        setUsersByRole(Array.isArray(data.usersByRole) ? data.usersByRole : []);
        
        // Handle potentially missing absenteeism rate
        const rate = data.absenteeismRate && data.absenteeismRate.absenteeismRate 
          ? data.absenteeismRate.absenteeismRate 
          : "0%";
        setAbsenteeismRate(rate);
        
        // Debug log the task data
        console.log('Tasks by user data in component:', data.tasksStatusPerUser);
        
        // Set task data with fallback
        setTasksByUser(Array.isArray(data.tasksStatusPerUser) ? data.tasksStatusPerUser : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Failed to load statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const userRole = localStorage.getItem("userRole") as string;

  if (["agent", "professor"].includes(userRole)) {
    return <Navigate to={"/accueil"} />
  }

  const formatRoleName = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert color="danger" className="my-4">
          {error}
          <Button onClick={() => window.location.reload()} className="ml-4">Retry</Button>
        </Alert>
      </div>
    );
  }

  // Prepare data for pie chart - Users by Role
  const userRoleChartData = {
    labels: usersByRole.map(item => formatRoleName(item._id)),
    datasets: [
      {
        data: usersByRole.map(item => item.count),
        backgroundColor: chartColors,
        borderColor: chartColors.map(color => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };

  // Prepare task status summary data
  const taskSummaryData = (() => {
    // Collect all unique statuses
    const allStatuses = new Set<string>();
    tasksByUser.forEach(user => {
      user.tasks.forEach(task => {
        allStatuses.add(task.status);
      });
    });
    
    // For each status, sum the counts across all users
    const statusCounts: Record<string, number> = {};
    allStatuses.forEach(status => {
      statusCounts[status] = 0;
    });

    tasksByUser.forEach(user => {
      user.tasks.forEach(task => {
        statusCounts[task.status] += parseInt(task.count);
      });
    });

    return {
      labels: Object.keys(statusCounts).map(formatRoleName),
      datasets: [
        {
          label: 'Number of Tasks',
          data: Object.values(statusCounts),
          backgroundColor: chartColors,
          borderColor: chartColors.map(color => color.replace('0.8', '1')),
          borderWidth: 1,
        }
      ]
    };
  })();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Statistics Dashboard</h1>
      
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Button>
        <Button 
          onClick={() => setActiveTab('tasks')}
        >
          Tasks by User
        </Button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Users by Role with Pie Chart */}
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Distribution by Role</h2>
            <div className="h-64">
              <Pie data={userRoleChartData} options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                }
              }} />
            </div>
          </Card>
          
          {/* Absenteeism Rate */}
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Absenteeism Rate</h2>
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-5xl font-bold text-blue-600">{absenteeismRate}</div>
              <p className="mt-4 text-gray-600">Annual absenteeism rate among agents</p>
            </div>
          </Card>

          {/* Task Status Summary */}
          <Card className="p-6 shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Task Status Summary</h2>
            <div className="h-64">
              <Bar 
                data={taskSummaryData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  plugins: {
                    legend: {
                      display: false
                    },
                    title: {
                      display: true,
                      text: 'Total Tasks by Status'
                    }
                  }
                }} 
              />
            </div>
          </Card>
        </div>
      )}
      
      {activeTab === 'tasks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tasksByUser.map((user) => {
            // Handle potentially undefined or corrupted user data
            if (!user || !user._id) {
              return null; // Skip rendering this item
            }
            
            // Convert 'Unknown User' to a more user-friendly display
            const displayName = user.userName === "Unknown User" 
              ? `User ${String(user._id).substring(0, 6)}` 
              : user.userName;
            
            // Handle potentially missing tasks array
            const tasks = Array.isArray(user.tasks) ? user.tasks : [];
            
            return (
              <Card key={user._id} className="p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">{displayName}'s Tasks</h2>
                <div className="h-64 mb-4">
                  <Pie 
                    data={{
                      labels: tasks.map(task => formatRoleName(task.status || "unknown")),
                      datasets: [{
                        data: tasks.map(task => parseInt(task.count || "0")),
                        backgroundColor: chartColors.slice(0, tasks.length),
                        borderWidth: 1
                      }]
                    }}
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      }
                    }
                  }} 
                />
              </div>
              <div className="mt-4 space-y-2">
                {tasks.length > 0 ? (
                  tasks.map((task, idx) => (
                    <div 
                      key={idx}
                      className="flex justify-between items-center px-3 py-2 rounded-md"
                      style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                    >
                      <span className="font-medium text-white">{formatRoleName(task.status || "unknown")}</span>
                      <span className="font-bold text-white">{task.count || "0"}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-2">No task data available</div>
                )}
              </div>
            </Card>
                            )})}
        </div>
      )}
    </div>
  );
}

export default StatsReportsPage;