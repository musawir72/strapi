'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    updates: async (ctx) => {
       let {discount} = ctx.request.body;
      let percent = parseInt(discount)
       try {

        let act = await strapi.services.activitie.find();
        act.forEach(async element  => {
        let price = parseInt(element.Pric);
       let  dec =  Math.round(price-percent/100*price);
        await strapi.services.activitie.update(
            {Pric: price},
            { $set: { Pric: dec}}
        ) 
        });
       return "price updated";

       } catch (error) {
           console.log("Server error",error);
       }
      
      
  },



// overide a create action
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.activitie.create(data, { files });
    } else {
      entity = await strapi.services.activitie.create(ctx.request.body);
    }
   
    entry = sanitizeEntity(entity, { model: strapi.models.activitie });

    // check if the comment content contains a bad word
    if (entry) {

      // send an email by using the email plugin
      await strapi.plugins['email'].services.email.send({
        to: 'musawirhussaim72@gmail.com',
        from: 'admin@strapi.io',
        subject: 'Activitie is Created',
        text: `
          New activitie  #${entry.Title} has been created.
         
        `,
      });
    }

    return entry;



  },
};
