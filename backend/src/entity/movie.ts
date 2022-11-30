/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number

  @Column({ type: 'varchar' })
  title!: string

  @Column({ type: 'varchar' })
  banner!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ type: 'varchar' })
  director!: string

  @Column({ type: 'varchar' })
  producer!: string
}
