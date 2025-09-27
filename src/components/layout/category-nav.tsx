import Link from "next/link";
import {
  fetchCategories,
  buildCategoryTree,
} from "@/lib/supabase/queries/categories";

export default async function CategoryNav() {
  const cats = await fetchCategories();
  const tree = buildCategoryTree(cats);
  return (
    <nav className="text-sm">
      <ul className="flex flex-wrap gap-3">
        {tree.map((c) => (
          <li key={c.id}>
            <Link href={`/category/${c.slug}`} className="hover:underline">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
