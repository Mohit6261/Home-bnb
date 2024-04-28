import React from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

  import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";
import { API_END_POINT } from './utils/constant';

const currentpageurl=window.location.pathname;
const SocialShare = () => {
  return (
    <div className='flex'>
      <FacebookShareButton className='m-2'
            url={`${currentpageurl}`}
           quote="Please chekout these listing"
           >
          <FacebookIcon size={32} round={true}></FacebookIcon>
      </FacebookShareButton>

      <WhatsappShareButton className='m-2'
             url={`${currentpageurl}`}
           quote="Please chekout these listing"
      >
          <WhatsappIcon size={32} round={true}></WhatsappIcon>
      </WhatsappShareButton>

      <TelegramShareButton className='m-2'
               url={`${currentpageurl}`}
             quote="Please chekout these listing"
      >
          <TelegramIcon size={32} round={true}></TelegramIcon>
      </TelegramShareButton>

      <LinkedinShareButton className='m-2'
                 url={`${currentpageurl}`}
                quote="Please chekout these listing"
      >
          <LinkedinIcon size={32} round={true}></LinkedinIcon>
      </LinkedinShareButton>

      <TwitterShareButton className='m-2'
                url={`${currentpageurl}`}
              quote="Please chekout these listing"
       >
          <TwitterIcon size={32} round={true}></TwitterIcon>
      </TwitterShareButton>
    </div>
  )
}

export default SocialShare