import { faker } from "@faker-js/faker";

import { User } from "../generated/prisma";

function createFakeUser(): User {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        lastLogin: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        banned: faker.helpers.arrayElement([true, false])
    };
}

export default faker.helpers.multiple(createFakeUser, { count: 50 });
