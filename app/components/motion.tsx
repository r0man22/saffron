import { Fragment, type CSSProperties, type ReactNode } from "react";

export function Lines({ lines }: { lines: ReactNode[] }) {
  return <>{lines.map((line, i) => <span className="line" key={i}><span>{line}{i < lines.length - 1 && " "}</span></span>)}</>;
}

function tokenize(lines: string[], letters: boolean) {
  let index = 0;
  return lines.map(line => (letters ? [...line] : line.split(" ")).map(token => ({ text: token.replaceAll("*", ""), italic: token.startsWith("*"), index: index++ })));
}
export const plainTitle = (lines: string[]) => lines.join(" ").replaceAll("*", "");
export function SplitTitle({ lines, letters = false }: { lines: string[]; letters?: boolean }) {
  const rows = tokenize(lines, letters);
  return <span aria-hidden="true">{rows.map((tokens, l) => <span className="title-line" key={l}>{tokens.map((token, k) => <Fragment key={k}>
    <span className="word" style={{ "--w": token.index } as CSSProperties}>{token.italic ? <em>{token.text}</em> : letters ? <span className="gold-glint" data-glint={token.text}>{token.text}</span> : token.text}</span>{!letters && k < tokens.length - 1 && " "}
  </Fragment>)}{l < rows.length - 1 && " "}</span>)}</span>;
}

export function TranslatedLines({ lines }: { lines: string[] }) {
  return <Lines lines={lines.map((line, index) => <Fragment key={index}>{line.split(/(\*[^*]+\*)/g).map((part, i) => part.startsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>)}</Fragment>)} />;
}
