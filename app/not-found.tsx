import Link from "next/link";
import { ButtonInner } from "./components/button";
import { Lines } from "./components/motion";
export default function NotFound() {
  return <main id="main-content" className="not-found"><p className="eyebrow">404 / A DIFFERENT PATH</p><h1><Lines lines={["Let’s find your", <em key="w">way back.</em>]} /></h1><p>This page is not part of our story.</p><Link href="/" className="button button-gold"><ButtonInner>Return to ROFRAN</ButtonInner></Link></main>;
}
