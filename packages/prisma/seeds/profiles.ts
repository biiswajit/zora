import { faker } from "@faker-js/faker";

import { Gender, Profile } from "../generated/prisma";
import users from "./users";

function createFakeProfile(userId: string): Profile {
    return {
        id: faker.string.uuid(),
        userId: userId,
        gender: faker.helpers.enumValue(Gender),
        industry: faker.person.jobType(),
        openForCollab: faker.helpers.arrayElement([true, false]),
        bio: faker.person.bio(),
        avatar: faker.internet.url(),
        website: faker.internet.url(),
        city: faker.location.city(),
        country: faker.location.country(),
        language: faker.location.language().name,
        pronounce: faker.helpers.arrayElement(["he/him", "she/her"]),
        timezone: faker.date.timeZone()
    };
}

let profiles: Profile[] = [];
for (const user of users) {
    profiles.push(createFakeProfile(user.id));
}

export default profiles;
