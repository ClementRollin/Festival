import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "../enums/role.enum";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    prenom: string;

    @IsNotEmpty()
    password: string;

    @IsDefined()
    role: Role;
}
