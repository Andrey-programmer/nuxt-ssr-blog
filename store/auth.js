import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
    token: null
})

export const getters = {
    isAuth(state) {
        return !!state.token
    },
    getToken(state) {
        return state.token
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
            // console.log('token ', token)
            dispatch('setToken', token)
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    setToken({commit}, token) {
        this.$axios.setToken(token, 'Bearer')
        commit('setToken', token)
        Cookies.set('jwt-token', token)
    },
    logout({commit}) {
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-token')
    },
    async createUser({commit}, formData) {
        try {
            await this.$axios.$post('/api/auth/admin/create', formData)
            // console.log('CreateUser', formData)
        } catch (error) {
            commit('setError', error, {root: true})
            throw error
        }
    },
    autoLogin({dispatch}) {
        //Если находимся на клиенте то используем document.cookie
        // иначе достаем с сервера this.app.context.req.headers.cookie
        // console.log(process.browser)
        const cookieStr = process.browser
            ? document.cookie 
            : this.app.context.req.headers.cookie
        // console.log(cookieStr)

        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies['jwt-token']
        // console.log(token)
        if(isJWTValid(token)) {
            dispatch('setToken', token)
        }   else {
            dispatch('logout')
        }
    }
}

function isJWTValid(token) {
    // console.log('Token = ', token)
    if(!token) {
        return false
    }

    const jwtData = jwtDecode(token) || {}
    // console.log(jwtData)
    const expires = jwtData.exp || 0
    return (new Date().getTime()/1000) < expires
}