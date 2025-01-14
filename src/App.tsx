import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ApplicationTexts {
  labels: { search: string; showOnlyInStock: string };
  productProperties: { name: string; price: string };
  productCategories: Record<ProductCategory, string>;
}

const english: ApplicationTexts = {
  labels: {
    search: "Search...",
    showOnlyInStock: "Only show products in stock",
  },
  productProperties: {
    name: "Name",
    price: "Price",
  },
  productCategories: {
    Fruits: "Fruits",
    Vegetables: "Vegetables",
  },
};
const norwegian: ApplicationTexts = {
  labels: {
    search: "Søk...",
    showOnlyInStock: "Vis bare produkter på lager",
  },
  productProperties: {
    name: "Navn",
    price: "Pris",
  },
  productCategories: {
    Fruits: "Frukt",
    Vegetables: "Grønnsaker",
  },
};
const swedish: ApplicationTexts = {
  labels: {
    search: "Sök...",
    showOnlyInStock: "Visa bara produkter i lager",
  },
  productProperties: {
    name: "Namn",
    price: "Pris",
  },
  productCategories: {
    Fruits: "Frukt",
    Vegetables: "Grönsaker",
  },
};

const ApplicationTextsContext = React.createContext<ApplicationTexts>(english);

function ProductCategoryRow({ category }: { category: ReactNode }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

type ProductCategory = "Fruits" | "Vegetables";
type Product = {
  price: string;
  name: string;
  category: ProductCategory;
  stocked: boolean;
};

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

function ProductTable({ products }: { products: Product[] }) {
  const applicationTexts = useContext(ApplicationTextsContext);
  const rows: ReactNode[] = [];
  let lastCategory: ReactNode = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={applicationTexts.productCategories[product.category]}
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
          <th>{applicationTexts.productProperties.name}</th>
          <th>{applicationTexts.productProperties.price}</th>
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
  const applicationTexts = useContext(ApplicationTextsContext);
  return (
    <form>
      <input
        type="text"
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
        placeholder={applicationTexts.labels.search}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        {applicationTexts.labels.showOnlyInStock}
      </label>
    </form>
  );
}

function FilterableProductTable({ products }: { products: Product[] }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        ({ name, stocked }) =>
          name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 &&
          !(inStockOnly && !stocked),
      ),
    [products, filterText, inStockOnly],
  );

  return (
    <div>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable products={filteredProducts} />
    </div>
  );
}

const PRODUCTS: Product[] = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function getApplicationTexts() {
  if (navigator.language === "no") return norwegian;
  if (navigator.language === "sv") return swedish;
  return english;
}

export default function App() {
  const [applicationTexts, setApplicationTexts] = useState<ApplicationTexts>(
    () => getApplicationTexts(),
  );

  useEffect(() => {
    addEventListener("languagechange", () => {
      setApplicationTexts(getApplicationTexts());
    });
  }, []);

  return (
    <ApplicationTextsContext value={applicationTexts}>
      <FilterableProductTable products={PRODUCTS} />
    </ApplicationTextsContext>
  );
}
