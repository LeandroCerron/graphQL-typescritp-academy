import {IResolvers} from '@graphql-tools/utils';
import {database} from '../data/data.store';
import _ from 'lodash';
const query: IResolvers = {
    Query: {
        students(): any {
            return database.students;
        },
        student(__: void, { id }): any {
            const dataStudent = database.students.filter((student: any)=> student.id === id.trim());
            if (dataStudent.length === 0) return {
                id: `ID: ${id} does not exist.`,
                name: '',
                email: '',
                courses: []
            }
            return dataStudent[0];
        },
        courses(): any {
            return database.courses;
        },
        course(__: void, { id }): any {
            const dataCourse = database.courses.filter((course: any)=> course.id === id.trim());
            if (dataCourse.length === 0) return {
                id: `ID: ${id} does not exist.`,
                title: '',
                description: '',
                clases: '',
                time: 0,
                logo: '',
                level: 'ALL',
                path: '',
                teacher: '',
                reviews: []
            }
            return dataCourse[0];
        }
    }
};

export default query;