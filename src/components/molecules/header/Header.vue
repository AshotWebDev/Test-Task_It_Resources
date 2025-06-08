<script setup>
import { useRoute } from "vue-router";
import { defineAsyncComponent } from "vue";
import chevronRightIcon from "@/assets/icons/chevronRightIcon.svg";
import loginIcon from "@/assets/icons/login.svg";
import notificationImg from "@/assets/images/notification.png";
const SelectLanguage = defineAsyncComponent(() => import("@/components/molecules/selectLanguage/SelectLanguage.vue"));
const Button = defineAsyncComponent(() => import("@/components/atom/button/Button.vue"));

const route = useRoute();
</script>

<template>
  <div class="header">
    <div class="container">
      <div class="header_left">
        <div class="header_left_route">
          <span class="header_left_route_name body1-medium">{{
            route.name || "Գլխավոր"
          }}</span>
          <img
            class="header_left_route_icon"
            :src="chevronRightIcon"
            alt="Navigation Icon"
          />
        </div>

        <div class="header_left_title">
          <h3 class="header_left_title_text h2-bold">Warehouses</h3>
          <span class="header_left_title_count body1-medium">200</span>
        </div>
      </div>
      <div class="header_right">
        <SelectLanguage/>
        <img class="header_right_notification" :src="notificationImg" alt="notification">
        <Button txt="Super admin" variant="minimal" size="large" type="button"/>
        <Button txt="Logout" variant="minimal" size="large" type="button" :icon="loginIcon" iconPosition="right" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.header {
  height: 63px;
  background-color: #fff;
  border-bottom: 1px solid $gray-200;
  width: 100%;

    .container {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;

        .header_left{
            height: 100%;
            @include flex-center;

            &_route{
                @include flex-center;
                margin-right: 10px;

                &_name{
                    color: $blue-300;
                }
                &_icon{
                    filter: invert(46%) sepia(9%) saturate(772%) hue-rotate(178deg) brightness(93%) contrast(92%)
                }

               
            }

            &_title{
                @include flex-center;
                margin-right: 10px;
                &_text{
                    color: $gray-900;
                }

                &_count{
                    color: $blue-300;
                    padding: 2px 10px;
                    background-color:  $gray-200;
                    border-radius: $radius-sm;
                }
            }
        }

        .header_right{
            @include flex-center;
            gap: 10px;

            &_notification{
                cursor: pointer;
            }
        }
      
    }
}
</style>
