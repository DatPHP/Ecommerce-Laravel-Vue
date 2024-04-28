// Importing the axios library for making HTTP requests
import axios from 'axios';

// Creating a new instance of axios with default configuration
const instance = axios.create({
    // Setting the base URL for all the axios requests
    baseURL: 'http://localhost:8000/api'
});

// Exporting the created instance for use in other parts of the application
export default instance;
