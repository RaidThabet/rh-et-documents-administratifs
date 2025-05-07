import axios from 'axios';

// Define types for stats data
export interface UserRoleStats {
  _id: string;
  count: number;
}

export interface TaskStatus {
  status: string;
  count: string;
}

export interface UserTaskStats {
  _id: string;
  userName: string;
  tasks: TaskStatus[];
}

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface AbsenteeismRate {
  absenteeismRate: string;
}

// API URL from environment variable
const API_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Fetch all users to get username mappings
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/user`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Fetch users grouped by role statistics
 */
export const getUsersByRoleStats = async (): Promise<UserRoleStats[]> => {
  try {
    const response = await axios.get<UserRoleStats[]>(`${API_URL}/stats/users-by-role`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users by role stats:', error);
    throw error;
  }
};

/**
 * Fetch absenteeism rate statistics
 */
export const getAbsenteeismRate = async (): Promise<AbsenteeismRate> => {
  try {
    const response = await axios.get<AbsenteeismRate>(`${API_URL}/stats/absenteeism-rate`);
    return response.data;
  } catch (error) {
    console.error('Error fetching absenteeism rate:', error);
    throw error;
  }
};

/**
 * Fetch tasks status per user statistics
 */
export const getTasksStatusPerUser = async (): Promise<UserTaskStats[]> => {
  try {
    const response = await axios.get<any[]>(`${API_URL}/stats/tasks-status-per-user`);
    console.log('Raw task status data:', response.data);
    
    let userMap = new Map();
    
    // Try to get users for username lookup, but continue if it fails
    try {
      const users = await getAllUsers();
      console.log('Users for lookup:', users);
      
      // Create a map of user IDs to usernames for quick lookup
      users.forEach(user => {
        if (user && user._id && user.username) {
          userMap.set(user._id, user.username);
        }
      });
    } catch (userError) {
      console.warn('Could not fetch users for task mapping:', userError);
      // Continue without user data
    }
    
    // Transform the data to match the expected structure
    return response.data.map(item => {
      if (!item) return { _id: 'unknown', userName: 'Unknown User', tasks: [] };
      
      // Extract ID safely
      const id = item._id || (item.userId || 'unknown');
      
      // Try different properties that might contain username
      let userName = 'Unknown User';
      
      // First priority: use userMap if we have it (most reliable)
      if (userMap.has(id)) {
        userName = userMap.get(id);
      } 
      // Second priority: try properties from the item itself
      else if (item.userName && item.userName !== id) {
        userName = item.userName;
      } 
      else if (item.username && item.username !== id) {
        userName = item.username;
      }
      // If we couldn't find a good username, we'll use a shortened ID
      else {
        const shortId = id.substring(0, 6);
        userName = `User ${shortId}`;
      }
      
      return {
        _id: id,
        userName: userName,
        tasks: Array.isArray(item.tasks) ? item.tasks : []
      };
    });
  } catch (error) {
    console.error('Error fetching tasks status per user:', error);
    throw error;
  }
};

/**
 * Fetch all statistics in a single method
 */
export const getAllStats = async () => {
  try {
    // Fetch each stat separately to avoid one failure affecting others
    let usersByRole = [];
    let absenteeismRate = { absenteeismRate: '0%' };
    let tasksStatusPerUser = [];
    
    try {
      usersByRole = await getUsersByRoleStats();
    } catch (error) {
      console.error('Error fetching users by role:', error);
    }
    
    try {
      absenteeismRate = await getAbsenteeismRate();
    } catch (error) {
      console.error('Error fetching absenteeism rate:', error);
    }
    
    try {
      tasksStatusPerUser = await getTasksStatusPerUser();
    } catch (error) {
      console.error('Error fetching tasks per user:', error);
    }

    return {
      usersByRole,
      absenteeismRate,
      tasksStatusPerUser
    };
  } catch (error) {
    console.error('Error fetching all stats:', error);
    throw error;
  }
};
