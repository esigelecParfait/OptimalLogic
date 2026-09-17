"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "../primitives/Button";
import styles from "./navigation.module.css";

type HeaderProps = {
  brand: string;
  homeHref: string;
  links: { label: string; href: string }[];
  account: { label: string; href: string };
};

export function SiteHeader({ brand, homeHref, links, account }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <header
      className={styles.header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <noscript>
        <style>
          {
            "#site-navigation { display: flex; } button[aria-controls='site-navigation'] { display: none; }"
          }
        </style>
      </noscript>
      <a className={styles.skip} href="#main-content">
        Aller au contenu
      </a>
      <Link className={styles.brand} href={homeHref}>
        {brand}
      </Link>
      <button
        ref={trigger}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen(!open)}
      >
        Menu
      </button>
      <nav
        id="site-navigation"
        aria-label="Navigation principale"
        className={styles.nav}
        data-open={open}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Button href={account.href} size="small">
        {account.label}
      </Button>
    </header>
  );
}
