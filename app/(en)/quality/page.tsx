import { ResourcePage, resourceMetadata } from "../../components/pages/resource-page";
export const generateMetadata = () => resourceMetadata("en", "quality");
export default function Page() { return <ResourcePage locale="en" slug="quality" />; }
