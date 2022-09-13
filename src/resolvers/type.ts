import { IResolvers } from "@graphql-tools/utils";
import { database } from "../data/data.store";
import _ from "lodash";

const type: IResolvers = {
  Student: {
    courses: parent => {
      const coursesArray: Array<any> = [];
      parent.courses.map((curso: string) => {
        coursesArray.push(_.filter(database.courses, ["id", curso])[0]);
      });
      return coursesArray;
    },
  },
  Course: {
    students: parent => {
      const idCourse: string = parent.id;
      return database.students.filter((student: any)=> student.courses.includes(idCourse)); 
    },
    path: parent => `https://ww.udemy.com/${parent.path}`
  },
};

export default type;
