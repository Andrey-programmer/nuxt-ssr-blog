export const state = () => ({
    token: null
})

export const getters = {
    isAuth(state) {
        return !!state.token
    }
}

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    clearToken(state) {
        state.token = null
    }
}

export const actions = {
    async login({commit, dispatch}, formData) {
        try {
           /*  const token = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    return resolve('mock-token')
                }, 2000);
            })   */

            const {token} = await this.$axios.$post('/api/auth/admin/login',formData)
            console.log('token ', token)
            dispatch('setToken', token)
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    setToken({commit}, token) {
        commit('setToken', token)
    },
    logout({commit}) {
        commit('clearToken')
    },
    async createUser({commit}, formData) {
        try {
            await this.$axios.$post('/api/auth/admin/create', formData)
            console.log('CreateUser', formData)
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    }
}