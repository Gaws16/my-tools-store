import Link from "next/link";
import { fetchProducts } from "@/lib/supabase/queries/products";
import { deleteProductById } from "@/lib/supabase/queries/admin-products";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page || 1);
  const { products, total } = await fetchProducts({
    page,
    pageSize: 20,
    client: "server",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin • Products
        </h1>
        <Button asChild>
          <Link href="/admin/products/new">Add product</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">SKU</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Stock</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map((p: any) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.sku}</td>
                <td className="px-4 py-2">${Number(p.price).toFixed(2)}</td>
                <td className="px-4 py-2">{p.stock_quantity}</td>
                <td className="px-4 py-2">
                  <form
                    action={async () => {
                      "use server";
                      await deleteProductById(p.id);
                    }}
                  >
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
