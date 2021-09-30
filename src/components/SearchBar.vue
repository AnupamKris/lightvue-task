<template>
  <div class="search-box">
    <div class="search-bar">
      <input
        type="text"
        v-model="username"
        @input="sendReq"
        :style="{
          'border-radius': open && users ? '30px 0 0 0' : '30px 0 0 30px',
        }"
        @focus="openRes"
        @blur="openRes"
      />
      <button @click="sendReqI">
        <i class="fa fa-search"></i>
      </button>
    </div>
    <div
      class="response-data"
      :style="{ height: open && users ? '300px' : '0px' }"
    >
      <p @click="getProfile(item)" v-for="item in users" :key="item.key">
        @{{ item.login }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup(props, { emit }) {
    const username = ref("");
    const users = ref("");

    const open = ref(false);
    let timer = null;

    const openRes = () => {
      open.value = !open.value;
    };

    const sendReq = async () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(async () => {
        console.log("hi");
        if (username.value) {
          const response = await fetch(
            "https://api.github.com/search/users?q=" + username.value
          );

          var data = await response.json();
          console.log(data.items);
          users.value = await data.items;
        } else {
          users.value = "";
        }
      }, 1000);
    };

    const sendReqI = async () => {
      console.log("hi");
      if (username.value) {
        const response = await fetch(
          "https://api.github.com/search/users?q=" + username.value
        );

        var data = await response.json();
        console.log(data.items);
        users.value = await data.items;
      } else {
        users.value = "";
      }
    };

    const getProfile = (user) => {
      emit("get-profile", user);
    };

    return {
      sendReq,
      sendReqI,
      getProfile,
      openRes,
      username,
      users,
      open,
    };
  },
};
</script>

<style lang="less" scoped>
.search-bar {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: calc(100% - 140px);
    transition: 0.3s;
    height: 50px;
    border: none;
    border-radius: 20px 0 0 20px;
    background: #181d2c;
    color: white;
    outline: none;
    padding: 0 20px;
  }
  button {
    width: 80px;
    height: 50px;
    outline: none;
    border: none;
    border-radius: 0 30px 30px 0;
    font-size: 1.5rem;
    background: #2c3551;
    color: #1c2541 + #505050;
  }
}
.response-data {
  width: calc(100% - 100px);
  height: 0px;
  margin-right: 80px;
  transition: 0.3s;
  background: #181d2c;
  max-height: 300px;
  overflow: auto;
  border-radius: 0 0 30px 30px;
  scrollbar-width: none;
  display: flex;

  align-items: center;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
  p {
    width: calc(100% - 60px);
    padding: 0 20px;
    min-height: 40px;
    margin-top: 5px;
    background: #2c3551;
    display: flex;
    justify-content: left;
    align-items: center;
    border-radius: 10px;
    &:hover {
      background: #394464;
    }
  }
}

.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>