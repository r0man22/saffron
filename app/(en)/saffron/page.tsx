import { SaffronPage } from "../../components/pages/saffron-page";
import { pageMetadata } from "../../../lib/page-metadata";
export const generateMetadata = () => pageMetadata("en", "saffron");
export default function Page() { return <SaffronPage locale="en" />; }
