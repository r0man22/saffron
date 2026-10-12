import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" className="not-found"><p className="eyebrow">404 / A DIFFERENT PATH</p><h1>Let’s find your<br /><em>way back.</em></h1><p>This page is not part of our story.</p><Link href="/" className="button button-gold">Return to ROFRAN</Link></main>;
}
