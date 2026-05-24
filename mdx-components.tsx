import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
/* import { Prism as SyntaxHighlighter } from "react-syntax-highlighter" */
/* import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism" */
import type React from "react" // Added import for React

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) {
    return (
      <Link href={href} {...props} className="bg-foreground/10 hover:bg-foreground/20">
        {props.children}
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} className="bg-foreground/10 hover:bg-foreground/20 px-1 rounded-md" />
}

const CustomImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <Image {...(props as any)} width={720} height={480} className="rounded-lg w-full" alt={props.alt || "Image"} />
}

/* const CustomCode = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => { */
/*   const match = /language-(\w+)/.exec(className || "") */
/*   const lang = match ? match[1] : "" */
/**/
/*   return match ? ( */
/*     <SyntaxHighlighter {...props} style={atomDark} language={lang} PreTag="div" className="rounded-md" /> */
/*   ) : ( */
/*     <code className={className} {...props} /> */
/*   ) */
/* } */

const Callout = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-4">
      <div className="flex-shrink-0 mr-4">
        <svg className="h-5 w-5 mt-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return useMemo(() => {
    return {
      h1: ({ children }) => <h1 className="text-4xl font-bold leading-[2] font-pt-sans" style={{ marginBottom: 10, marginTop: 20 }}>{children} </h1>,
      h2: ({ children }) => <h2 className="group text-2xl font-semibold leading-[2] border-b border-foreground/10 font-pt-sans" style={{ marginBottom: 24, marginTop: 24 }}>{children} <span className="text-foreground/60 hover:text-foreground opacity-0 group-hover:opacity-100 font-pt-sans"><Link href="" className="ml-1" style={{ fontSize: 20 }}> #</Link></span></h2>,
      h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2  font-pt-sans opacity-90">{children}</h3>,
      h4: ({ children }) => <h4 className="text-md font-medium opacity-80 font-alef"><i>{children}</i></h4>,
      p: ({ children }) => <p className="mb-4 leading-7 font-alef">{children}</p>,
      ul: ({ children }) => <ul className="list-disc mb-4" style={{ listStyleType: "disc", paddingLeft: 20 }}>{children}</ul>,
      ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 [&::marker]:text-opacity-50 [&::marker]:text-gray-500  font-alef" style={{
        paddingLeft: 20, listStyleType: "decimal",
      }}>{children}</ol>,
      li: ({ children }) => <li className="mb-1 marker:mr-2">
        {children}
      </li>,
      blockquote: ({ children }) => (
        <blockquote className="border-foreground/20 bg-foreground/5  pl-4 py-2 italic [&>p]:mb-0 rounded-sm" style={{ borderLeftWidth: 2 }}>
          {children}
        </blockquote>
      ),
      hr: () => <hr className="hidden" />,
      a: CustomLink,
      img: CustomImage,
      /* code: CustomCode, */
      Callout,
      ...components,
    }
  }, [components])
}


