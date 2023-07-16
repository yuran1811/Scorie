declare module 'markdown-it-table-of-contents' {
  import { PluginWithOptions } from 'markdown-it';

  interface TableOfContentsOptions {
    /**
     * HTML element tag used for the table of contents container.
     * @default "div"
     */
    containerClass?: string;
    /**
     * HTML element tag used for each table of contents item.
     * @default "a"
     */
    markerClass?: string;
    /**
     * Maximum heading level (1-6) to include in the table of contents.
     * @default 6
     */
    includeLevel?: number[];
    /**
     * Prefix added to generated heading anchor IDs.
     * @default ""
     */
    slugifyPrefix?: string;
    /**
     * HTML class name added to the table of contents container.
     * @default "table-of-contents"
     */
    slugifyClassName?: string;
  }

  const toc: PluginWithOptions<TableOfContentsOptions>;
  export = toc;
}
