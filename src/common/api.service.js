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


export const AchievementsService = {
  getListAchievements(params) {
    return ApiService.get('admin/achievements', params);
  },
  getAchievement(id) {
    return ApiService.getByParam('admin/achievement', id);
  },
  createAchievement(params) {
    return ApiService.post('admin/create/achievement', params);
  },
  updateAchievement(params) {
    return ApiService.post('admin/update/achievement', params);
  },
  deleteAchievement(id) {
    return ApiService.delete('admin/achievement', id);
  },
  getListActivitiesForSelect() {
    return ApiService.get('admin/list/activities/for/select');
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
};