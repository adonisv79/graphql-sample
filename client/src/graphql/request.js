import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'
import gql from 'graphql-tag'
import { getAccessToken, isLoggedIn } from "../services/auth";

const endpointURL = 'http://localhost:8080/graphql';

const authLink = new ApolloLink((operation, forward) => {
    if (isLoggedIn()) {
        operation.setContext({
            headers: {
                'authorization': 'Bearer ' + getAccessToken()
            }
        })    
    }
    return forward(operation)  
});

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({uri: endpointURL})
    ]),
    cache: new InMemoryCache()
})

const stockDetailFragment = gql`
    fragment StockDetail on Stock {
        id
        symbol
        title
        industry {
            id
            title
        }
    }
`;

const industryQuery = gql`
    query IndustryQuery($id: ID!){
        industry(id: $id) {
            id
            title
            stocks {
                id
                symbol
                title
            }
        }
    }
`;

const createStockMutation = gql`
    mutation CreateStock($input: CreateStockInput){
        stock: createStock(input: $input) {
            ...StockDetail
        }
    }
    ${stockDetailFragment}
`;

const stockQuery = gql`
    query StockQuery($id: ID!){
        stock(id: $id) {
            ...StockDetail
        }
    }
    ${stockDetailFragment}
`;

const stocksQuery = gql`
    query StocksQuery {
        stocks {
            id
            title
            industry {
                id
                title
            }
        }
    }
`;

export async function createStock(input) {
    const { data } = await client.mutate({ 
        mutation: createStockMutation, 
        variables: { input },
        update: (cache, mutationResult) => {
            cache.writeQuery({ 
                query: stockQuery, 
                variables: { id: mutationResult.data.stock.id },
                data: mutationResult.data
            })
        }
    })
    return data.stock
}

export async function loadIndustry(id) {
    const variables = { id }
    const { data } = await client.query({ query: industryQuery, variables })
    return data.industry || {};
}

export async function loadStock(id) {
    const variables = { id }
    const { data } = await client.query({ 
        query: stockQuery, 
        variables,
    })
    return data.stock || {};
}

export async function loadStocks() {
    const { data } = await client.query({query: stocksQuery, fetchPolicy: 'no-cache'})
    return data.stocks || [];
}

