import MarkdownIt from 'markdown-it';
import anchorPlugin from 'markdown-it-anchor';
import attrsPlugin from 'markdown-it-attrs';
import footnotePlugin from 'markdown-it-footnote';
import linkAttrsPlugin from 'markdown-it-link-attributes';
import subPlugin from 'markdown-it-sub';
import supPlugin from 'markdown-it-sup';
import tocPlugin from 'markdown-it-table-of-contents';

const mdConvert = new MarkdownIt('default', {
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
})
  .use(anchorPlugin)
  .use(footnotePlugin)
  .use(supPlugin)
  .use(subPlugin)
  .use(tocPlugin, { includeLevel: [2, 3, 4, 5] })
  .use(attrsPlugin, {
    allowedAttributes: ['id', 'class', 'target', 'width', 'height', 'align'],
  })
  .use(linkAttrsPlugin, [
    {
      matcher: (href: string) => href.startsWith('#'),
      attrs: {},
    },
    {
      attrs: { target: '_blank', rel: 'noopener' },
    },
  ]);

export { mdConvert };
