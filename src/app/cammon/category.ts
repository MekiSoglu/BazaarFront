export class category{

  constructor(    public id:number,
                  public parent_id:number,
                  public categoryName:string,
                  public product_Id:Set<number>,
                  public version:number

) {

  }
}
