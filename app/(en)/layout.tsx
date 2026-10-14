import { RootDocument, rootMetadata, sharedViewport } from "../components/root-document";
export const viewport = sharedViewport;
export const generateMetadata = () => rootMetadata("en");
export default function Layout({ children }: { children: React.ReactNode }) { return <RootDocument locale="en">{children}</RootDocument>; }
