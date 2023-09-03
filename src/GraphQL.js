import {ApolloClient, InMemoryCache} from "@apollo/client";

const GQLClient = new ApolloClient({
	uri: "http://127.0.0.1:8000/api/graphql",
	cache: new InMemoryCache()
});

export default GQLClient;