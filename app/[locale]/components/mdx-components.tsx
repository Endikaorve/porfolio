import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./code-block";

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    // Headings con estilos editoriales
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-black text-white mt-16 mb-6 leading-tight relative">
        <span className="absolute -left-4 md:-left-6 top-0 text-[#de5e91]/30 font-mono text-lg">
          //
        </span>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-bold text-white/90 mt-8 mb-3">
        {children}
      </h4>
    ),

    // Párrafos
    p: ({ children }) => (
      <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6">
        {children}
      </p>
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[#de5e91] underline underline-offset-4 decoration-[#de5e91]/30 hover:decoration-[#de5e91] transition-all duration-200"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),

    // Listas
    ul: ({ children }) => (
      <ul className="space-y-3 mb-6 pl-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-3 mb-6 pl-4 list-decimal list-inside">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-white/80 text-lg leading-relaxed flex items-start gap-3">
        <span className="text-[#de5e91] mt-1.5 text-sm">▸</span>
        <span>{children}</span>
      </li>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="relative my-8 pl-6 py-4 border-l-4 border-[#de5e91] bg-[#de5e91]/5">
        <span className="absolute -left-3 -top-4 text-5xl text-[#de5e91]/20 font-serif">
          "
        </span>
        <div className="text-white/90 text-lg italic">{children}</div>
      </blockquote>
    ),

    // Código inline
    code: ({ className, children, ...props }) => {
      // Si tiene className, es un bloque de código
      if (className) {
        return (
          <CodeBlock className={className} {...props}>
            {children}
          </CodeBlock>
        );
      }
      // Si no, es código inline
      return (
        <code className="px-2 py-1 bg-white/10 text-[#de5e91] font-mono text-sm">
          {children}
        </code>
      );
    },

    // Bloque de código pre
    pre: ({ children }) => (
      <div className="relative my-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
          <span className="w-3 h-3 bg-white/20" />
          <span className="w-3 h-3 bg-white/10" />
          <span className="w-3 h-3 bg-white/10" />
        </div>
        <pre className="pt-12 pb-6 px-6 bg-[#0a0a0a] border border-white/10 overflow-x-auto text-sm">
          {children}
        </pre>
      </div>
    ),

    // Separadores
    hr: () => (
      <hr className="my-16 border-none h-px bg-gradient-to-r from-transparent via-[#de5e91]/30 to-transparent" />
    ),

    // Strong y em
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-white/90">{children}</em>
    ),

    // Imágenes
    img: ({ src, alt }) => (
      <figure className="my-10">
        <div className="relative border border-white/10 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || ""}
            className="w-full h-auto"
          />
        </div>
        {alt && (
          <figcaption className="mt-3 text-sm text-white/50 font-mono text-center">
            {alt}
          </figcaption>
        )}
      </figure>
    ),

    // Tablas
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b-2 border-[#de5e91]/30">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-white/10">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="text-left py-3 px-4 font-bold text-white text-sm uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="py-3 px-4 text-white/80">{children}</td>
    ),

    ...components,
  };
}

// Exportar los componentes para usar con MDXRemote
export const mdxComponents = useMDXComponents();

