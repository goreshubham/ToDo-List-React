import axios from 'axios';

const BASE_URL = 'https://your-api-endpoint.com/tasks';

class TaskService {
  static async getAllTasks() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching tasks');
    }
  }

  static async getTaskById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching task with ID ${id}`);
    }
  }

  static async createTask(taskData) {
    try {
      const response = await axios.post(BASE_URL, taskData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating new task');
    }
  }

  static async updateTask(id, taskData) {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating task with ID ${id}`);
    }
  }

 
  static async deleteTask(id) {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return `Task with ID ${id} has been deleted successfully`;
    } catch (error) {
      throw new Error(`Error deleting task with ID ${id}`);
    }
  }
}

export default TaskService;
