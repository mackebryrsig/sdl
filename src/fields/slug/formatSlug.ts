import type { FieldHook } from "payload"

const formatSlug = (val: string) =>
	val
		.replace(/å|ä/gi, "a")
		.replace(/ö/gi, "o")
		.replace(/ /g, "-")
		.replace(/[^ 0-9a-zA-Z_-]/g, "")
		.toLowerCase();


const formatSlugHook = (fallback: string): FieldHook => ({ data, operation, value }) => {

	if( typeof value === "string" ) return formatSlug(value)

	if(operation === "create" || !data?.slug) {
		const fallbackData = data?.[fallback] || data?.[fallback]

		if(fallbackData && typeof fallbackData === "string") {
			return formatSlug(fallbackData)
		}
	}

	return value
}

export { formatSlug, formatSlugHook }