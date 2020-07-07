import Api from './api'

export const getCurrencies = async () => {
  return Api()
    .get('https://openexchangerates.org/api/latest.json?app_id=069645672612432b8089d1d72233babe')
    .then((res) => res.data.rates)
    .catch((err) => console.error(err))
}

export default {
  getCurrencies,
}
