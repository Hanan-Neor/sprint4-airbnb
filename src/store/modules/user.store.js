import { userService } from '../../services/user.service';

// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../../services/socket.service'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null);

export const userStore = {
  state: {
    loggedinUser: userService.getLoggedinUser() || '',//TODO remove one of these
    // loggedInUser: userService.getLoggedinUser() || '',
    users: [],
    watchedUser: null,
  },
  getters: {
    users({ users }) {
      return users;
    },
    loggedinUser({ loggedinUser }) {
      return loggedinUser;
    },
    // watchedUser({ watchedUser }) { return watchedUser }
  },
  mutations: {
    // setWatchedUser(state, { user }) {
    //     state.watchedUser = user;
    // },
    setUsers(state, { users }) {
      state.users = users;
    },
    setLoggedinUser(state, {loggedinUser}){state.loggedinUser = loggedinUser},
    // setLoggedinUser(state, {loggedinUser}){state.loggedinUser = loggedinUser || null},
    setUser(state, { user }) {
      state.loggedinUser = user;
    },
    // removeUser(state, { userId }) {
    //     state.users = state.users.filter(user => user._id !== userId)
    // },
  },
  actions: {
    async getById(context,payload) {
      try {
      const loggedinUserId = this.getters.loggedinUser._id
      const user = await userService.getById(loggedinUserId);
      return user
      } catch (err) {
        console.log('Cannot load user in store');
        throw err;
      }


    },
    async loadLoggedInUser( context ){
      try{
        const loggedinUser = await userService.getLoggedinUser()
        context.commit({ type: 'setLoggedinUser', loggedinUser });
        return loggedinUser;
      } catch (err) {
        console.log('userStore: Error in loadLoggedInUser', err);
        throw err;
      }
    },

    async liked(context, payload) {
      console.log(payload.spaceId);
    },

    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        // commit({ type: 'setLoggedinUser', user });
        commit({ type: 'setUser', user });

        return user;
      } catch (err) {
        console.log('userStore: Error in login', err);
        throw err;
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        // commit({ type: 'setLoggedinUser', user });
        commit({ type: 'setUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in signup', err);
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setLoggedinUser', user: null });
      } catch (err) {
        console.log('userStore: Error in logout', err);
        throw err;
      }
    },
    async loadUsers({ commit }) {
      // TODO: loading
      try {
        const users = await userService.getUsers();
        commit({ type: 'setUsers', users });
      } catch (err) {
        console.log('userStore: Error in loadUsers', err);
        throw err;
      }
    },
    // async loadAndWatchUser({ commit }, { userId }) {
    //     try {
    //         const user = await userService.getById(userId);
    //         commit({ type: 'setWatchedUser', user })
    //         socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    //         socketService.off(SOCKET_EVENT_USER_UPDATED)
    //         socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
    //             commit({ type: 'setWatchedUser', user })
    //         })
    //     } catch (err) {
    //         console.log('userStore: Error in loadAndWatchUser', err)
    //         throw err
    //     }
    // },
    // async removeUser({ commit }, { userId }) {
    //     try {
    //         await userService.remove(userId);
    //         commit({ type: 'removeUser', userId })
    //     } catch (err) {
    //         console.log('userStore: Error in removeUser', err)
    //         throw err
    //     }
    // },
    async updateUser({ commit }, { user }) {
      try {
        // if(this.getters.loggedinUser.likedSpacesIds === user.likedSpacesIds) return
        user = await userService.update(user);
        commit({ type: 'setUser', user });
      } catch (err) {
        console.log('userStore: Error in updateUser', err);
        throw err;
      }
    },
  },
};
