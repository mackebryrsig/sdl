import { cn } from '@/lib/utils'
import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

type NodeTypes = DefaultNodeTypes

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => (
    <p className="mb-4 text-base text-gray-800">{nodesToJSX({ nodes: node.children })}</p>
  ),
  ul: ({ node, nodesToJSX }) => (
    <ul className="list-disc ml-6 mb-2">{nodesToJSX({ nodes: node.children })}</ul>
  ),
  ol: ({ node, nodesToJSX }) => (
    <ol className="list-decimal ml-6 mb-2">{nodesToJSX({ nodes: node.children })}</ol>
  ),
  li: ({ node, nodesToJSX }) => (
    <li className="mb-1">{nodesToJSX({ nodes: node.children })}</li>
  ),
  a: ({ node, nodesToJSX }) => (
    <a
      href={node.fields?.url || node.url}
      className="text-blue-600 underline hover:text-blue-800"
      target={node.fields?.newTab ? "_blank" : undefined}
      rel={node.fields?.newTab ? "noopener noreferrer" : undefined}
    >
      {nodesToJSX({ nodes: node.children })}
    </a>
  ),
  heading: ({ node, nodesToJSX }) => {
    const tag = node.tag || "h1";
    const classMap: Record<string, string> = {
      h1: "text-3xl font-bold mb-4",
      h2: "text-2xl font-semibold mb-3",
      h3: "text-xl font-semibold mb-2",
      h4: "text-lg font-semibold mb-2",
      h5: "text-base font-semibold mb-2",
      h6: "text-sm font-semibold mb-2",
    };
    const Tag = tag as keyof React.JSX.IntrinsicElements;
    return <Tag className={classMap[tag] || ""}>{nodesToJSX({ nodes: node.children })}</Tag>;
  },
})

type Props = {
	data: DefaultTypedEditorState
} & React.HTMLAttributes<HTMLDivElement>

const RichText = (props: Props) => {
	const { className, ...rest } = props

	return(
		<ConvertRichText
			converters={jsxConverters}
			className={cn(className)}
			{...rest}
		/>
	)
};

export default RichText