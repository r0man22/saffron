"use client";
import Image from "next/image";

import { useState } from "react";
import { useLocale } from "./locale-provider";
const files = ["product", "saffron", "flower"];
export function ProductGallery() {
  const [selected, setSelected] = useState(0);
  const { t } = useLocale();
  return <div className="product-gallery"><Image sizes="(max-width: 760px) 90vw, 45vw" className="product-main-photo" src={`/media/${files[selected]}.webp`} alt={t.images.gallery[selected]} width={1920} height={1080} fetchPriority="high" /><div className="gallery-thumbs" aria-label={t.product.gallery}>{files.map((file, i) => <button key={file} onClick={() => setSelected(i)} aria-label={`${t.product.view}: ${t.images.gallery[i]}`} aria-pressed={selected === i}><Image sizes="88px" src={`/media/${file}.webp`} alt="" width={88} height={68} /></button>)}</div></div>;
}
