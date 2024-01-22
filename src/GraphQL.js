import {ApolloClient, InMemoryCache} from "@apollo/client";

//TODO: Nefunguje, zeptat se michala zda neví jak udělat lépe?
const GQLClient = new ApolloClient({
	uri: process.env.REACT_APP_API_URL + "graphql",
	cache: new InMemoryCache(),
	headers: {
		Authentication: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDU4NDg4MDIsImV4cCI6MTcwNTg1MjQwMiwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9TVVBFUl9BRE1JTiJdLCJpZCI6IjY1YWQxMzU3MGQyMzY2Mzc1NjA4YjI4MiJ9.qLyg60UWjtF3T169Sk9S9jW8OpDXobKhD_giyI-MMpczSalIAWK98izohv-5dMJ6TZkHZlD1cKx1moTrJH7izvjsyOvfxbe94qvpVGjGwHPiY6F7lITmeINsccM62-YfX3yCuw4nSzle5PPwtdggqB5ZxHo_08LN30XF5T01X1_6Qya7ubHj974pNDCbRtaIXJdKvzJKibQ3Gqlgmj5zf6TTw5D7V6RgdrP1UvUbwPdgSxJwRRqTb0ES2eLJ5_Wd5nPf3SVznY4gxXditGzpm1S_X_QpRD4_WhkHq9-SbXF_HvklFiy5QVZwXTnSQfwS6JYf0HQOMjs24KYGSntQqw',
		'x-api-secret': process.env.REACT_APP_X_API_SECRET,
	}
});

export default GQLClient;