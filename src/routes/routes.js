import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import LoginPage from "@/views/LoginPage.vue";
import CategoriesPage from "@/views/CategoriesPage.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import CreateCategoryPage from "@/views/CreateCategoryPage.vue";

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
