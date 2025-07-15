import { faker } from "@faker-js/faker";

import { Link } from "../generated/prisma";
import users from "./users";

function createFakeLink(userId: string): Link {
    return {
        id: faker.string.uuid(),
        userId: userId,
        url: faker.internet.url(),
        title: faker.book.title(),
        description: faker.lorem.paragraph({ min: 1, max: 4 }),
        domain: faker.internet.domainWord(),
        suspicious: faker.helpers.arrayElement([true, false]),
        clicks: faker.number.int({ min: 1, max: 100 }),
        stared: faker.helpers.arrayElement([true, false]),
        image: faker.internet.url(),
        lastClicked: faker.date.recent()
    };
}

let links: Link[] = [];
for (const user of users) {
    // one user can upload more than one links
    for (let i = 0; i <= Math.ceil(Math.random() * 10); i++) {
        links.push(createFakeLink(user.id));
    }
}

export default links;
