const db = require('./../../data');

const Query = {
    stock: (root, args) => db.stocks.get(args.id),
    stocks: () => db.stocks.list()
}

const Mutation = {
    createStock: (root, {input}, context) => {
        console.dir(input)
        if (!context.user) {
            throw new Error('Unauthorized')
        }
        const id = db.stocks.create(input)
        return db.stocks.get(id)
    }
}

const Stock = {
    industry: (stock) => db.industries.get(stock.industryId)
}

module.exports = { Query, Mutation, Stock };