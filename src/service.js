import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5179"

// Interceptor to log errors in responses
axios.interceptors.response.use(
  response => response,
  error => {
    console.error("Error in response:", error);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)
    return result.data;
  },

  addTask: async (name) => {
    try {
      const newItem = {
        id:0,
        name: name,
        isComplete: false
      };
      const result = await axios.post(`/items`, newItem);
      return result.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    const answer = await axios.get(`/items`);
    const item = answer.data.find(item => item.id === parseInt(id));
    if (!item) {
      console.error(`Item with id ${id} not found.`);
      return null;
    }
    const result = await axios.put(`/items/${id}`, {
      Id: item.id,
      Name: item.name,
      IsComplete: isComplete     
    });
    return result.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask');
    const result = await axios.delete(`/items/${id}`);
    return result;
  }


};
