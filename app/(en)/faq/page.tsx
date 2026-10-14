import { FaqPage, faqMetadata } from "../../components/pages/faq-page";
export const generateMetadata = () => faqMetadata("en");
export default function Page() { return <FaqPage locale="en" />; }
