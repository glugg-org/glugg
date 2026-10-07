import { Column, Entity, Index } from 'typeorm';
import { LobbyState, LobbyLanguage } from '@glugg/shared';
import { EntityTemplate } from '../../lib/base.entity';

@Entity()
export class Lobby extends EntityTemplate {
  @Index()
  @Column()
  code: string;

  @Column({
    type: 'enum',
    enum: LobbyState,
  })
  state: LobbyState;

  @Column({
    type: 'enum',
    enum: LobbyLanguage,
  })
  language: LobbyLanguage;
}
