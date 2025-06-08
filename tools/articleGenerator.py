import csv


def generate_article(row):
    return f"""<article class="product-item">
    <div class="product-image">
        <img src="{row['Product Image Link']}" alt="{row['Product Name']}" loading="lazy">
    </div>
    <div class="product-content">
        <h3>{row['Product Name']}</h3>
        <p>{row['Description']}</p>
        <a href="{row['Affiliated Link']}" target="_blank" rel="noopener noreferrer" class="btn">Buy Now</a>
    </div>
</article>"""


def main(csv_path):
    with open(csv_path, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            print(generate_article(row))
            print()  # Blank line between articles


if __name__ == "__main__":
    main("./tools/products.csv")
