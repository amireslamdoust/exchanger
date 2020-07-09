import Api from './api'

export const getCurrencies = async () => {
  return Api()
    .get(`${process.env.REACT_APP_API_URL}?app_id=${process.env.REACT_APP_API_TOKEN}`)
    .then((res) => res.data.rates)
    .catch((err) => console.error(err))
}

export default { getCurrencies }
