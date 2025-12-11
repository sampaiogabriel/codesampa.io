import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { defineConfig, defineCollection, s } from 'velite';

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.path(),
      date: s.isodate(),
      description: s.string().max(999).optional(),
      published: s.boolean().default(true),
      comments: s.boolean().default(true),
      tags: s.array(s.string()).default([]),
      content: s.mdx()
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split('/').slice(2).join('/'),
      locale: data.slug.split('/')[1]
    }))
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: false
        }
      ]
    ]
  }
});
