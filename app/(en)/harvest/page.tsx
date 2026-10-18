import { HarvestPage, harvestMetadata } from "../../components/pages/harvest-page";

export const generateMetadata = () => harvestMetadata("en");

export default function Page() {
  return <HarvestPage locale="en" />;
}
