import { createRouter, createWebHistory } from 'vue-router';

import ProductList from './components/product/ProductList.vue';
import ProductDetails from './components/product/ProductDetails.vue';
import AddProduct from './components/product/AddProduct.vue';
import EditProduct from './components/product/EditProduct.vue';
import Login from './components/Login.vue'; // Import the Login component
import Register from './components/Register.vue'; // Import the Register component

const routes = [
    {
        path: '/',
        name: 'ProductList',
        component: ProductList,
        meta: { public: false } // Mark this route as private
    },
    {
        path: '/product/:id',
        name: 'ProductDetails',
        component: ProductDetails,
        meta: { public: false } // Mark this route as private
    },
     {
        path: '/add-product', // namplate on the door
        name: 'AddProduct', // nickname for the room e.g playroom!
        component: AddProduct, // actual room behind the door.
        meta: { public: false } // Mark this route as private (special sticker on some rooms that says "Private")
    },
    {
        path: '/edit-product/:id', 
        name: 'EditProduct',
        component: EditProduct,
        meta: { public: false } // Mark this route as private
    },
    {
        path: '/login', // Add this route
        name: 'Login',
        component: Login,
        meta: { public: true } // Mark this route as public
    },
    {
        path: '/register', // Add this route
        name: 'Register',
        component: Register,
        meta: { public: true } // Mark this route as public
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    // Check if the user is authenticated (e.g., check if a token is stored)
    const isAuthenticated = !!localStorage.getItem('token');

    if (!to.meta.public && !isAuthenticated) {
        // If the route is not public and the user is not authenticated, redirect to login
        next({ name: 'Login' });
    } else {
        // Otherwise, allow navigation
        next();
    }
});

export default router;
