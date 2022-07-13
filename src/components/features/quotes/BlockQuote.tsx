import { useStore } from 'store';
import { DivProps } from 'shared';
import { QuoteIcon } from 'components/icons';
import { BlockQuoteSkeleton } from './BlockQuoteSkeleton';
import { FetchQuoteButton, NextQuoteButton, PrevQuoteButton } from './QuoteButton';
import { FC } from 'react';

export const BlockQuote: FC<DivProps> = () => {
	const quotes = useStore((s) => s.quotes);
	const setQuotes = useStore((s) => s.setQuotes);

	const { data, loading, numPage, quoteIdx, isFetch } = quotes;

	if (!data.length) return <></>;

	return (
		<>
			{loading || isFetch ? (
				<BlockQuoteSkeleton />
			) : (
				<blockquote className='relative mx-auto max-w-[68rem] bg-gray-800 p-12 rounded-[2rem]'>
					<QuoteIcon className='absolute top-[2rem] left-[2rem] text-gray-700' width='80' height='80' />

					<div className='relative p-8'>
						<p className='text-[2.2rem] tablet:text-[3rem] text-white'>{data[quoteIdx]?.content || ''}</p>
					</div>

					<footer className='mt-2 p-8'>
						<p className='font-semibold text-[1.8rem] tablet:text-[2.4rem] text-gray-400'>
							{data[quoteIdx]?.author || ''}
						</p>
					</footer>

					{quoteIdx > 0 && (
						<PrevQuoteButton
							onClick={() => {
								if (loading) return;

								setQuotes({
									...quotes,
									quoteIdx: quoteIdx - +(quoteIdx > 0),
								});
							}}
						/>
					)}

					{quoteIdx + 1 < data.length && (
						<NextQuoteButton
							onClick={() => {
								if (loading) return;

								setQuotes({
									...quotes,
									quoteIdx: quoteIdx + +(quoteIdx + 1 < data.length),
								});
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
				</blockquote>
			)}
		</>
	);
};
