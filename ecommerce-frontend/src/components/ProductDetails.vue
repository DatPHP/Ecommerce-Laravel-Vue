<template>
    <!-- Product details container -->
    <!-- Use Vue's 'v-if' directive to render this container only if 'product' is truthy -->
    <!--This is like a magic switch. If we have a toy car (product details), the stand lights up and shows the toy. If not, it stays empty.-->
    <div v-if="product" class="product-details">
      <!-- Display the product name -->
      <h2 class="product-title">{{ product.name }}</h2>
      <!-- Display the product description -->
      <p class="product-description">{{ product.description }}</p>
      <!-- Display the product price -->
      <p class="product-price">Price: ${{ product.price }}</p>
    </div>
  </template>
  
  <script>
  import axios from '@/axios';  // Import the axios instance
  
  export default {
    // Component data
    data() {
      return {
        // Initialize product as null
        product: null // This means our box is empty to start with
        // it's empty because we haven't picked which toy car we want to display.
      };
    },
    // Lifecycle hook that is called after the instance has been mounted
    async mounted() { // the component being ready and visible in the browser for the first time.then 
        // we immediately fetch and display the product details.(after that component can update and re-render as many times as needed based on data changes or other interactions.)
      // Get the product ID from the route params
      const productId = this.$route.params.id; // This is like a magic number that tells us which toy car we want. Maybe it's toy car number 5 or number 10
      try {
        // Make a GET request to the API to fetch the product data
        const response = await axios.get(`/products/${productId}`); // our magic remote goes to the toy store and asks, 'Hey, can you tell me about toy car number 5?
        // Update the product data with the data from the API
        this.product = response.data; // Once the toy store tells us about the toy car, we put that toy car in our special 'product' box. Now, our display stand lights up and shows off the toy car!"
      } catch (error) {
        // If an error occurs, log it to the console
        console.error("An error occurred while fetching the product:", error);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-details {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .product-title {
    margin-bottom: 20px;
    font-size: 2em;
  }
  
  .product-description {
    font-size: 1.2em;
  }
  
  .product-price {
    margin-top: 20px;
    font-size: 1.2em;
    font-weight: bold;
  }
  </style>