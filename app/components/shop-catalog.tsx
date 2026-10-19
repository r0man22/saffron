"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { findFamily, findVariant, shopFamilies, shopVariants, selectionPrice, shopSettings, validWeight } from "../../lib/shop-catalog.mjs";
import { familyIndex, gramLabel, money, rangeLabel, type ShopCopy } from "../../lib/shop-copy";
import type { Locale } from "../../lib/i18n";
import { useBag } from "./site-shell";
import { LinkArrow } from "./button";

export function ShopCatalog({ locale, copy }: { locale: Locale; copy: ShopCopy }) {
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("everyday");
  const [weight, setWeight] = useState("2");
  const dialog = useRef<HTMLDialogElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);
  const bag = useBag();
  const selected = findVariant(selectedId)!;
  const selectedIndex = shopVariants.findIndex(variant => variant.id === selectedId);
  const family = findFamily(selected.family)!;
  const grams = weight.trim() ? Number(weight) : NaN;
  const valid = validWeight(family.id, grams) && selectionPrice(grams) > 0;
  const visible = filter === "all" ? shopVariants : shopVariants.filter(variant => variant.family === filter);
  const choices = shopVariants.filter(variant => variant.family === family.id);

  const openVariant = useCallback((id: string) => {
    const variant = findVariant(id);
    if (!variant) return;
    setSelectedId(id); setWeight(String(findFamily(variant.family)!.defaultGrams));
    weightInput.current?.setCustomValidity("");
    if (!dialog.current?.open) dialog.current?.showModal();
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${id}`);
  }, []);
  useEffect(() => {
    const sync = () => { const id = window.location.hash.slice(1); if (findVariant(id)) openVariant(id); };
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [openVariant]);
  function close() { dialog.current?.close(); }
  function closed() {
    if (findVariant(window.location.hash.slice(1))) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  }
  function chooseVariant(id: string) {
    setSelectedId(id);
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${id}`);
  }

  return <section id="shop-collection" className="shop-collection" aria-labelledby="shop-collection-heading">
    <div className="shop-collection-heading"><div><p className="shop-eyebrow">01—04 / ROFRAN</p><h2 id="shop-collection-heading">{copy.collection}</h2></div><p>{copy.collectionIntro}</p></div>
    <div className="shop-toolbar"><div className="shop-filters" role="group" aria-label={copy.guideTitle}><button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>{copy.all}</button>{shopFamilies.map(family => <button key={family.id} type="button" aria-pressed={filter === family.id} onClick={() => setFilter(family.id)}><bdi>{rangeLabel(locale, family.id)}</bdi></button>)}</div><p className="shop-result-count" aria-live="polite">{String(visible.length).padStart(2, "0")} <span>/ 07</span></p></div>
    <div className="shop-product-grid">{visible.map(variant => {
      const i = shopVariants.findIndex(v => v.id === variant.id);
      const f = findFamily(variant.family)!;
      const fi = familyIndex(f.id);
      return <article key={variant.id} id={variant.id} className="shop-product-card">
        <button className="shop-product-visual" type="button" onClick={() => openVariant(variant.id)} aria-label={`${copy.choose}: ${copy.variants[i]}`} aria-haspopup="dialog"><span className="shop-card-range"><bdi>{rangeLabel(locale, f.id)}</bdi></span><Image src={variant.image} alt={`${copy.variants[i]} — ${copy.contents[i]}`} width={1254} height={1254} loading={variant.id === "bloom" ? "eager" : "lazy"} sizes="(max-width: 620px) 90vw, (max-width: 1050px) 44vw, 29vw" /><span className="shop-card-plus" aria-hidden="true">+</span></button>
        <div className="shop-card-copy"><p className="shop-eyebrow">{copy.families[fi]}</p><h3>{copy.variants[i]}</h3><p className="shop-card-description">{copy.descriptions[fi]}</p><div className="shop-card-bottom"><p><span>{copy.from}</span> <strong><bdi>{money(locale, selectionPrice(f.min))}</bdi></strong></p><button type="button" onClick={() => openVariant(variant.id)} aria-haspopup="dialog">{copy.choose}<LinkArrow /></button></div></div>
      </article>;
    })}</div>
    <dialog ref={dialog} className="shop-dialog" aria-labelledby="shop-dialog-title" onClose={closed} onClick={event => { if (event.target === dialog.current) close(); }}>
      <div className="shop-dialog-layout"><button className="shop-dialog-close" type="button" onClick={close} aria-label={copy.close}><span aria-hidden="true">×</span></button>
        <div className="shop-dialog-image"><Image src={selected.image} alt={`${copy.variants[selectedIndex]} — ${copy.contents[selectedIndex]}`} width={1254} height={1254} sizes="(max-width: 760px) 90vw, 50vw" /></div>
        <form className="shop-configurator" onSubmit={event => {
          event.preventDefault();
          if (!valid || bag.count >= shopSettings.maxBagSets) { weightInput.current?.reportValidity(); return; }
          close(); bag.addSelection(selected.id, grams);
        }}>
          <p className="shop-eyebrow">ROFRAN / <bdi>{rangeLabel(locale, family.id)}</bdi></p>
          <h2 id="shop-dialog-title">{copy.variants[selectedIndex]}</h2><p className="shop-config-description">{copy.descriptions[familyIndex(family.id)]}</p>
          {choices.length > 1 && <fieldset className="shop-variant-choices"><legend>{copy.gift}</legend>{choices.map(choice => <button key={choice.id} type="button" aria-pressed={choice.id === selectedId} onClick={() => chooseVariant(choice.id)}>{copy.variants[shopVariants.findIndex(v => v.id === choice.id)]}</button>)}</fieldset>}
          <fieldset className="shop-weight-choices"><legend>{copy.weight} <bdi>{rangeLabel(locale, family.id)}</bdi></legend><div className="shop-weight-presets">{family.presets.map(amount => <button key={amount} type="button" aria-pressed={grams === amount} onClick={() => { setWeight(String(amount)); weightInput.current?.setCustomValidity(""); }}>{gramLabel(locale, amount)}</button>)}</div><label className="shop-custom-weight" htmlFor="shop-weight"><span>{copy.customWeight}</span><span className="shop-weight-input"><input id="shop-weight" ref={weightInput} type="number" inputMode="numeric" step="1" min={family.min} max={family.max ?? undefined} required value={weight} onChange={event => { event.currentTarget.setCustomValidity(""); setWeight(event.target.value); }} onInvalid={event => event.currentTarget.setCustomValidity(copy.invalid)} aria-describedby={!valid ? "shop-weight-error" : undefined} /><span>g</span></span></label>{!valid && <p id="shop-weight-error" className="shop-weight-error" role="alert">{copy.invalid}</p>}</fieldset>
          <div className="shop-included"><p>{copy.inside}</p><ul>{copy.contents[selectedIndex].split(" · ").map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="shop-config-price" aria-live="polite"><div><span>{copy.total}</span><small><bdi>{money(locale, shopSettings.pricePerGram)}</bdi> {copy.perGram}</small></div><strong><bdi>{valid ? money(locale, selectionPrice(grams)) : "—"}</bdi></strong></div>
          <button className="shop-button shop-button-primary shop-config-add" type="submit" disabled={!valid || bag.count >= shopSettings.maxBagSets}>{copy.add}<LinkArrow /></button>
          <p className="shop-availability">{bag.count >= shopSettings.maxBagSets ? copy.limit : copy.availability}</p>
        </form>
      </div>
    </dialog>
  </section>;
}
