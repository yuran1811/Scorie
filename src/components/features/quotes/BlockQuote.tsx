import { DivProps } from '@/shared';
import { useStore } from '@/store';
import { appThemes, randomInArray } from '@/utils';
import { QuoteIcon } from '@cpns/icons';
import { BlockQuoteSkeleton } from './BlockQuoteSkeleton';
import { FetchQuoteButton, NextQuoteButton, PrevQuoteButton } from './QuoteButton';
import { FC } from 'react';

export const BlockQuote: FC<DivProps> = () => {
  const quotes = useStore((s) => s.quotes);
  const setQuotes = useStore((s) => s.setQuotes);

  const { data, loading, numPage, quoteIdx, isFetch } = quotes;

  const { bg, color, secondary } = randomInArray(Object.entries(appThemes))[1];

  if (!data.length) return <></>;

  return (
    <>
      {loading || isFetch ? (
        <BlockQuoteSkeleton />
      ) : (
        <blockquote
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

          <div className="flex flex-wrap items-center justify-between">
            <footer className="w-[calc(100%-10rem)] px-8">
              <p
                className="text-[1.8rem] font-semibold tablet:text-[2.4rem]"
                style={{ color: secondary }}
              >
                {data[quoteIdx]?.author || ''}
              </p>
            </footer>

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
        </blockquote>
      )}
    </>
  );
};
