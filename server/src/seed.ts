import dotenv from "dotenv";
import { connectDB } from "./config/db.ts";
import { faker } from "@faker-js/faker";
import { generateSlug } from "./utils/generateSlug.ts";
import User from "./models/User.ts";
import Blog from "./models/Blog.ts";

dotenv.config();

const seedDB = async () => {
  try {
    await connectDB();

    const existingUser = await User.findOne();

    const blogs = [];

    for (let i = 0; i < 50; i++) {
      const title = faker.company.catchPhrase();

      const content = `
        Today’s complex climate models aren’t equivalent to reality. In fact, computer models of Earth are very different to reality – particularly on regional, national and local scales. They don’t represent many aspects of the physical processes that we know are important for climate change, which means we can’t rely on them to provide detailed local predictions. This is a concern because human-induced climate change is all about our understanding of the future. This understanding empowers us. It enables us to make informed decisions by telling us about the consequences of our actions. It helps us consider what the future will be like if we act strongly to reduce greenhouse gas emissions, if we act only half-heartedly, or if we take no action at all. Such information enables us to assess the level of investment that we believe is worthwhile as individuals, communities and nations. It enables us to balance action on climate change against other demands on our finances such as health, education, security and culture.<br />\n
        For many of us, these issues are approached through the lens of personal experience and personal cares: we want to know what changes to expect where we live, in the places we know, and in the regions where we have our roots. We want local climate predictions – predictions conditioned on the choices that our societies make.<br />\n
        So, where do we get them? Well, nowadays most of these predictions originate from complicated computer models of the climate system – so-called Earth System Models (ESMs). These models are ubiquitous in climate change science. And for good reason. The increasing greenhouse gases in the atmosphere are driving the climate system into a never-before-seen state. That means the past cannot be a good guide to the future, and predictions based simply on historic observations can’t be reliable: the information isn’t in the observational data, so no amount of processing can extract it. Climate prediction is therefore about our understanding of the physical processes of climate, not about data-processing. And since there are so many physical processes involved – everything from the movement of heat and moisture around the atmosphere to the interaction of oceans with ice-sheets – this naturally leads to the use of computer models.
      `;

      const blog = {
        title,
        slug: generateSlug(title),
        excerpt: faker.lorem.sentence({ min: 10, max: 15 }),
        content,
        coverImage: faker.image.url(),
        author: existingUser || faker.database.mongodbObjectId(),
        tags: [faker.word.sample(), faker.word.sample(), faker.word.sample()],
        category: faker.helpers.arrayElement([
          "philosophy",
          "history",
          "science",
          "culture",
        ]),
        createdAt: faker.date.past(),
      };

      blogs.push(blog);
    }

    await Blog.insertMany(blogs);
    console.log(`✅ Successfully seeded 50 blogs!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
