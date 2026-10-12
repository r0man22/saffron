"use client";
import { useState } from "react";
const pictures = [{ file: "product", alt: "Saffron in a clear glass jar with a gold lid" }, { file: "saffron", alt: "A closer look at red saffron threads" }, { file: "flower", alt: "Violet saffron flower in a field at sunset" }];
export function ProductGallery() {
  const [selected, setSelected] = useState(0);
  return <div className="product-gallery"><img className="product-main-photo" src={`/media/${pictures[selected].file}.webp`} alt={pictures[selected].alt} width="1920" height="1080" fetchPriority="high" /><div className="gallery-thumbs" aria-label="Product photographs">{pictures.map((photo, i) => <button key={photo.file} onClick={() => setSelected(i)} aria-label={`View ${photo.alt.toLowerCase()}`} aria-pressed={selected === i}><img src={`/media/${photo.file}.webp`} alt="" width="88" height="68"/></button>)}</div></div>;
}
