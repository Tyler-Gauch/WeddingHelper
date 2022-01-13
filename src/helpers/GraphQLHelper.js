import { API } from "aws-amplify";

export const paginateQuery = async ({query, variables}) => {
        let nextToken = variables && variables.nextToken ? variables.nextToken : null;
        let data = [];
        // this is hacky should probably use apollo ast parsing but meh
        let key = query.match(/query ([a-zA-Z]+)/)[1];
        key = key.charAt(0).toLowerCase() + key.slice(1);
        do {
            const {data: {[key]: {items: page, nextToken: token}}} = await API.graphql({
                query: query,
                variables: {
                    ...variables,
                    nextToken: nextToken
                }
            });

            data = [...data, ...page.filter(h => !h._deleted)];
            nextToken = token;
        } while (nextToken);
        
        data.sort((a, b) => {
            const aCreate = new Date(a.createdAt);
            const bCreate = new Date(b.createdAt);

            if (aCreate < bCreate) {
                return -1;
            } else if (bCreate > aCreate) {
                return 1;
            } else {
                return 0;
            }
        });

        return data;
}