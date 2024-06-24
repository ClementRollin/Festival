import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('evenement')
export class Evenement {
  @PrimaryGeneratedColumn()
  id_evenement: number;

  @Column({ length: 100 })
  titre: string;

  @Column('text')
  description: string;

  @Column('date')
  debut: Date;

  @Column('date')
  fin: Date;
}