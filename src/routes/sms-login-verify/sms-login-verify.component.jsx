import {useEffect, useState} from 'react'
import { verifyLogin } from '../../utils/sms-wallet/comunicator'

const SmsLoginVerify = () => {
  const [, setIsPending] = useState(true)
  const [message, setMessage] = useState('')
  const [redirectUri, setRedirectUri] = useState('')

  useEffect(() => {
    // Standard params
    const params = new URLSearchParams(window.location.search)
    const signature = params.get('signature')
    const address = params.get('address')
    const messageHash = params.get('messageHash')
    const error = params.get('error')
    const cancelled = params.get('cancelled')
    // We added this one for convenience
    const redirect = params.get('redirect')
    if (redirect) setRedirectUri(redirect)

    const phone = window.localStorage.getItem('phone')
    verifyLogin({signature, messageHash, address, error, cancelled, phone})
      .then((isSuccess) => {
        setMessage(
          `Your information has been verified. Redirecting to ${
            redirect || 'gallery'
          } in a few seconds.`
        )
        setTimeout(doRedirect, 5000, redirect)
      })
      .catch((err) => {
        console.error(err)
        setMessage('An error has occurred, check the console for details.')
      })
      .finally(() => setIsPending(false))
  }, [setIsPending, setRedirectUri])

  function doRedirect(uri) {
    window.location.href = uri || '/creator/'
  }

  return (
    <>
      <p>Verifying your credentials. Please wait...</p>
      <p>{message}</p>
      {redirectUri ? <a href={redirectUri}>Continue</a> : null}
    </>
  )
}

export default SmsLoginVerify;