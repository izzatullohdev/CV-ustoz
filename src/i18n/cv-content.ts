import type { UIKey } from './ui';

export interface ExperienceItem {
	periodKey: UIKey;
	roleKey: UIKey;
	placeKey: UIKey;
}

export interface EducationItem {
	yearKey: UIKey;
	degreeKey: UIKey;
	placeKey: UIKey;
	/** Public path to diploma/certificate PDF — opens in a new tab when set */
	documentHref?: string;
}

export const experienceItems: ExperienceItem[] = [
	{ periodKey: 'cv.exp1.period', roleKey: 'cv.exp1.role', placeKey: 'cv.exp1.place' },
	{ periodKey: 'cv.exp2.period', roleKey: 'cv.exp2.role', placeKey: 'cv.exp2.place' },
	{ periodKey: 'cv.exp3.period', roleKey: 'cv.exp3.role', placeKey: 'cv.exp3.place' },
	{ periodKey: 'cv.exp4.period', roleKey: 'cv.exp4.role', placeKey: 'cv.exp4.place' },
	{ periodKey: 'cv.exp5.period', roleKey: 'cv.exp5.role', placeKey: 'cv.exp5.place' },
];

export const educationItems: EducationItem[] = [
	{
		yearKey: 'cv.edu1.year',
		degreeKey: 'cv.edu1.degree',
		placeKey: 'cv.edu1.place',
		documentHref: '/Magistr%20diplom%2BIlova.pdf',
	},
	{
		yearKey: 'cv.edu2.year',
		degreeKey: 'cv.edu2.degree',
		placeKey: 'cv.edu2.place',
		documentHref: '/Bakalavr%20diplom%2BIlova.pdf',
	},
];

export const profileFacts = [
	{ labelKey: 'cv.fact.birth' as UIKey, valueKey: 'cv.fact.birth.value' as UIKey },
	{ labelKey: 'cv.fact.birthplace' as UIKey, valueKey: 'cv.fact.birthplace.value' as UIKey },
	{ labelKey: 'cv.fact.specialty' as UIKey, valueKey: 'cv.fact.specialty.value' as UIKey },
	{ labelKey: 'cv.fact.languages' as UIKey, valueKey: 'cv.fact.languages.value' as UIKey },
] as const;
