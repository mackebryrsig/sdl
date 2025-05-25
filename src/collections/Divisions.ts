import type { CollectionConfig } from 'payload'

export const Divisions: CollectionConfig = {
	slug: 'divisions',
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: "title",
			type: "text"
		}
	],
}