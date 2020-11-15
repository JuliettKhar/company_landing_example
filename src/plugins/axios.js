import qs from 'qs'
import Axios from 'axios'

Axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
Axios.defaults.headers.common['Accept-Language'] = localStorage.getItem('locale') || 'ru'

Axios.interceptors.request.use(
  config => {
    config.paramsSerializer = params =>
      qs.stringify(params, {
        encode: false,
        skipNulls: true,
        arrayFormat: 'brackets'
      })

    /*
     * Todo: вариант получения токена для запроса
     *  if (Vue.$store.state.auth.token.access) {
     *    config.headers.Authorization = `Bearer ${ Vue.$store.state.auth.token.access }`;
     *  }
     */

    return config
  },

  error => Promise.reject(error)
)

Axios.interceptors.response.use(
  /*eslint-disable-next-line*/
  response => {
    /*
     * Todo: вариант получения даты
     *  return { ...response, data: response.data.data };
     */
  },

  error => {
    // Todo: вариант обработки ошибки
    if (
      !(
        (error.response.status === 400 || error.response.status === 401) &&
        error.response.data.message &&
        error.response.data.message.startsWith('Token')
      ) &&
      !(
        error.response.status === 404 &&
        error.response.data.message &&
        error.response.data.message.startsWith('Refresh')
      )
    ) {
      return Promise.reject(error)
    }
  }
)
