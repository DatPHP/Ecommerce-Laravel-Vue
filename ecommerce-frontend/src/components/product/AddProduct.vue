<template>
    <!-- Form for adding a product -->
    <!-- @submit.prevent="submitForm" prevents the default form submission and calls the 'submitForm' method instead -->
    <form @submit.prevent="submitForm" class="add-product-form">
      <!-- Input for the product name -->
      <!-- v-model="name" binds the input to the 'name' data property -->
      <input class="input-field" v-model="name" placeholder="Product Name" />
      <!-- Error message for the product name -->
      <!-- Displayed if 'errors.name' is truthy -->
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
  
      <!-- Input for the product description -->
      <!-- v-model="description" binds the input to the 'description' data property -->
      <input class="input-field" v-model="description" placeholder="Product Description" />
      <!-- Error message for the product description -->
      <!-- Displayed if 'errors.description' is truthy -->
      <p v-if="errors.description" class="error">{{ errors.description }}</p>
  
      <!-- Input for the product price -->
      <!-- v-model="price" binds the input to the 'price' data property -->
      <input class="input-field" v-model="price" placeholder="Product Price" />
      <!-- Error message for the product price -->
      <!-- Displayed if 'errors.price' is truthy -->
      <p v-if="errors.price" class="error">{{ errors.price }}</p>

      
     
          <input accept="image/*" type="file" @change="previewFiles($event)" />
          <img
            alt=""
            :src="newImage || 'https://www.namepros.com/attachments/empty-png.89209/'"
          />
     
     

  
      <!-- Button for submitting the form -->
      <button type="submit" class="submit-button">Add Product</button>
    </form>
  </template>
  
  <script>
  // Importing the axios instance
  import axios from '@/axios';
  import Swal from 'sweetalert2/dist/sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';

  
  export default {
    // Component data
    data() { // its like a empty toybox It's setting up empty spaces (or boxes) for things like the product's name etc...
      return {
        // Product details
        name: '',
        description: '',
        price: '',
        imageUpload:'',
        imageUrl:'',
        image: "",
        newImage: "",
        // Validation errors
        errors: {}
      };
    },
    methods: { // special toy tools or magic wands that let us do things with our toys.
      // Validate the input fields
      validateInput() {
        // Errors object
        const errors = {};
        // Validate the product name
        if (!this.name) errors.name = 'Name is required';
        // Validate the product description
        if (!this.description) errors.description = 'Description is required';
        // Validate the product price
        if (!this.price || isNaN(this.price)) errors.price = 'Price is required and must be a number';
        return errors;
      },
      // Handle form submission
      async submitForm() { // is like the magic toy phone. It might do something that takes time.
        // Validate the input fields
        const errors = this.validateInput();
        // If there are validation errors, update the 'errors' data property and stop execution
        if (Object.keys(errors).length > 0) { // is like counting how many sections in the toy box have toys in them.
         // .length > 0 is checking if there's at least one toy in the toy box.
          this.errors = errors; // Put those toys (or errors) in a special display area 
          return; // Stop doing anything else and just look at those toys
        }
        
        try {
          // Send a POST request to the API to add the 
          //console.log(this.image);

          const formData = new FormData()
          formData.append('name', this.name)
          formData.append('description', this.description)
          formData.append('image', this.image)
          formData.append('price',this.price)
         
         // await axios.post('/products', formData);
          await axios.post(`/products`, formData).then(({ data }) => {
            Swal.fire({
              icon: "success",
              text: data.message
            })
            // If the request is successful, redirect to the product list
            this.$router.push('/');
          //navigate("/product")
        }).catch(({ response }) => {
          Swal.fire({
              text: response.data.message,
              icon: "error"
            })
        })  


        } catch (error) {
          // If an error occurs, log it to the console
          console.error("An error occurred while adding the product:", error);
        }
         

      },
      onChangeImage(e) {
        const file = e.target.files[0];
        console.log(file);
        this.data.image = file;
        
        this.imageUrl = URL.createObjectURL(file); //url image 
      },

      previewFiles(event) {
      const file = event.target.files[0];
      this.image = file;
     
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
      };
      theReader.readAsDataURL(file);
    }

    }
  };
  </script>
  
  
  
  <style scoped>
    .error {
    color: red;
  }
    .add-product-form {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    
    .input-field {
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 10px;
      font-size: 1em;
    }
    
    .submit-button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .submit-button:hover {
      background-color: #45a049;
    }
    </style>