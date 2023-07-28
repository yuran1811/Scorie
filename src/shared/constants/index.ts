import { TourProps } from '@reactour/tour';

export * from './defaults';
export * from './links';
export * from './locales';

export const tourStyles: Pick<TourProps, 'styles'> = {
  styles: {
    close: (base) => ({ ...base, transform: 'scale(1.5)' }),
    badge: (base) => ({ ...base, fontSize: '2rem' }),
  },
};

export const NOTE_RULE = `# Heading 1 {#note-rule_heading1}
## Heading 2 {#note-rule_heading2}
### Heading 3 {#note-rule_heading3}
#### Heading 4 {#note-rule_heading4}
##### Heading 5 {#note-rule_heading5}
###### Heading 6 {#note-rule_heading6}

Normal text

---
***Table of contents***

[[toc]]

---

## Blank line {#note-rule_blank}

Add \`&nbsp;\` (non-breaking space) to the new line to render blank line

&nbsp;

\`\`\`

# Hello
&nbsp;
There

\`\`\`

## Horizontal Rules {#note-rule_hor}
___
---
***

## Typographic replacements {#note-rule_typo}

(c) (C) (r) (R) (tm) (TM) +-

will be render as

© © ® ® ™ ™ ±

## Attributes {#note-rule_attr}

{id="" class="" target="" width="" height=""}

## Emphasis {#note-rule_emphasize}

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strike through~~

This is ^sup^, like 1^st^

This is ~sub~, like H~2~O

## Footnote {#note-rule_footnote}

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

Here is an inline note.^[Inlines notes are easier to write, since
  you don't have to pick an identifier and move down to type the
  note.]

## Blockquotes {#note-rule_block}

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

## Lists {#note-rule_lists}

### Unordered {#note-rule_unorderedlists}

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

### Ordered {#note-rule_orderedlists}

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar

## Code {#note-rule_code}

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

\`\`\`

Sample text here...

\`\`\`

## Tables {#note-rule_tables}

| Option | Description |
| ------ | ----------- |
| data   | aaaaaaaaa   |
| engine | aaaaaaaaaaa |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | aaaaaaaaa   |
| engine | aaaaaaaaaaa |

## Links {#note-rule_links}

[just a link](https://google.com)

[link with title](https://google.com "title: google")

Auto-converted link https://google.com

## Images {#note-rule_imgs}

### Type 1 {#note-rule_imgstype1}
![bg](/bg-blur.jpg)
![qrcode](/QRCode.PNG "The qrcode")

#### Responsive {#note-rule_imgsresponsive}
![bg](/bg-blur.jpg){width="60" height="auto"}
![qrcode](/QRCode.PNG "The qrcode"){width="70" height="auto"}

<img src="/bg-blur.jpg" width="60" height="auto">
<img src="/QRCode.PNG" width="70" height="auto" alt="The qrcode">

### Type 2 {#note-rule_type2}
Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: /bg-blur.jpg "bg"`;
