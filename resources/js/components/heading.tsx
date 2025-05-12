export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-black">{title}</h2>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
    );
}
