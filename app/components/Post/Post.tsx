import parse from "html-react-parser";
import DOMPurify from "dompurify";

export const Post = ({ content }: { content: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(content);

  return <div>{parse(sanitizedHtml)}</div>;
};
