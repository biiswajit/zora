import { faker } from "@faker-js/faker";
import type { Post } from "../generated/prisma";
import users from "./users";

function createFakePost(userId: number): Post {
    return {
        id: faker.number.int(),
        title: faker.word.noun(),
        content: faker.lorem.paragraph(),
        published: faker.helpers.arrayElement([true, false]),
        authorId: userId,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
    };
}

const posts: Post[] = [];
for (const user of users) {
    posts.push(createFakePost(user.id));
}

export default posts;
