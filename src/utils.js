import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {faker} from "@faker-js/faker";

const { commerce,database,random,image, name, internet, premium } = faker;

//Cambiamos idioma 
faker.locale = "es";

//Generar Producto

export const generateProduct = ()=>{
    return{
        title:commerce.productName(),
        price:commerce.price(),
        stock:random.numeric(1),
        id:database.mongodbObjectId(),
        image:image.image(),        
    }
}

export const generateUser = ()=>{
    let products=[];
    const numberOfProducts = Math.ceil(Math.random()*10);
    for(let i=0;i<numberOfProducts;i++){
        const newProduct = generateProduct();
        products.push(newProduct);        
    }
    // console.log(numberOfProducts);
    // console.log(products);
    return{
        first_name:name.firstName(),
        last_name:name.lastName(),
        avatar:internet.avatar(),
        id:database.mongodbObjectId(),
        cart:products
    }
}
// console.log(generateUser());

//console.log(generateProduct());

//generar productos mocking
export default __dirname;

