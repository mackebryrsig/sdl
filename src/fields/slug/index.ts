import type { CheckboxField, TextField } from "payload";
import { formatSlugHook } from "./formatSlug";

type Overrides = {
	slugOverrides?: Partial<TextField>
	checkboxOverrides?: Partial<CheckboxField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

const slugField: Slug = (fieldToUse = "title", overrides = {}) => {
	const { slugOverrides, checkboxOverrides} = overrides

	const checkboxField: CheckboxField = {
		name: "slugLock",
		type: "checkbox",
		defaultValue: true,
		admin: {
			hidden: true,
			position: "sidebar"
		},
		...checkboxOverrides
	}

	// @ts-expect-error - ts mismatch Partial<TextField> with TextField
	const slugField: TextField = {
		name: "slug",
		type: "text",
		index: true,
		label: "Slug",
		...(slugOverrides || {}),
		hooks: {
			beforeValidate: [formatSlugHook(fieldToUse)]
		},
		admin: {
			position: "sidebar",
			...(slugOverrides?.admin || {}),
			components: {
				Field: {
					path: "@/fields/slug/SlugComponent#SlugComponent",
					clientProps: {
						fieldToUse,
						checkboxFieldPath: checkboxField.name
					}
				}
			}
		}
	}

	return [slugField, checkboxField]
}

export { slugField }