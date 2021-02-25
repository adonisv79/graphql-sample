const db = require('./../../data');

const Query = {
    industry: (root, {id}) => db.industries.get(id),
    industries: () => db.industries.list()
}

const Mutation = {
    createIndustry: (root, {input}, context) => {
        if (!context.user) {
            throw new Error('Unauthorized')
        }
        const id = db.industries.create(input)
        return db.industries.get(id)
    }
}

const Industry = {
    stocks: (industry) => db.stocks.list()
        .filter((stock) => stock.industryId === industry.id)
}

module.exports = { Query, Mutation, Industry };