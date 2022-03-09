const axios = require('axios')

exports.getSectionCourse = async function getSectionCourse (ctx, sectionId) {
  const sectionResp = await ctx.api.get(`/sections/${sectionId}`)
  const { courseId } = sectionResp?.data
  return await ctx.api.get(`/courses/${courseId}`)
}

exports.getSection = async function getSection (ctx, id) {
  return await ctx.api.get(`/sections/${id}`)
}

exports.getCourse = async function getcourse (ctx, id) {
  return await ctx.api.get(`/courses/${id}`)
}

exports.getBook = async function getBook (ctx, id) {
  return await ctx.api.get(`/books/${id}`)
}

exports.getUser = async function getUser (ctx, id) {
  return await ctx.api.get(`/people/${id}`)
}
