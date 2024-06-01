import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  FacebookIcon,
  LinkedinIcon,
} from 'react-share';
//  FacebookShareCount,
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';

import styled from 'styled-components';

const ShareButons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const ShareSocial = (imageUrl) => {
  return (
    <ShareButons>
      <FacebookShareButton
        url={`https://i.pinimg.com/736x/43/a5/d3/43a5d3af8cf83e70673d43518b85e99a.jpg`}
        quote='¡Mira la increíble Emoción!'
        hashtag='#festivAll'
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton url='https://www.linkedin.com/'>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <InstapaperShareButton url='https://www.instapaper.com/'>
        <IoLogoInstagram size={34} color={'#BC02E1'} />
      </InstapaperShareButton>
      <TwitterShareButton url='https://twitter.com/'>
        <RiTwitterXLine size={24} color={'#333'} />
      </TwitterShareButton>
    </ShareButons>
  );
};

export default ShareSocial;
