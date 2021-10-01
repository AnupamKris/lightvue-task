<template>
  <div class="user-profile" @click="getProfile">
    <div class="img">
      <img :src="data.avatar_url" alt="" width="50" height="50" />
    </div>
    <span>@{{ data.login }}</span>
    <i class="fa fa-link" @click.stop="goToGithub"></i>
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core";
export default {
  name: "UserProfile",
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    const getProfile = () => {
      emit("get-profile", props.data);
    };

    const goToGithub = () => {
      window.open("https://github.com/" + props.data.login, "_blank");
    };
    return {
      getProfile,
      goToGithub,
    };
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  width: calc(100% - 20px);
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #181d2c;
  border-radius: 10px;
  margin: 5px 0;
  overflow: hidden;
  &:hover {
    background: #2c3551;
  }
  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    img {
      border-radius: 50%;
    }
  }
  span {
    // flex: 2;
    width: 80%;
    text-align: left;
    font-size: 1.5rem;
  }
  i {
    width: 80px;
    height: 80px;
    background: #2c3551;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6c7591;
    &:hover {
      background: #171d30;
    }

    // margin: 0 10px;
    // flex: 1;
  }
}
</style>