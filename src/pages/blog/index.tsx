import * as React from 'react';
import Image from 'next/image';
import { blogMeta, BlogMeta } from '../../blogs/meta';
import { Card } from '../../components/utils/Card';
import { Page } from '../../components/utils/Page';
import { getDateString } from '../../lib/utils/date';
import { BlogTag } from '../../components/pages/blog/BlogTag';
import { GetStaticProps } from 'next';
import { sortByDate } from '../../lib/utils/sorting';

const PostCard: React.FC<BlogMeta> = props => {
  const { title, slug, date, tags, published, image } = props;

  return (
    <Card
      tag={tags[0]}
      href="/blog/[slug]"
      aria-label={title}
      as={`/blog/${slug}`}
    >
      <div>
        {image && (
          <Image
            src={image}
            width={480}
            height={320}
            alt=""
            role="presentation"
            className="placeholder object-cover"
          />
        )}
        <div className="mt-2 mb-4 mx-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {date && (
            <div className="mt-1 text-base text-gray-500 dark:text-gray-300">
              {getDateString(date)}
            </div>
          )}
          {tags.length > 0 && (
            <div className="blog-tag-group mt-2">
              {!published && <BlogTag text="draft" />}
              {tags.map(tag => (
                <BlogTag text={tag} key={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

type BlogIndexPageProps = {
  blogsMeta: BlogMeta[];
};

export const getStaticProps: GetStaticProps<BlogIndexPageProps> = async context => {
  const meta = sortByDate(
    context.preview
      ? Object.values(blogMeta)
      : Object.values(blogMeta).filter(meta => meta.published),
    'date',
  );

  return {
    props: {
      blogsMeta: meta,
    },
  };
};

const BlogIndexPage: React.FC<BlogIndexPageProps> = props => {
  const { blogsMeta } = props;

  return (
    <Page titlePre="Blog" className="max-w-6xl mx-auto px-6">
      <h1 className="visually-hidden">Blog</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 content-center items-stretch">
        {blogsMeta.map(meta => (
          <PostCard {...meta} key={meta.slug} />
        ))}
      </div>
    </Page>
  );
};

export default BlogIndexPage;
