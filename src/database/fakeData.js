import { faker } from '@faker-js/faker';
import fs from 'fs';

export function createRandomProduct(){
    return {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(10000, 100000),
        description: faker.commerce.productDescription(),
        product: faker.commerce.productMaterial(),
        color: faker.commerce.color(),
        createAt: faker.date.past(),
        image: 	faker.image.imageUrl()
    };
}

export function createDatabase(){
    const products = [] = Array.from({ length: 100 }).map(() => {
        return createRandomProduct()
    });

    fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: products
    }));

}
