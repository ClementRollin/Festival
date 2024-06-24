import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/role.enum";
import { Exclude } from "class-transformer";

export enum UserRole { ADMIN="A", EMPLOYEE="E", CUSTOMER="C" }

@Entity()
export class User {
    getUserByUsername(username: any) {
        throw new Error('Method not implemented.');
    }

    @PrimaryGeneratedColumn()
    id!: number;

    //@Index({unique: true})
    @Column({length: 200})
    email!: string;

    @Exclude()
    @Column({length: 150})
    hash!: string;

    @Column({length: 200})
    name!: string;

    @Column({length: 200})
    prenom: string;


    @Column({type: "enum", enum: Role, default: Role.Spectator})
    role!: Role; 
}

// function ApiProperty(): (target: User, propertyKey: "id") => void {
//     throw new Error("Function not implemented.");
// }
