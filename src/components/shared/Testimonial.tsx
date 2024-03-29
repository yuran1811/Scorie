import { getUserProfile, upvoteFeedback } from '@/services';
import { TestimonialProps } from '@/shared';
import { useStore } from '@/store';
import { classnames } from '@/utils';
import { UpvoteIcon } from '@cpns/icons';
import { User } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { Avatar } from './Avatar';
import { Tooltip } from './Tooltip';

export const Testimonial: FC<{ data: TestimonialProps }> = ({ data: { content, name, id, votes, job = '' } }) => {
  const settings = useStore((s) => s.settings);
  const currentUser = useStore((s) => s.currentUser);

  const [testimonialImg, setTestimonialImg] = useState('');

  const voteStatus = () => {
    if (!currentUser || !currentUser?.uid) return false;
    return votes.includes(currentUser.uid);
  };

  const upvoteHandle = () => {
    if (!id || !currentUser || !currentUser?.uid) return;
    upvoteFeedback(id, currentUser.uid, !voteStatus());
  };

  useEffect(() => {
    if (!id) return;
    getUserProfile(id).then((rawUser) => {
      const user = rawUser.data?.data() as User;
      user && user?.photoURL && setTestimonialImg(user.photoURL);
    });
  }, []);

  return (
    <div className="relative mx-4 my-6 flex w-full max-w-2xl flex-col shadow-lg">
      <div
        className={classnames(
          'rounded-t-xl border-y-2 border-violet-600 px-3 py-6 medtab:px-6 lgtab:px-8 lgtab:py-8',
          settings.glassmorphismDesign ? 'bg-gray-900/70' : 'bg-gray-900'
        )}
      >
        <div className="typo-3sm relative px-6 py-4 text-center text-gray-100">
          <svg viewBox="0 0 512 512" className="h-8 w-8 fill-current text-violet-400">
            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
          </svg>

          <p className="font-normal">{content}</p>

          <svg viewBox="0 0 512 512" className="ml-auto h-8 w-8 fill-current text-violet-400">
            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
          </svg>
        </div>
      </div>
      <div className="flexcentercol rounded-b-lg px-5">
        <Avatar className="-mt-14 mb-2" imgUrl={testimonialImg} radius="6.4rem" />
        <div className="-mt-8 grid grid-cols-2 grid-rows-1 items-center gap-32 leading-tight">
          <p className="typo-2sm line-clamp-2 w-full text-right font-semibold">@{name}</p>
          <p className="typo-3sm line-clamp-2 w-full text-left capitalize">{job}</p>
        </div>
      </div>
      <div className="absolute right-8 top-8 cursor-pointer">
        <div className="typo-2sm absolute -right-6 -top-6 h-12 w-12 scale-90 rounded-full bg-violet-800 text-center">
          {votes?.length ? (votes.length > 99 ? '99+' : votes.length) : 0}
        </div>
        <Tooltip content="Upvote">
          <UpvoteIcon active={voteStatus()} width="36" height="36" fill="#5b21b6" onClick={() => upvoteHandle()} />
        </Tooltip>
      </div>
    </div>
  );
};

export const FeatureTestimonial: FC<TestimonialProps> = ({ content, name, job = '' }) => {
  const settings = useStore((s) => s.settings);

  return (
    <section
      className={classnames(
        'mx-auto my-24 w-max max-w-[80%] rounded-[2rem] border-4 border-violet-700 p-4 text-gray-100 medmb:p-8',
        settings.glassmorphismDesign ? 'bg-gray-800/50' : 'bg-gray-800'
      )}
    >
      <div className="relative mx-auto flex flex-col items-center space-y-6 p-2 medmb:p-4 lgtab:p-8">
        <div className="absolute -top-[5.8rem] mx-auto w-max medmb:-top-[6.5rem]">
          <svg viewBox="0 0 24 24" className="h-32 w-32 fill-current text-violet-400">
            <g>
              <path
                fillRule="evenodd"
                d="M12 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0-10c-.284 0-.474.34-.854 1.023l-.098.176c-.108.194-.162.29-.246.354c-.085.064-.19.088-.4.135l-.19.044c-.738.167-1.107.25-1.195.532c-.088.283.164.577.667 1.165l.13.152c.143.167.215.25.247.354c.032.104.021.215 0 .438l-.02.203c-.076.785-.114 1.178.115 1.352c.23.174.576.015 1.267-.303l.178-.082c.197-.09.295-.135.399-.135c.104 0 .202.045.399.135l.178.082c.691.319 1.037.477 1.267.303c.23-.174.191-.567.115-1.352l-.02-.203c-.021-.223-.032-.334 0-.438c.032-.103.104-.187.247-.354l.13-.152c.503-.588.755-.882.667-1.165c-.088-.282-.457-.365-1.195-.532l-.19-.044c-.21-.047-.315-.07-.4-.135c-.084-.064-.138-.16-.246-.354l-.098-.176C12.474 6.34 12.284 6 12 6Z"
                clipRule="evenodd"
              />
              <path d="m7.093 15.941l-.379 1.382c-.628 2.292-.942 3.438-.523 4.065c.147.22.344.396.573.513c.652.332 1.66-.193 3.675-1.243c.67-.35 1.006-.524 1.362-.562a1.87 1.87 0 0 1 .398 0c.356.038.691.213 1.362.562c2.015 1.05 3.023 1.575 3.675 1.243c.229-.117.426-.293.573-.513c.42-.627.105-1.773-.523-4.065l-.379-1.382A8.461 8.461 0 0 1 12 17.5a8.46 8.46 0 0 1-4.907-1.559Z" />
            </g>
          </svg>
        </div>

        <p className="typo-semimed py-2 text-center font-semibold text-gray-300 medmb:px-6 medtab:font-bold">"{content}"</p>
        <div className="flexcentercol space-x-3 medtab:flex-row">
          <Avatar className="rounded-full bg-gray-700 bg-cover bg-center" imgUrl="" radius="6rem" />
          <div className="p-4">
            <p className="typo-sm line-clamp-2 text-center font-semibold leading-tight medtab:text-left">{name}</p>
            <p className="typo-2sm line-clamp-2 text-center leading-tight text-gray-300 medtab:text-left">{job}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
