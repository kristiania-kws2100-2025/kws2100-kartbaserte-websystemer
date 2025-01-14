import React, { ReactNode, useState } from "react";

function ProductCategoryRow({ category }: { category: ReactNode }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

type Product = (typeof PRODUCTS)[number];

function ProductRow({ product }: { product: Product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}) {
  const rows: ReactNode[] = [];
  let lastCategory: ReactNode = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
        placeholder="Search..."
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }: { products: Product[] }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
