import { faker } from "@faker-js/faker";
import type { User } from "../generated/prisma";

function createFakeUser(): User {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
    };
}

export default faker.helpers.multiple(createFakeUser, { count: 50 });
