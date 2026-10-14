import { JournalPage } from "../../components/pages/journal-page";
import { pageMetadata } from "../../../lib/page-metadata";
export const generateMetadata = () => pageMetadata("en", "journal");
export default function Page() { return <JournalPage locale="en" />; }
