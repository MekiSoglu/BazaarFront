export class Product {
  constructor(
    public id: number,
    public categoryId: number,
    public sku: string,
    public name: string,
    public active: boolean,
    public unitPrice: number,
    public unitStocks: number,
    public dataCreate: Date,
    public lastUpdate: Date,
    public imageUrl: string,
    public description: string
  ) { }
}
