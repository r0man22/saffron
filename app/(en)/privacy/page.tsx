import { ResourcePage, resourceMetadata } from "../../components/pages/resource-page";
export const generateMetadata = () => resourceMetadata("en", "privacy");
export default function Page() { return <ResourcePage locale="en" slug="privacy" />; }
