import { prisma } from "./index";
import links from "./seeds/links";
import profiles from "./seeds/profiles";
import users from "./seeds/users";

async function main() {
    try {
        const result = await prisma.$transaction(async (tnx) => {
            const usersCreated = await tnx.user.createMany({
                data: users
            });

            const profilesCreated = await tnx.profile.createMany({
                data: profiles
            });

            const linksCreated = await tnx.link.createMany({
                data: links
            });

            return {
                numberOfUsers: usersCreated.count,
                numberOfProfiles: profilesCreated.count,
                numberOfLinks: linksCreated.count
            };
        });

        console.log("😌 Seeding successfull!");
        console.info(`Total ${result.numberOfUsers} users are created.`);
        console.info(`Total ${result.numberOfProfiles} profiles are created.`);
        console.info(`Total ${result.numberOfLinks} links are created.`);
    } catch (err) {
        console.error("😭 Failed to seed database!");
        console.info(
            "Is database running ?\nIs your database updated ?\nDetails about the error bellow 👇"
        );
        console.error(err);
    }
}

main();
