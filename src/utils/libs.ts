import MarkdownIt from 'markdown-it';

export const mdConvert = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
});
