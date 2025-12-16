import dotenv from "dotenv";
import { connectDB } from "./config/db.ts";
import { faker } from "@faker-js/faker";
import { generateSlug } from "./utils/generateSlug.ts";
import User from "./models/User.ts";
import Blog from "./models/Blog.ts";

dotenv.config();

const testImages = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728452/bharata-darshana/b70c270c-a76e-497c-82d5-566d89ccf197_bvonwp.jpg",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728452/bharata-darshana/294-3492x1998_axodsq.jpg",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728452/bharata-darshana/8180a7fa-ab30-4bfd-9105-0b9664434640_bcaxsy.jpg",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728452/bharata-darshana/a398b79d-9da1-4d76-8aa3-3a78c5f32ffc_v1nlcn.jpg",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728451/bharata-darshana/7fae3bbb341e0e61b25bb1c58e2c98d6_tk03cc.jpg",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728451/bharata-darshana/f0c496c8-682d-419e-ad72-caa58b03b790_nvzbdf.jpg",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728451/bharata-darshana/d43259a2dcdd07db93abf276d583b1f7_agtdwn.jpg",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728451/bharata-darshana/fa06407c5072f07f08e4b9aa4883454b_zfjmhl.jpg",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728451/bharata-darshana/c6ccb18003bb7e58682eeea290e21a31_g0hd15.jpg",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728451/bharata-darshana/14499b9e-22ab-468b-97a6-ddaeffb6d1c0_ha07cv.jpg",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728451/bharata-darshana/8e016be2fac598a47498a52cfd4a121e_xsqdt8.jpg",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728450/bharata-darshana/b50cf6a4d5030125120340f55112fc4e_tmfrpi.jpg",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728450/bharata-darshana/cb7494efac005d800f7eb10f4409cfc4_ggvtwj.jpg",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728450/bharata-darshana/0dc214ce2711ee9491e04e0e44f04960_bzkhvm.jpg",
  },
  {
    id: 15,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728450/bharata-darshana/97556a36c9231f593cbdf11488f4b9a1_k4p8az.jpg",
  },
  {
    id: 16,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728449/bharata-darshana/e557d1ed-542f-4f5e-be32-573043daf8be_jiqbp7.jpg",
  },
  {
    id: 17,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728449/bharata-darshana/66e8393f-eeb2-403e-983a-6fffd741973a_kvxqik.jpg",
  },
  {
    id: 18,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728449/bharata-darshana/dcf74dc13f06ab96afce98c55fbfb27f_cszxtc.jpg",
  },
  {
    id: 19,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728449/bharata-darshana/3c874db93d5b877fc782be4652a5e418_o1f8gt.jpg",
  },
  {
    id: 20,
    src: "https://res.cloudinary.com/dcsv0xhjz/image/upload/v1764728449/bharata-darshana/a4eb9873-2438-44b1-8197-8fe9921f8d17_a3vzrp.jpg",
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    const existingUser = await User.findOne();

    const blogs = [];

    for (let i = 0; i < 20; i++) {
      const title = faker.company.catchPhrase();

      const content = `
        Today’s complex climate models aren’t equivalent to reality. In fact, computer models of Earth are very different to reality – particularly on regional, national and local scales. They don’t represent many aspects of the physical processes that we know are important for climate change, which means we can’t rely on them to provide detailed local predictions. This is a concern because human-induced climate change is all about our understanding of the future. This understanding empowers us. It enables us to make informed decisions by telling us about the consequences of our actions. It helps us consider what the future will be like if we act strongly to reduce greenhouse gas emissions, if we act only half-heartedly, or if we take no action at all. Such information enables us to assess the level of investment that we believe is worthwhile as individuals, communities and nations. It enables us to balance action on climate change against other demands on our finances such as health, education, security and culture.<br /><br />
        For many of us, these issues are approached through the lens of personal experience and personal cares: we want to know what changes to expect where we live, in the places we know, and in the regions where we have our roots. We want local climate predictions – predictions conditioned on the choices that our societies make.<br /><br />
        So, where do we get them? Well, nowadays most of these predictions originate from complicated computer models of the climate system – so-called Earth System Models (ESMs). These models are ubiquitous in climate change science. And for good reason. The increasing greenhouse gases in the atmosphere are driving the climate system into a never-before-seen state. That means the past cannot be a good guide to the future, and predictions based simply on historic observations can’t be reliable: the information isn’t in the observational data, so no amount of processing can extract it. Climate prediction is therefore about our understanding of the physical processes of climate, not about data-processing. And since there are so many physical processes involved – everything from the movement of heat and moisture around the atmosphere to the interaction of oceans with ice-sheets – this naturally leads to the use of computer models.
      `;

      const blog = {
        title,
        slug: generateSlug(title),
        excerpt: faker.lorem.sentence({ min: 10, max: 15 }),
        content,
        coverImage: testImages[i]?.src,
        author: existingUser || faker.database.mongodbObjectId(),
        tags: [faker.word.sample(), faker.word.sample(), faker.word.sample()],
        category: faker.helpers.arrayElement([
          "philosophy",
          "history",
          "science",
          "culture",
        ]),
        status: "published",
        createdAt: faker.date.past(),
      };

      blogs.push(blog);
    }

    await Blog.insertMany(blogs);
    console.log(`✅ Successfully seeded 20 blogs!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
