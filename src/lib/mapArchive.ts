import type { ImageMetadata } from "astro";

type MapFrontmatter = {
    title?: string;
    description?: string;
    date?: unknown;
    heroImage?: string;
    categories?: unknown;
    score?: number;
    reviewTitle?: string;
};

export type MapPost = {
    file: string;
    frontmatter: MapFrontmatter;
};

export type MapCategory = {
    label: string;
    slug: string;
    count: number;
    href: string;
};

type LoadedMapModule = {
    frontmatter?: MapFrontmatter;
};

const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/images/**/*.{jpeg,jpg,png,gif}",
    { eager: true },
);

const mapModules = import.meta.glob<LoadedMapModule>(
    "/src/pages/maps/*.{md,mdx}",
    { eager: true },
);

export const toTimestamp = (value: unknown): number => {
    if (!value) return 0;
    if (value instanceof Date) return value.getTime();

    const raw = String(value).trim();
    const normalized = raw.replace(/(\d+)(st|nd|rd|th)/gi, "$1");
    const timestamp = Date.parse(normalized);
    return Number.isFinite(timestamp) ? timestamp : 0;
};

export const sortMapPosts = <T extends MapPost>(posts: T[]) =>
    [...posts].sort(
        (a, b) =>
            toTimestamp(b.frontmatter?.date) - toTimestamp(a.frontmatter?.date),
    );

export const getMapPostSlug = (file: string) =>
    file.split("/").pop()?.split(".")[0] || "";

export const normalizeCategoryLabel = (value: unknown) => String(value || "").trim();

export const slugifyCategory = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const getMapCategories = (posts: MapPost[]): MapCategory[] => {
    const counts = new Map<string, number>();

    posts.forEach((post) => {
        const label = normalizeCategoryLabel(post.frontmatter?.categories);
        if (!label) return;
        counts.set(label, (counts.get(label) || 0) + 1);
    });

    return Array.from(counts.entries())
        .map(([label, count]) => {
            const slug = slugifyCategory(label);

            return {
                label,
                slug,
                count,
                href: `/maps/category/${slug}`,
            };
        })
        .sort((a, b) => a.label.localeCompare(b.label));
};

export const getMapCategoryFromSlug = (
    categories: MapCategory[],
    slug: string,
) => categories.find((category) => category.slug === slug);

export const filterMapPostsByCategory = <T extends MapPost>(
    posts: T[],
    categorySlug: string,
) =>
    posts.filter(
        (post) =>
            slugifyCategory(normalizeCategoryLabel(post.frontmatter?.categories)) ===
            categorySlug,
    );

export const getMapPostImage = (heroImagePath: string) => {
    const normalizedPath = heroImagePath.replace("../../", "/src/");

    return (
        images[normalizedPath]?.default ||
        images["/src/assets/images/articles/zed_logo.jpeg"]?.default
    );
};

export const loadMapPosts = (): MapPost[] =>
    sortMapPosts(
        Object.entries(mapModules).map(([file, module]) => ({
            file,
            frontmatter: module.frontmatter || {},
        })),
    );