import { IResolvers } from "@graphql-tools/utils";
import _ from "lodash";
import { database } from "../data/data.store";

const mutation: IResolvers = {
  Mutation: {
    addCourse(__: void, { course }): any {
      const newCourse = {
        ...course,
        id: (database.courses.length > 0) ? `${+database.courses[database.courses.length - 1].id + 1}` : '1',
        reviews: [],
      };
      if (
        database.courses.filter((course) => course.title === newCourse.title)
          .length === 0
      ) {
        database.courses.push(newCourse);
        return newCourse;
      }
      return {
        id: "-1",
        title: "Title already exists.",
        description: "",
        clases: 0,
        time: 0,
        logo: "",
        level: "ALL",
        path: "Without path",
        teacher: "",
        reviews: [],
      };
    },
    updateCourse(__: void, { course }): any {
      for (let index = 0; index < database.courses.length; index++) {
        if (database.courses[index].id === course.id) {
          course.reviews = database.courses[index].reviews;
          database.courses[index] = course;
          return course;
        }
      }
      return {
        id: course.id,
        title: "Id not found",
        description: "",
        clases: 0,
        time: 0,
        logo: "",
        level: "ALL",
        path: "Without path",
        teacher: "",
        reviews: [],
      };
    },
    deleteCourse(__: void, { id }) {
      database.courses.forEach((course, index) => {
        if (course.id === id) database.courses.splice(index,1);
      });
      return database.courses;
    },
  },
};

export default mutation;
