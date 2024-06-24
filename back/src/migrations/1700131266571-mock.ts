import { User } from "../users/entities/user.entity";
import { Role } from "../users/enums/role.enum";
import { MigrationInterface, QueryRunner } from "typeorm"
import { faker } from '@faker-js/faker';

const PEOPLE = 3;

export class Mock1700131266571 implements MigrationInterface {

    public async up(run: QueryRunner): Promise<void> {
        await run.manager.save(run.manager.create<User>(User, {
            email: "j.doe@fake.com",
            hash: "$2a$12$2pYpQjlx74zV0O1HsESTteKaRpmTMpdif2BB6fw83t5IbSZPEoSUO",  //bonjourjohn@connect
            name: "DOE",
            prenom: "John",
            role: Role.Admin
        }))
        for (let i=1; i<=PEOPLE; i++)
        {
            await run.manager.save(run.manager.create<User>(User, {
                email: faker.internet.email(),
                hash: "$2a$12$v5oqjEUatVmug8EF/D8..OvVjJS6WkCC19AsJrCeJ1FG3jqMDuHdi", //USERbidon@
                name: faker.person.lastName(),
                prenom: faker.person.firstName(),
                role: Role.Spectator
            }))
        }
    }

    public async down(run: QueryRunner): Promise<void> {
        await run.query("DELETE FROM Users");
    }

}
