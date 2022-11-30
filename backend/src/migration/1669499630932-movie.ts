import { MigrationInterface, QueryRunner } from 'typeorm'

export class movie1669499630932 implements MigrationInterface {
  name = 'movie1669499630932'
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `movies` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `banner` varchar(255) NOT NULL, `description` text NOT NULL, `director` varchar(255) NOT NULL, `producer` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `movies`')
  }
}
