import axios from 'axios'

const privilegedAxios = axios.create({withCredentials: true})
const GATEWAY = process.env.REACT_APP_SMS_WALLET_GATEWAY;
const API_URI = GATEWAY;

export async function initLogin({phone, redirect}) {
  const r = await axios.post(`${API_URI}/v1/login/init`, {phone, redirect})
  if (r.status !== 200) {
    throw new CommunicatorError('ERR_UNKNOWN', JSON.stringify(r.data))
  }
  return r.data
}

export async function verifyLogin({signature, messageHash, address, error, cancelled, phone}) {
  const data = {signature, messageHash, address, error, cancelled, phone}

  const r = await privilegedAxios.post(`${API_URI}/v1/login/verify`, data)
  if (r.status === 403) {
    return false
  } else if (r.status !== 200) {
    throw new CommunicatorError(
      'ERR_UNKNOWN',
      `Received invalid status code, ${r.status} while trying to verify login`
    )
  }
  return r.data
}

export async function logout() {
  const r = await privilegedAxios.get(`${API_URI}/v1/login/logout`)
  return r.status === 200
}

export async function whoami() {
  const r = await privilegedAxios.get(`${API_URI}/v1/login/whoami?t=${new Date().getUTCSeconds()}`)
  console.log('whoami', r.data)
  return r.data
}

class CommunicatorError {
  constructor(name, message) {
    this.name = name
    this.message = message
  }
}