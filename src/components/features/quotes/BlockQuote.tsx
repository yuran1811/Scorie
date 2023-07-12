import { DivProps } from '@/shared';
import { useStore } from '@/store';
import { appThemes, getStepId, randomInArray } from '@/utils';
import { QuoteIcon, ShuffleIcon } from '@cpns/icons';
import { Tooltip } from '@cpns/shared';
import { StepType } from '@reactour/tour';
import { FC } from 'react';
import { BlockQuoteSkeleton } from './BlockQuoteSkeleton';
import { FetchQuoteButton, NextQuoteButton, PrevQuoteButton } from './QuoteButton';
import { BlockQuoteTour } from './Tour/BlockQuoteTour';
import { ButtonTour } from './Tour/ButtonTour';

export const quoteSteps: StepType[] = [
  {
    selector: '[data-tour="quote-step-1"]',
    content: <BlockQuoteTour />,
    position: 'bottom',
  },
  {
    selector: '[data-tour="quote-step-2"]',
    content: <ButtonTour />,
    position: 'left',
  },
];

export const BlockQuote: FC<DivProps> = () => {
  const quotes = useStore((s) => s.quotes);
  const setQuotes = useStore((s) => s.setQuotes);

  const { data, loading, numPage, quoteIdx, isFetch } = quotes;

  const { item } = randomInArray(Object.entries(appThemes));
  const { bg, color, secondary } = item[1];

  const step = getStepId('quote-step');

  if (!data.length) return <></>;

  return (
    <>
      {loading || isFetch ? (
        <BlockQuoteSkeleton />
      ) : (
        <blockquote
          data-tour={step(1)}
          className="relative mx-auto w-full rounded-[2rem] border-b-2 p-4 lgmb:max-w-[68rem] lgmb:p-12 lgmb:pb-8"
          style={{ backgroundColor: `${bg}85`, color: `${color}`, borderColor: `${color}80` }}
        >
          <QuoteIcon
            className="absolute block lgmb:left-8 lgmb:top-8 lgmb:scale-125 lgtab:left-12 lgtab:top-12 lgtab:scale-150"
            width="32"
            height="32"
            fill={secondary}
          />

          <div className="flexcentercol relative mt-10 gap-4 p-6 lgmb:p-8">
            <p className="indent-8 text-[1.9rem] lgmb:indent-12 lgmb:text-[2.4rem]" style={{ color }}>
              {data[quoteIdx]?.content || ''}
            </p>

            <p className="text-center text-[2rem] font-semibold italic lgmb:text-[2.5rem]" style={{ color: `${color}90` }}>
              {`- ${data[quoteIdx]?.author} -` || ''}
            </p>
          </div>

          <div
            className="flexcenter absolute -bottom-[5.85rem] left-1/2 w-[82%] min-w-[20.5rem] -translate-x-1/2 !justify-around gap-4 rounded-b-[2rem] border-2 bg-zinc-800 p-4 medmb:min-w-[23rem] lgmb:-bottom-16 lgmb:w-[40%] medtab:rounded-[2rem]"
            style={{ backgroundColor: bg, borderColor: `${color}80` }}
          >
            <PrevQuoteButton
              disabled={!(quoteIdx > 0)}
              onClick={() => {
                if (loading) return;
                setQuotes({ ...quotes, quoteIdx: quoteIdx - +(quoteIdx > 0) });
              }}
            />

            <NextQuoteButton
              disabled={!(quoteIdx + 1 < data.length)}
              onClick={() => {
                if (loading) return;
                setQuotes({ ...quotes, quoteIdx: quoteIdx + +(quoteIdx + 1 < data.length) });
              }}
            />

            {quoteIdx === data.length - 1 && (
              <FetchQuoteButton
                onClick={() => {
                  setQuotes({
                    ...quotes,
                    isFetch: quoteIdx >= data.length - 1,
                    numPage: numPage + +(quoteIdx >= data.length - 1),
                  });
                }}
              />
            )}

            <div data-tour={step(2)} className="cursor-pointer">
              <Tooltip content="Shuffle">
                <ShuffleIcon
                  width="35"
                  height="35"
                  onClick={() => setQuotes({ ...quotes, quoteIdx: Math.floor(Math.random() * quotes.data.length) })}
                />
              </Tooltip>
            </div>
          </div>
        </blockquote>
      )}
    </>
  );
};
