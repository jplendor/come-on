import {
  useGetCourseListQuery,
  useGetMyCourseListQuery,
  useGetLikedCourseListQuery,
} from "features/course/courseSlice"
import { useGetMeetingListQuery } from "features/meeting/meetingSlice"

const endpoint = {
  Meeting: {
    getCourseList: useGetMeetingListQuery,
    height: 605,
    itemSize: 277,
  },
  Neighborhood: {
    getCourseList: useGetCourseListQuery,
    height: 605,
    itemSize: 267,
  },
  MyCourse: {
    getCourseList: useGetMyCourseListQuery,
    height: 275,
    itemSize: 267,
  },
  LikedCourse: {
    getCourseList: useGetLikedCourseListQuery,
    height: 275,
    itemSize: 267,
  },
}

export default endpoint
