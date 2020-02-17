import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";
import JwtService from "@/common/jwt.service";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    let token = window.localStorage.getItem('access_token');
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  setInterceptor(router) {
    Vue.axios.interceptors.response.use(undefined, err => {
      return new Promise(() => {
        if(err.response) {
          if (err.response.status === 401) {
            JwtService.destroyToken();
            router.push("/login");
          }
          throw err;
        }
      });
    });
  },

  get(resource, params) {
    return Vue.axios.get(`${resource}`, {params});
  },

  getByParam(resource, id) {
    return Vue.axios.get(`${resource}/${id}`);
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, id, params) {
    return Vue.axios.put(`${resource}/${id}`, params);
  },

  delete(resource, id) {
    return Vue.axios.delete(`${resource}/${id}`);
  }
};

export default ApiService;

export const AutificationService = {
  login(resource, params) {
    return ApiService.post(resource, params);
  },
  logout() {
    return ApiService.post('logout');
  }
};

export const CategoriesService = {
    getListCategories(params) {
        return ApiService.get('categories', params);
    },

    getCategory(id) {
        return ApiService.getByParam('category', id);
    },

    createCategory(params) {
        return ApiService.post('category', params);
    },

    updateCategory(id, params) {
        return ApiService.update('category', id, params);
    },

    deleteCategory(id) {
        return ApiService.delete('category', id);
    },

    getListCategoriesForSelect() {
        return ApiService.get('categories-select');
    }
};

export const ProductsService = {
    getListProducts(params) {
        return ApiService.get('products', params);
    },

    getProduct(id) {
        return ApiService.getByParam('product', id);
    },

    createProduct(params) {
        return ApiService.post('products', params);
    },

    updateProduct(id, params) {
        return ApiService.update('product', id, params);
    },

    deleteProduct(id) {
        return ApiService.delete('product', id);
    },

    searchProductsByCategoryId(id) {
        return ApiService.get('search-products', id);
    }
};

export const OrdersService = {
    getListOrders(params) {
        return ApiService.get('statistic-orders', params);
    },

    createOrder(params) {
        return ApiService.post('order', params);
    }
};