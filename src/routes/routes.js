import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import LoginPage from "@/views/LoginPage.vue";
import CategoriesPage from "@/views/CategoriesPage.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import ProductsPage from "@/views/ProductsPage.vue";
import ProductPage from "@/views/ProductPage.vue";
import OrdersPage from "@/views/OrdersPage.vue";
import CreateCategoryPage from "@/views/CreateCategoryPage.vue";
import CreateProductPage from "@/views/CreateProductPage.vue";
import CreateOrderPage from "@/views/CreateOrderPage.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: DashboardLayout,
        redirect: "/categories",
        children: [
            {
                path: "categories",
                name: "Categories",
                component: CategoriesPage
            },
            {
                path: "category/:id",
                name: "category",
                component: CategoryPage
            },
            {
                path: "create/category",
                name: "create_category",
                component: CreateCategoryPage
            },
            {
                path: "products",
                name: "Products",
                component: ProductsPage
            },
            {
                path: "product/:id",
                name: "product",
                component: ProductPage
            },
            {
                path: "create/product",
                name: "create_product",
                component: CreateProductPage
            },
            {
                path: "create/order",
                name: "create_order",
                component: CreateOrderPage
            },
            {
                path: "orders",
                name: "orders",
                component: OrdersPage
            }
        ],
        meta: {
            requiresAuth: true
        },
    },
    {
        path: "/login",
        name: "login_page",
        component: LoginPage
    },
];

export default routes;
