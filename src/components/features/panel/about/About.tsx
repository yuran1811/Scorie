import { ArrowDownIcon, ArrowRightIcon, FacebookIcon2, GithubIcon, InfoIcon, LinkedinIcon, YoutubeIcon } from '@cpns/icons';
import { HighlightLink } from '@cpns/interfaces';
import { FACEBOOK_PROFILE, GH_LINK, LINKEDIN_PROFILE, YOUTUBE_PROFILE } from '@shared/constants';
import { FC, useState } from 'react';

const ArrowIconConfig = {
  className: '',
  width: '24',
  height: '24',
  fill: '#a5b4fc',
};

export const About: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flexcentercol w-full">
      <div className="flexcenter w-full cursor-pointer gap-8" onClick={() => setOpenModal((s) => !s)}>
        <InfoIcon className="scale-typo-sm cursor-pointer text-ctcolor" width="26" height="26" />
        <div className="typo-semimed line-clamp-1 font-bold">About</div>
        {!openModal ? <ArrowRightIcon {...ArrowIconConfig} /> : <ArrowDownIcon {...ArrowIconConfig} />}
      </div>

      {openModal && (
        <div id="about-section" className="mt-16 w-max space-y-16 border-x border-b border-ctcolor px-8">
          <div className="flexcentercol scale-95 text-[2.2rem] font-bold smmb:scale-100 medmb:scale-105 medtab:scale-110">
            <div>This </div>
            <div className="relative h-[4rem] w-[20rem] overflow-y-hidden text-ctcolor">
              {[
                { content: 'free', grad: '#12fff7,#b3ffab' },
                { content: 'modern', grad: '#fc6c8f,#ffb86c' },
                { content: 'easy-to-use', grad: '#b199f3,#e59ebc' },
              ].map((_, idx) => (
                <span
                  key={`${_.content}-${idx}`}
                  className={`textGradient absolute left-0 right-12 text-center uppercase`}
                  style={{
                    translate: idx ? '0 -7.5rem' : '',
                    animation: `upndown 3s infinite ${idx}s ease`,
                    backgroundImage: `linear-gradient(to bottom right, ${_.grad})`,
                  }}
                >
                  {_.content}
                </span>
              ))}{' '}
              <span className="absolute right-[49px]" style={{ animation: 'upndown-scale 3s infinite 1.5s ease' }}>
                app
              </span>
            </div>
            <div>will improve your</div>
            <div
              className="textGradient animate-gdMoveVert text-[2.6rem] uppercase"
              style={{
                backgroundSize: '400% 400%',
                backgroundImage: 'linear-gradient(-135deg,#2cccff,#20e3b2,#ffcc70,#c850c0,#4158d0)',
              }}
            >
              study quality
            </div>
          </div>
          <div>
            <div className="typo text-center font-bold">Contact</div>
            <div className="flexcenter mt-6 scale-150 flex-wrap gap-2">
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
          <div className="flexcentercol typo-5sm p-4 text-center text-violet-300/70">
            <span>© Copyright 2022. All Rights Reserved.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
