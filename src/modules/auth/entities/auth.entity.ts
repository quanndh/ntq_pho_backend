import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'authTokens',
})
export class AuthTokenEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('bigint', { name: 'userId' })
  userId: number;

  @Column({ name: 'deviceId', nullable: true })
  deviceId?: string;

  @Column({ name: 'accessToken' })
  accessToken: string;

  @Column({ name: 'refreshToken' })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
