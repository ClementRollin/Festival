import { Lieu } from "../../lieu/entities/lieu.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Site {

    @PrimaryGeneratedColumn({name: "id_site"})
    id: number;

    @Column()
    nom: string;

    @Column()
    image: string;

    @Column()
    capacite: number;

    @OneToMany(() => Lieu, lieu => lieu.site)
    lieux: Lieu[];
}
