export class Producto {

  id: number;
  name: string;
  excerpt: string;
  price: number;
  url: string;

  public constructor(id: number, name: string, excerpt: string, price: number, url: string) {
    this.id = id,
      this.name = name,
      this.excerpt = excerpt,
      this.price = price,
      this.url = url
  }
}
