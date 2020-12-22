import * as React from 'react';

type TagProps = { text: string } & React.HTMLAttributes<HTMLSpanElement>;

export const Tag: React.FC<TagProps> = props => {
  const { text, ...restProps } = props;

  switch (text) {
    case 'React':
      return (
        <span
          className="blog-tag text-white bg-react-default hover:bg-react-dark"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'CSS':
      return (
        <span
          className="blog-tag text-white bg-css-default hover:bg-css-dark"
          {...restProps}
        >
          {text}
        </span>
      );
    case 'Draft':
      return (
        <span
          className="blog-tag text-white bg-draft-default hover:bg-draft-dark"
          {...restProps}
        >
          {text}
        </span>
      );

    default:
      return null;
  }
};