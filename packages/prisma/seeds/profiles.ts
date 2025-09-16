import { faker } from "@faker-js/faker";
import type { Profile } from "../generated/prisma";
import users from "./users";

function createFakeProfile(userId: number): Profile {
    return {
        userId: userId,
        id: faker.number.int(),
        bio: faker.person.bio(),
    };
}

const profiles: Profile[] = [];
for (const user of users) {
    profiles.push(createFakeProfile(user.id));
}

export default profiles;
