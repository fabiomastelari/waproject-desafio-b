/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  banner!: string

  @Column()
  description!: string

  @Column()
  director!: string

  @Column()
  producer!: string
}
