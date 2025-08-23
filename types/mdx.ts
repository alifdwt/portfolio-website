import { ReactNode, HTMLAttributes, ImgHTMLAttributes } from "react";

export interface MDXHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface MDXParagraphProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export interface MDXListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children: ReactNode;
}

export interface MDXListItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

export interface MDXLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: ReactNode;
}

export interface MDXCodeProps extends HTMLAttributes<HTMLElement> {
  children: string;
  className?: string;
  language?: string;
}

export interface MDXPreProps extends HTMLAttributes<HTMLPreElement> {
  children: ReactNode;
}

export interface MDXBlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
}

export interface MDXTableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export interface MDXTableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface MDXTableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface MDXTableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export interface MDXTableHeaderProps
  extends HTMLAttributes<HTMLTableHeaderCellElement> {
  children: ReactNode;
}

export interface MDXTableDataProps
  extends HTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode;
}

export interface MDXImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

// export interface MDXHorizontalRuleProps extends HTMLAttributes<HTMLHRElement> {}

export interface MDXStrongProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export interface MDXEmphasisProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}
