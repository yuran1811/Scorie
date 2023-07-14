export * from './defaults';
export * from './links';
export * from './locales';

export const NOTE_RULE = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Normal text

## Blank line

Add \`&nbsp;\` to the new line to render blank line

\`\`\`

# Hello
&nbsp;
There

\`\`\`

## Horizontal Rules
___
---
***

## Typographic replacements

(c) (C) (r) (R) (tm) (TM) +-

will be render as

© © ® ® ™ ™ ±

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

## Lists

#### Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

#### Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

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

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data |
| engine | engine to be used for processing |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data |
| engine | engine to be used for processing |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica

## Images

#### Type 1:
![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

<img src="https://octodex.github.com/images/minion.png" width="60" height="auto">
<img src="https://octodex.github.com/images/stormtroopocat.jpg" width="80" height="auto" alt="The Stormtroopocat">

#### Type 2:
Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
`;
