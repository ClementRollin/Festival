import { Site } from '../../sites/entities/site.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

enum TypeLieu {
  OUTDOOR = 'OUTDOOR',
  SALLE = 'SALLE',
  SANITAIRE = 'SANITAIRE',
}

@Entity('lieu')
export class Lieu {
  @PrimaryGeneratedColumn({type: 'int',name: "id_lieu"})
  id: number;

  @Column()
  nom: string;

  @Column()
  zone: string;

  @ManyToOne(() => Site, site => site.lieux)
  @JoinColumn({ name: 'id_site' })
  site: Site;

  @Index()
  @Column({name: "id_type"})
  type: TypeLieu;
}
