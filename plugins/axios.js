import { request } from "http";

export default function({$axios, redirect, store}) {
    // Перехватываем интерцепторами запрос
    $axios.interceptors.request.use(request => {
        // console.log('Interceptors')
        // eckb пользователь уже авторизовался и при этом заголовка Authorization ещё нет 
        if(store.getters['auth/isAuth'] && !request.headers.common['Authorization']) {
            const token = store.getters['auth/getToken']
            request.headers.common['Authorization'] = `Bearer ${token}`
        }
        // console.log(request.headers)
        return request
        
    })

    $axios.onError(error => {
        if(error.response) {
            if(error.response.status === 401) {
                redirect('/admin/login?message=session')
                store.dispatch('auth/logout')
            }

            if(error.response.status === 500) {
                console.error('Server 500 error')
            }
        }
    })
}