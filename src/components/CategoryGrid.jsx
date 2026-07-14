import categories from "../data/categories";

function CategoryGrid({
  selectedCategory,
  onCategorySelect,
}) {
  return (
    <section className="category-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">
            SHOP BY CATEGORY
          </span>

          <h2>Everything you need</h2>
        </div>

        {selectedCategory && (
          <button
            className="see-all-button"
            type="button"
            onClick={() => onCategorySelect("")}
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="category-grid">
        {categories.map((category) => {
          const isActive =
            selectedCategory === category.name;

          return (
            <button
              className={`category-card ${
                isActive ? "category-card-active" : ""
              }`}
              key={category.id}
              type="button"
              onClick={() =>
                onCategorySelect(
                  isActive ? "" : category.name
                )
              }
            >
              <div
                className="category-image"
                style={{
                  backgroundColor: category.background,
                }}
              >
                <span>{category.icon}</span>
              </div>

              <p>{category.name}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryGrid;