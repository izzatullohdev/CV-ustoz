import fs from 'node:fs';
import path from 'node:path';

export const PUBLICATIONS_DIR = '2024-2026 Ilmiy maqolalar';

export interface PublicationFile {
	name: string;
	url: string;
}

export interface PublicationGroup {
	category: string;
	files: PublicationFile[];
}

const CATEGORY_ORDER = ['OAK maqolalar', 'Impakt faktor', 'Tezislar'];

function toPublicUrl(...parts: string[]): string {
	return `/${[PUBLICATIONS_DIR, ...parts].map(encodeURIComponent).join('/')}`;
}

function formatFileName(filename: string): string {
	return filename.replace(/\.pdf$/i, '');
}

export function getPublicationGroups(): PublicationGroup[] {
	const root = path.join(process.cwd(), 'public', PUBLICATIONS_DIR);
	if (!fs.existsSync(root)) return [];

	const groups: PublicationGroup[] = [];

	for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
		if (!entry.isDirectory() || entry.name.startsWith('.')) continue;

		const files = fs
			.readdirSync(path.join(root, entry.name))
			.filter((file) => file.toLowerCase().endsWith('.pdf') && !file.startsWith('.'))
			.sort((a, b) => a.localeCompare(b, 'uz', { numeric: true }))
			.map((filename) => ({
				name: formatFileName(filename),
				url: toPublicUrl(entry.name, filename),
			}));

		if (files.length > 0) {
			groups.push({ category: entry.name, files });
		}
	}

	groups.sort((a, b) => {
		const orderA = CATEGORY_ORDER.indexOf(a.category);
		const orderB = CATEGORY_ORDER.indexOf(b.category);
		if (orderA === -1 && orderB === -1) return a.category.localeCompare(b.category, 'uz');
		if (orderA === -1) return 1;
		if (orderB === -1) return -1;
		return orderA - orderB;
	});

	return groups;
}
