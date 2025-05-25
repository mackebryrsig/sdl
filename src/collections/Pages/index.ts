import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/lib/generatePreviewPath'
import type { CollectionConfig } from 'payload'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
	slug: 'pages',
	access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
	admin: {
		useAsTitle: 'title',
		defaultColumns: ["title", "slug", "updatedAt"],
		livePreview: {
			url: ({ data, req }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === "string" ? data.slug : "",
					collection: "pages",
					req
				})

				return path
			},
		},
		preview: (data, { req }) => generatePreviewPath({
			slug: typeof data?.slug === "string" ? data.slug : "",
			collection: "pages",
			req
		}),
	},
	defaultPopulate: {
		title: true,
		slug: true
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true
		},
		{
			name: "content",
			type: "richText",
			editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
		},
		{
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
		...slugField()
	],
	hooks: {
		afterChange: [revalidatePage],
		beforeChange: [populatePublishedAt],
		afterDelete: [revalidateDelete]
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100
			},
			schedulePublish: true
		},
		maxPerDoc: 50
	}
}