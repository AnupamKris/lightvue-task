<template>
  <div class="search-box">
    <div class="search-bar">
      <div class="icon">
        <i
          :class="settings ? 'fa fa-times' : 'fa fa-gear'"
          @click="openSettings"
        >
        </i>
        <div class="settings" v-if="settings">
          <div class="access setting-field">
            <input
              type="text"
              v-model="access_token"
              placeholder="Enter GitHub Access Token"
            />
            <button @click="setAccessToken"><i class="fa fa-check"></i></button>
          </div>
        </div>
      </div>
      <input
        type="text"
        v-model="username"
        @keyup.enter="sendReqI"
        @input="sendReq"
        @focus="openRes(true)"
        @blur="openRes(false)"
      />
      <button @click="sendReqI">
        <i class="fa fa-search"> </i>
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
import { useStore } from "vuex";
export default {
  setup(props, { emit }) {
    const username = ref("");
    const users = ref("");
    const access_token = ref("");
    const settings = ref(false);
    const store = useStore();

    const setAccessToken = () => {
      settings.value = false;
      store.state.accessToken = access_token.value;
    };

    const open = ref(false);
    let timer = null;

    const openSettings = () => {
      settings.value = !settings.value;
    };

    const openRes = (v) => {
      open.value = v;
    };

    const sendReq = async () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(async () => {
        if (username.value) {
          const response = await fetch(
            "https://api.github.com/search/users?q=" + username.value,
            {
              headers: {
                Authorization: store.state.accessToken,
              },
            }
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
      open.value = false;
      console.log("Instnt req");
      if (username.value) {
        const response = await fetch(
          "https://api.github.com/search/users?q=" + username.value,
          {
            headers: {
              Authorization: store.state.accessToken,
            },
          }
        );

        var data = await response.json();
        console.log(data.items);
        emit("get-results", data);
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
      openSettings,
      setAccessToken,
      access_token,
      settings,
      username,
      users,
      open,
    };
  },
};
</script>

<style lang="less" scoped>
.search-box {
  width: 100%;
}

.search-bar {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 2rem;
    width: 50px;
    background: #181d2c;
    border-radius: 50% 0 0 50%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .settings {
      position: absolute;
      width: 250px;
      height: 60px;
      background: #181d2c;
      top: 70px;
      left: 10px;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      .setting-field {
        display: flex;
        justify-content: center;
        align-items: center;
        input {
          height: 40px;
          padding: 0 10px;
          width: 170px;
          border-radius: 10px 0 0 10px;
          text-align: center;
          background: #0a0816;
        }
        button {
          height: 40px;
          width: 40px;
          border-radius: 0 10px 10px 0;
          color: #ffffff;
          background: #2c3551;
          font-size: 1rem;
        }
      }
    }
  }

  input {
    width: calc(100% - 190px);
    transition: 0.3s;
    height: 50px;
    border: none;
    border-radius: 0;
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
  width: calc(100% - 150px);
  height: 0px;
  margin-right: 90px;
  margin-left: 60px;
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