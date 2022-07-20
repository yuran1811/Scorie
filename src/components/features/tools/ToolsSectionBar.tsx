import { ToolIcon } from '@cpns/icons/ToolIcon';
import { Title } from '../main/sections/Title';
import { ToolCard } from './ToolCard';

export const ToolsSectionBar = () => {
  return (
    <div className="w-full my-[2rem] mb-[7rem]">
      <div className="w-full flexcenter flex-wrap px-4">
        <Title Icon={ToolIcon} content="Tools" />
      </div>

      <div className="mx-auto mt-4 p-4 max-w-[100rem] w-full rounded-[2rem]">
        <div className="flex flex-wrap justify-center items-start w-full">
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
