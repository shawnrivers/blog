import React from 'react';
import { DynamicComponent } from '../../components/pages/blog/DynamicComponent';

function applyTags(tags = [], children, noPTag = false, key) {
  let child = children;

  for (const tag of tags) {
    const props: { [key: string]: any } = { key };
    let tagName = tag[0];

    if (noPTag && tagName === 'p') tagName = React.Fragment;
    if (tagName === 'c') tagName = 'code';
    if (tagName === '_') {
      tagName = 'span';
      props.className = 'underline';
    }
    if (tagName === 'a') {
      props.href = tag[1];
    }
    if (tagName === 'e') {
      tagName = DynamicComponent.Equation;
      props.displayMode = false;
      child = tag[1];
    }

    child = React.createElement(
      DynamicComponent[tagName] || tagName,
      props,
      child,
    );
  }
  return child;
}

export function textBlock(
  text = [],
  noPTag = false,
  mainKey,
): React.ReactElement {
  const children = [];
  let key = 0;

  for (const textItem of text) {
    key++;
    if (textItem.length === 1) {
      children.push(textItem);
      continue;
    }
    children.push(applyTags(textItem[1], textItem[0], noPTag, key));
  }
  return React.createElement(
    noPTag ? React.Fragment : DynamicComponent.p,
    { key: mainKey },
    ...children,
    noPTag,
  );
}