import { ToolIcon } from '@cpns/icons/ToolIcon';
import { Title } from '../main/sections/Title';
import { ToolCard } from './ToolCard';

export const ToolsSectionBar = () => {
  return (
    <div className="my-[2rem] mb-[7rem] w-full">
      <div className="flexcenter w-full flex-wrap px-4">
        <Title Icon={ToolIcon} content="Tools" />
      </div>

      <div className="mx-auto mt-4 w-full max-w-[100rem] rounded-[2rem] p-4">
        <div className="flex w-full flex-wrap items-start justify-center">
          <ToolCard data={{ id: 1, name: 'Tool Card ' + 1 }} />
        </div>
      </div>

      {/* <SectionSwiper>
				{Array(5)
					.fill(0)
					.map((_, idx) => (
						<SwiperSlide key={idx}>
							<ToolCard data={{ id: idx, name: 'Tool Card ' + idx }} />
						</SwiperSlide>
					))}
			</SectionSwiper> */}
    </div>
  );
};
