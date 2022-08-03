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
          className="relative mx-auto max-w-[68rem] rounded-[2rem] p-12"
          style={{ background: bg }}
        >
          <QuoteIcon
            className="absolute top-8 left-8 sm:top-12 sm:left-12 sm:scale-125"
            width="50"
            height="50"
            fill={secondary}
          />
          <div className="relative p-6 sm:p-8">
            <p
              className="mt-10 indent-8 text-[2.2rem] tablet:text-[2.8rem] sm:indent-12"
              style={{ color }}
            >
              {data[quoteIdx]?.content || ''}
            </p>
          </div>
          <div className="flex flex-col flex-wrap items-center justify-center smallmb:flex-row smallmb:justify-between">
            <footer className="w-full px-0 pb-6 smallmb:w-[calc(100%-10rem)] smallmb:px-8 smallmb:py-0">
              <p
                className="text-center text-[2rem] font-semibold smallmb:text-left tablet:text-[2.5rem]"
                style={{ color: secondary }}
              >
                {data[quoteIdx]?.author || ''}
              </p>
            </footer>

            <div className="flexcenter">
              {quoteIdx > 0 && (
                <PrevQuoteButton
                  onClick={() => {
                    if (loading) return;
                    setQuotes({ ...quotes, quoteIdx: quoteIdx - +(quoteIdx > 0) });
                  }}
                />
              )}

              {quoteIdx + 1 < data.length && (
                <NextQuoteButton
                  onClick={() => {
                    if (loading) return;
                    setQuotes({ ...quotes, quoteIdx: quoteIdx + +(quoteIdx + 1 < data.length) });
                  }}
                />
              )}

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
            </div>
          </div>

          <div data-tour={step(2)} className="absolute top-12 right-20 cursor-pointer">
            <Tooltip content="Shuffle">
              <ShuffleIcon
                width="45"
                height="45"
                onClick={() =>
                  setQuotes({ ...quotes, quoteIdx: Math.floor(Math.random() * quotes.data.length) })
                }
              />
            </Tooltip>
          </div>
        </blockquote>
      )}
    </>
  );
};
