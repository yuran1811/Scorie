import { FacebookIcon2, GithubIcon, InfoIcon, LinkedinIcon, YoutubeIcon } from '@cpns/icons';
import { HighlightLink } from '@cpns/interfaces';
import { FACEBOOK_PROFILE, GH_LINK, LINKEDIN_PROFILE, YOUTUBE_PROFILE } from '@shared/constants';
import { FC, useState } from 'react';

export const About: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flexcentercol w-full">
      <div className="flexcenter w-full cursor-pointer gap-8" onClick={() => setOpenModal((s) => !s)}>
        <InfoIcon className="scale-typo cursor-pointer text-ctcolor" width="32" height="32" />
        <div className="typo-med line-clamp-1 font-bold">About</div>
      </div>

      {openModal && (
        <div className="mt-16 w-full space-y-10" id="about-section">
          <div className="typo-sm flexcentercol font-bold">
            <div>This </div>
            <div className="relative h-[4rem] w-[20rem] overflow-y-hidden text-ctcolor">
              {[
                { content: 'free', grad: '#12fff7,#b3ffab' },
                { content: 'modern', grad: '#fc6c8f,#ffb86c' },
                { content: 'easy-to-use', grad: '#b199f3,#e59ebc' },
              ].map((_, idx) => (
                <span
                  className="textGradient absolute left-0 right-12 text-center uppercase"
                  style={{
                    translate: idx ? '0 -7.5rem' : '',
                    animation: `upndown 3s infinite ${idx}s ease`,
                    backgroundImage: `linear-gradient(to bottom right, ${_.grad})`,
                  }}
                >
                  {_.content}
                </span>
              ))}{' '}
              <span className="absolute right-[44px]" style={{ animation: 'upndown-scale 3s infinite 1.5s ease' }}>
                app
              </span>
            </div>
            <div>will improve your</div>
            <div
              className="textGradient animate-gdMoveVert uppercase"
              style={{
                backgroundSize: '400% 400%',
                backgroundImage: 'linear-gradient(-135deg,#2cccff,#20e3b2,#ffcc70,#c850c0,#4158d0)',
              }}
            >
              study quality
            </div>
          </div>
          <div className="flex-1 py-4">
            <div className="typo-semism text-center font-bold">Contact</div>
            <div className="flexcenter m-4 flex-wrap gap-4 p-4">
              <HighlightLink url={GH_LINK} noUnderline>
                <GithubIcon />
              </HighlightLink>
              <HighlightLink url={FACEBOOK_PROFILE} noUnderline>
                <FacebookIcon2 />
              </HighlightLink>
              <HighlightLink url={LINKEDIN_PROFILE} noUnderline>
                <LinkedinIcon />
              </HighlightLink>
              <HighlightLink url={YOUTUBE_PROFILE} noUnderline>
                <YoutubeIcon />
              </HighlightLink>
            </div>
          </div>
          <div className="flexcentercol typo-4sm p-4 text-center text-violet-300/70">
            <span>© Copyright 2022. All Rights Reserved.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
