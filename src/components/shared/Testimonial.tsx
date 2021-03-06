import { getUserProfile, upvoteFeedback } from '@/services';
import { useStore } from '@/store';
import { UpvoteIcon } from '@cpns/icons';
import { TestimonialProps } from '@shared/types';
import { User } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { Avatar } from './Avatar';
import { Tooltip } from './Tooltip';

export const Testimonial: FC<{ data: TestimonialProps }> = ({
  data: { content, name, id, votes, job = '' },
}) => {
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
    <div className="relative mx-4 my-6 flex min-w-[25rem] max-w-xl flex-col shadow-lg">
      <div className="rounded-t-lg bg-gray-900 px-4 py-12 sm:px-8 md:px-12">
        <p className="relative px-6 py-4 text-center italic text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="h-8 w-8 text-violet-400"
          >
            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
          </svg>

          {content}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="ml-auto h-8 w-8 text-violet-400"
          >
            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
          </svg>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-b-lg bg-violet-400 p-8 text-gray-900">
        <Avatar className="mb-2 -mt-20" imgUrl={testimonialImg} radius="6rem" />
        <p className="w-full px-20 text-center font-semibold leading-tight">{name}</p>
        <p className="w-full px-20 text-center text-[2rem] uppercase">{job}</p>
      </div>
      <div className="absolute bottom-12 right-8 cursor-pointer">
        <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-violet-800 text-center text-[2rem]">
          {votes?.length ? (votes.length > 99 ? '99+' : votes.length) : 0}
        </div>

        <Tooltip content="Upvote">
          <UpvoteIcon
            active={voteStatus()}
            width="40"
            height="40"
            fill="#5b21b6"
            onClick={() => upvoteHandle()}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export const FeatureTestimonial: FC<TestimonialProps> = ({ content, name, job = '' }) => (
  <section className="mx-auto my-24 w-max max-w-[80%] rounded-[2rem] border-4 border-violet-700 bg-gray-800 p-8 text-gray-100">
    <div className="container relative mx-auto flex flex-col items-center space-y-6 p-4 md:p-8">
      <div className="absolute -top-24 mx-auto w-max bg-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="h-32 w-32 text-violet-400"
        >
          <polygon points="328.375 384 332.073 458.999 256.211 406.28 179.924 459.049 183.625 384 151.586 384 146.064 496 182.756 496 256.169 445.22 329.242 496 365.936 496 360.414 384 328.375 384"></polygon>
          <path d="M415.409,154.914l-2.194-48.054L372.7,80.933,346.768,40.414l-48.055-2.2L256,16.093,213.287,38.219l-48.055,2.2L139.3,80.933,98.785,106.86l-2.194,48.054L74.464,197.628l22.127,42.715,2.2,48.053L139.3,314.323l25.928,40.52,48.055,2.195L256,379.164l42.713-22.126,48.055-2.195,25.928-40.52L413.214,288.4l2.195-48.053,22.127-42.715Zm-31.646,76.949L382,270.377l-32.475,20.78-20.78,32.475-38.515,1.76L256,343.125l-34.234-17.733-38.515-1.76-20.78-32.475L130,270.377l-1.759-38.514L110.5,197.628,128.237,163.4,130,124.88,162.471,104.1l20.78-32.474,38.515-1.76L256,52.132l34.234,17.733,38.515,1.76,20.78,32.474L382,124.88l1.759,38.515L401.5,197.628Z"></path>
        </svg>
      </div>

      <p className="px-6 py-2 text-center text-[3rem] font-semibold text-gray-300 sm:text-[3.5rem] sm:font-bold md:text-[4rem] lg:max-w-2xl xl:max-w-4xl">
        "{content}"
      </p>
      <div className="flexcentercol space-x-3 sm:flex-row">
        <Avatar className="rounded-full bg-gray-700 bg-cover bg-center" imgUrl="" radius="6rem" />
        <div className="p-4">
          <p className="text-center leading-tight sm:text-left">{name}</p>
          <p className="text-center text-[2.5rem] leading-tight text-gray-300 sm:text-left">
            {job}
          </p>
        </div>
      </div>
    </div>
  </section>
);
