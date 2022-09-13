import { IResolvers } from "@graphql-tools/utils";
import _ from "lodash";
import { database } from "../data/data.store";

const mutation: IResolvers = {
  Mutation: {
    addCourse(__: void, { course }): any {
        const newCourse = {
            ...course,
            id: (database.courses.length + 1)+"",
            reviews: []
        }
        database.courses.push(newCourse);
        return newCourse;
    }
  },
};

export default mutation;
