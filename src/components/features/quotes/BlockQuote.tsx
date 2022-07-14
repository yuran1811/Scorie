import { useStore } from 'store';
import { DivProps } from 'shared';
import { QuoteIcon } from 'components/icons';
import { BlockQuoteSkeleton } from './BlockQuoteSkeleton';
import { FetchQuoteButton, NextQuoteButton, PrevQuoteButton } from './QuoteButton';
import { FC } from 'react';
import { appThemes, randomInArray } from 'utils';

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
					className='relative mx-auto max-w-[68rem] p-12 rounded-[2rem]'
					style={{
						background: bg,
					}}
				>
					<QuoteIcon className='absolute top-[2rem] left-[2rem]' width='80' height='80' fill={secondary} />

					<div className='relative p-8'>
						<p className='text-[2.2rem] tablet:text-[3rem]' style={{ color }}>
							{data[quoteIdx]?.content || ''}
						</p>
					</div>

					<div className='flex flex-wrap items-center justify-between'>
						<footer className='mt-2 p-8 w-[calc(100%-10rem)]'>
							<p
								className='font-semibold text-[1.8rem] tablet:text-[2.4rem]'
								style={{ color: secondary }}
							>
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
					</div>
				</blockquote>
			)}
		</>
	);
};
