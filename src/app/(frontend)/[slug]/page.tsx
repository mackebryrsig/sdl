import { draftMode } from "next/headers"
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { queryPageBySlug } from "@/lib/payload-helpers"
import RichText from "@/components/richtext"

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
	params: Promise<{ slug?: string}>
}

const Page = async ({ params: paramsPromise }: Args) => {
	const { isEnabled: draft } = await draftMode()
	const { slug = "home" } = await paramsPromise;
	const url = `/${slug}`;

	const page = await queryPageBySlug({
		slug
	})

	const { content } = page

	return(
		<section className="flex w-full max-w-[1200px] mx-auto my-12">
			<article className="w-3/4">
				{ content &&
					<RichText data={content} />
				}
			</article>
			<aside></aside>
		</section>
	)
}

export default Page