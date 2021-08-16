import * as actionTypes from "../types/postTypes";

export const postReducer = (posts = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_POSTS:
      return action.payload
    case actionTypes.CREATE_POST:
      return [...posts, action.payload]
    case actionTypes.UPDATE_POST:
    case actionTypes.LIKE_POST:
      return posts.map((post) => post._id === action.payload._id
        ? action.payload
        : post)
    case actionTypes.DELETE_POST:
      return posts.map(post => post._id !== action.payload)
    default:
      return posts;
  }
}
