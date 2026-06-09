import { SkillIcon } from './icons';

interface TeachingCardProps {
	icon: 'classics' | 'poetry' | 'culture';
	title: string;
	description: string;
}

export default function TeachingCard({ icon, title, description }: TeachingCardProps) {
	return (
		<article className="card-skill">
			<div className="icon-skill mb-4 flex h-10 w-10 items-center justify-center rounded-full">
				<SkillIcon name={icon} />
			</div>
			<h3 className="font-sans text-lg text-ink dark:text-paper">{title}</h3>
			<p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-paper/70">
				{description}
			</p>
		</article>
	);
}
