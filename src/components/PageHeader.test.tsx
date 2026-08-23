import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import PageHeader from "./PageHeader";

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Nile Tower" },
] as const;

describe("PageHeader", () => {
  it("renders the title as the only h1", () => {
    const html = renderToStaticMarkup(<PageHeader title="Selected work" />);
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("Selected work");
  });

  it("omits the eyebrow and the intro when they are not given", () => {
    const html = renderToStaticMarkup(<PageHeader title="Bare" />);
    expect(html).not.toContain("<p");
    expect(html).not.toContain("tracking-[0.3em]");
  });

  it("shows the eyebrow above the title when it is given", () => {
    const html = renderToStaticMarkup(<PageHeader eyebrow="The Studio" title="Bare" />);
    expect(html.indexOf("The Studio")).toBeLessThan(html.indexOf("Bare"));
  });

  it("shows the intro under the title", () => {
    const html = renderToStaticMarkup(<PageHeader title="Bare" intro="A sentence." />);
    expect(html).toContain("A sentence.");
    expect(html.indexOf("Bare")).toBeLessThan(html.indexOf("A sentence."));
  });

  it("renders the trail as a labelled navigation landmark", () => {
    const html = renderToStaticMarkup(<PageHeader title="Nile Tower" crumbs={CRUMBS} />);
    expect(html).toContain('<nav aria-label="Breadcrumb"');
    expect(html).toContain("<ol");
  });

  it("marks only the last crumb as the current page", () => {
    const html = renderToStaticMarkup(<PageHeader title="Nile Tower" crumbs={CRUMBS} />);
    expect(html.match(/aria-current="page"/g)).toHaveLength(1);
    const current = html.slice(html.indexOf('aria-current="page"'));
    expect(current).toContain("Nile Tower");
  });

  it("links every crumb except the current page", () => {
    const html = renderToStaticMarkup(<PageHeader title="Nile Tower" crumbs={CRUMBS} />);
    expect(html.match(/<a /g)).toHaveLength(2);
    expect(html).toContain('href="/work"');
  });

  it("does not link a crumb that has no href", () => {
    const html = renderToStaticMarkup(
      <PageHeader title="Studio" crumbs={[{ label: "Home" }, { label: "Studio" }]} />
    );
    expect(html).not.toContain("<a ");
  });

  it("hides the separators from assistive technology", () => {
    const html = renderToStaticMarkup(<PageHeader title="Nile Tower" crumbs={CRUMBS} />);
    expect(html.match(/aria-hidden="true"/g)?.length).toBeGreaterThanOrEqual(2);
  });

  it("renders no trail at all when the list is empty", () => {
    const html = renderToStaticMarkup(<PageHeader title="Bare" crumbs={[]} />);
    expect(html).not.toContain("<nav");
  });
});
