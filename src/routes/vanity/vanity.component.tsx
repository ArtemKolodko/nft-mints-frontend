import { Navigate, useParams, useNavigate } from 'react-router-dom';


import './vanity.styles.scss';
import { Fragment, useEffect, useState } from 'react';
import { getUuidFromVanityTag } from '../../utils/mint-interface/mint-inteface.utils';

// route user links to the users' NFT gallery
const VanityRouter = () => {
  const { vanityUrl } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // get vanity tag
    // redirect user once tag is retrieved
    if (vanityUrl) {
      getUuidFromVanityTag(vanityUrl).then(uuid => {
        if (uuid) {
          navigate(`/nfts/gallery/${uuid}`)
        }
        else {
          navigate('/')
        }
      })
    }
  }, [vanityUrl])

  console.log(vanityUrl);

  if (!vanityUrl || vanityUrl === '') {
    <Navigate to={'/'} />
  }

  return (
    <Fragment>
      Looking up {vanityUrl} url owner
    </Fragment>
  )
}

export default VanityRouter;