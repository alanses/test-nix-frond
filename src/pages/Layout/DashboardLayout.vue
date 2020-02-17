<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <notifications></notifications>

        <side-bar>
            <mobile-menu slot="content"></mobile-menu>
            <sidebar-link to="/categories">
                <i class="material-icons">category</i>
                <p>Categories</p>
            </sidebar-link>
            <sidebar-link to="/products">
                <i class="material-icons">business_center</i>
                <p>Products</p>
            </sidebar-link>
          <li class="md-list-item" @click="logout">
            <a class="md-list-item-router md-list-item-container md-button-clean">
              <div class="md-list-item-content md-ripple">
                  <i class="material-icons">exit_to_app</i>
                  <p>Logout</p>
              </div>
            </a>
          </li>

        </side-bar>



        <div class="main-panel">

            <div class="d-flex justify-content-between flex-column min-vh-100">
                <div>
                    <top-navbar></top-navbar>

                    <dashboard-content></dashboard-content>
                </div>

                <content-footer v-if="!$route.meta.hideFooter"></content-footer>
            </div>


        </div>
    </div>
</template>
<style lang="scss"></style>
<script>
    import TopNavbar from "./TopNavbar.vue";
    import ContentFooter from "./ContentFooter.vue";
    import DashboardContent from "./Content.vue";
    import MobileMenu from "@/pages/Layout/MobileMenu.vue";
    import {AutificationService} from "@/common/api.service";
    import JwtService from "@/common/jwt.service";

    export default {
        components: {
            TopNavbar,
            DashboardContent,
            ContentFooter,
            MobileMenu
        },

        methods: {
            logout() {
                AutificationService.logout().then(() => {
                    JwtService.destroyToken();
                    this.$router.push("/login");
                });
            }
        }
    };
</script>
