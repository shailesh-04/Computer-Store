import database from "@config/database";
import { IClassProducts, IProducts } from "@interfaces/products";
import Migration from "src/utils/migration";
class Products implements IClassProducts {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("products", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            name: ["VARCHAR(255)", "NOT NULL"],
            description: ["TEXT"],
            brand: ["VARCHAR(100)"],
            category_id: ["INT", "NOT NULL"],
            price: ["DECIMAL(10,2)", "NOT NULL"],
            quantity: ["INT", "NOT NULL", "DEFAULT 0"],
            thumbnail: ["VARCHAR(255)"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        }, ["FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE"]);
    }
    async create(body: IProducts): Promise<any[]> {
        const { name, description, brand, category_id, price, quantity, thumbnail } = body;
        const result = await database.query(
            `INSERT INTO products(name, description, brand, category_id, price, quantity, thumbnail) VALUES (?,?,?,?,?,?,?)`,
            [name, description, brand, category_id, price, quantity, thumbnail]
        );
        return result;
    }

    async update(id: string, body: IProducts): Promise<any[]> {
        const { name, description, brand, category_id, price, quantity, thumbnail } = body;
        const result = await database.query(
            `UPDATE products SET name=?, description=?, brand=?, category_id=?, price=?, quantity=?, thumbnail=? WHERE id=?`,
            [name, description, brand, category_id, price, quantity, thumbnail, id]
        );
        return result;
    }

    async read(): Promise<IProducts[]> {
        const rows = await database.query(`SELECT * FROM products ORDER BY id DESC`);
        return rows as IProducts[];
    }

    async readOne(id: string): Promise<IProducts[]> {
        const rows = await database.query(`SELECT * FROM products WHERE id=?`, [id]);
        return rows as IProducts[];
    }

    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM products WHERE id=?`, [id]);
        return result;
    }
    public async seeder(): Promise<any[]> {
        const products: IProducts[] = [
            {
                name: "Apple iPhone 14",
                description: "Latest Apple smartphone with A15 Bionic chip and advanced camera system.",
                brand: "Apple",
                category_id: 1,
                price: 999.99,
                quantity: 50,
                thumbnail: "https://example.com/iphone14.jpg"
            },
            {
                name: "Samsung Galaxy S23",
                description: "Flagship Samsung phone with AMOLED display and triple camera setup.",
                brand: "Samsung",
                category_id: 1,
                price: 899.99,
                quantity: 40,
                thumbnail: "https://example.com/galaxys23.jpg"
            },
            {
                name: "Dell XPS 13",
                description: "Ultra-thin laptop with Intel Core i7 and 16GB RAM.",
                brand: "Dell",
                category_id: 2,
                price: 1299.99,
                quantity: 25,
                thumbnail: "https://example.com/dellxps13.jpg"
            },
            {
                name: "Apple MacBook Pro 16",
                description: "Powerful laptop with M2 Pro chip and Retina display.",
                brand: "Apple",
                category_id: 2,
                price: 2499.99,
                quantity: 15,
                thumbnail: "https://example.com/macbookpro16.jpg"
            },
            {
                name: "Sony WH-1000XM5",
                description: "Industry-leading noise cancelling wireless headphones.",
                brand: "Sony",
                category_id: 3,
                price: 349.99,
                quantity: 60,
                thumbnail: "https://example.com/sonywh1000xm5.jpg"
            },
            {
                name: "Bose QuietComfort 45",
                description: "Comfortable wireless headphones with active noise cancellation.",
                brand: "Bose",
                category_id: 3,
                price: 329.99,
                quantity: 55,
                thumbnail: "https://example.com/boseqc45.jpg"
            },
            {
                name: "Canon EOS R6",
                description: "Mirrorless camera with 20MP sensor and 4K video recording.",
                brand: "Canon",
                category_id: 4,
                price: 1999.99,
                quantity: 10,
                thumbnail: "https://example.com/canoneosr6.jpg"
            },
            {
                name: "Nikon Z6 II",
                description: "Full-frame mirrorless camera with fast autofocus.",
                brand: "Nikon",
                category_id: 4,
                price: 1799.99,
                quantity: 12,
                thumbnail: "https://example.com/nikonz6ii.jpg"
            },
            {
                name: "Apple iPad Air",
                description: "Lightweight tablet with 10.9-inch Liquid Retina display.",
                brand: "Apple",
                category_id: 5,
                price: 599.99,
                quantity: 30,
                thumbnail: "https://example.com/ipadair.jpg"
            },
            {
                name: "Samsung Galaxy Tab S8",
                description: "High-performance Android tablet with S Pen support.",
                brand: "Samsung",
                category_id: 5,
                price: 699.99,
                quantity: 20,
                thumbnail: "https://example.com/galaxytabs8.jpg"
            },
            {
                name: "Logitech MX Master 3S",
                description: "Advanced wireless mouse with ergonomic design.",
                brand: "Logitech",
                category_id: 6,
                price: 99.99,
                quantity: 80,
                thumbnail: "https://example.com/mxmaster3s.jpg"
            },
            {
                name: "Razer BlackWidow V4",
                description: "Mechanical gaming keyboard with RGB lighting.",
                brand: "Razer",
                category_id: 6,
                price: 179.99,
                quantity: 45,
                thumbnail: "https://example.com/blackwidowv4.jpg"
            },
            {
                name: "Western Digital 2TB External HDD",
                description: "Portable hard drive for backup and storage.",
                brand: "Western Digital",
                category_id: 7,
                price: 79.99,
                quantity: 100,
                thumbnail: "https://example.com/wd2tb.jpg"
            },
            {
                name: "Samsung 970 EVO Plus 1TB SSD",
                description: "High-speed NVMe SSD for desktops and laptops.",
                brand: "Samsung",
                category_id: 7,
                price: 129.99,
                quantity: 70,
                thumbnail: "https://example.com/970evoplus.jpg"
            },
            {
                name: "LG 27-inch 4K Monitor",
                description: "Ultra HD monitor with IPS panel and HDR support.",
                brand: "LG",
                category_id: 8,
                price: 399.99,
                quantity: 35,
                thumbnail: "https://example.com/lg27uk850.jpg"
            },
            {
                name: "ASUS ROG Swift PG259QN",
                description: "360Hz gaming monitor with G-Sync support.",
                brand: "ASUS",
                category_id: 8,
                price: 699.99,
                quantity: 18,
                thumbnail: "https://example.com/rogpg259qn.jpg"
            },
            {
                name: "TP-Link Archer AX6000",
                description: "Wi-Fi 6 router with 8 Gigabit LAN ports.",
                brand: "TP-Link",
                category_id: 9,
                price: 299.99,
                quantity: 28,
                thumbnail: "https://example.com/archerax6000.jpg"
            },
            {
                name: "Google Nest Wifi Pro",
                description: "Mesh Wi-Fi system for whole-home coverage.",
                brand: "Google",
                category_id: 9,
                price: 199.99,
                quantity: 32,
                thumbnail: "https://example.com/nestwifipro.jpg"
            },
            {
                name: "Anker PowerCore 20000",
                description: "High-capacity portable charger for phones and tablets.",
                brand: "Anker",
                category_id: 10,
                price: 49.99,
                quantity: 90,
                thumbnail: "https://example.com/powercore20000.jpg"
            },
            {
                name: "Apple Watch Series 8",
                description: "Smartwatch with fitness tracking and ECG app.",
                brand: "Apple",
                category_id: 9,
                price: 399.99,
                quantity: 22,
                thumbnail: "https://example.com/applewatch8.jpg"
            }
        ];
        const results = [];
        for (const product of products) {
            const result = await this.create(product);
            results.push(result);
        }
        return results;
    }
}

export default new Products();