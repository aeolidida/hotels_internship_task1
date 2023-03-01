class Product{
    constructor (name, price, amount, description){
        this.name = name;                    // string
        this.price = price;                  // number
        this.amount = amount;                // number
        this.description = description;      // string
    }
}

class ProductContainer {
    constructor (productArray) {
        this.productArray = productArray;
    }

    filter(queryString){
        let queries = queryString.split('&');
        let result = this.productArray;
        for (let query of queries){
            let tokenArray = query.split('-');
            let fieldName = tokenArray[0];
            if (fieldName == "name" || fieldName == "description"){
                switch(tokenArray[1]){
                    case 'contains':
                        result = result.filter(product => product[fieldName].includes(tokenArray[2]));
                        break;
                    case 'starts':
                        result = result.filter(product => product[fieldName].startsWith(tokenArray[2]));
                        break;
                    case 'ends':
                        result = result.filter(product => product[fieldName].endsWith(tokenArray[2]));
                        break;
                    default:
                        throw new Error("Unknown operation");
                }
            } else if (fieldName == "price" || fieldName == "amount"){
                let sign = tokenArray[1].substring(0, tokenArray[1].search(/\d/g));
                let number = parseInt(tokenArray[1].substring(tokenArray[1].search(/\d/g)));
                switch(sign){
                    case '<':
                        result = result.filter(product => product[fieldName] < number);
                        break;
                    case '=':
                        result = result.filter(product => product[fieldName] == number);
                        break;
                    case '>':
                        result = result.filter(product => product[fieldName] > number);
                        break;
                    case '<=':
                        result = result.filter(product => product[fieldName] <= number);
                        break;    
                    case '>=':
                        result = result.filter(product => product[fieldName] >= number);
                        break;
                    default:
                        throw new Error("Unknown operation");
                }
            } else {
                throw new Error("Unknown field");
            }
        } 
        return result;
    }
}

export {Product, ProductContainer}