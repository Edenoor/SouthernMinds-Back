"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.pet.create(data, { files });
    } else {
      let { name, gender, breed, exact, birthday } = ctx.request.body;
      if (Array.isArray(birthday)) {
        birthday = birthday[Math.floor(Math.random() * birthday.length)];
      }
      entity = await strapi.services.pet.create({
        name,
        gender,
        breed,
        exact,
        birthday,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.pet });
  },
};
