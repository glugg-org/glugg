import { Injectable } from '@nestjs/common';
import { CreateLobbyRequestDto, UpdateLobbyRequestDto } from './lobby.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Lobby } from './entities/lobby.entity';
import { Repository } from 'typeorm';
import { LobbyState } from '@glugg/shared';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(Lobby)
    private lobbyRepository: Repository<Lobby>,
  ) {}

  @Transactional()
  async create(createLobbyDto: CreateLobbyRequestDto): Promise<Lobby> {
    const lobby = this.lobbyRepository.create({
      code: 'patata',
      state: LobbyState.PENDING,
      language: createLobbyDto.language,
    });

    return this.lobbyRepository.save(lobby);
  }

  @Transactional()
  async findAll(): Promise<Lobby[]> {
    return this.lobbyRepository.find();
  }

  @Transactional()
  async findOne(id: string): Promise<Lobby | null> {
    return this.lobbyRepository.findOneBy({ id });
  }

  @Transactional()
  async findByCode(code: string): Promise<Lobby | null> {
    return this.lobbyRepository.findOneBy({ code });
  }

  @Transactional()
  async update(
    id: string,
    updateLobbyDto: UpdateLobbyRequestDto,
  ): Promise<Lobby | null> {
    const lobby = await this.lobbyRepository.findOneBy({ id });

    if (lobby === null) return null;

    lobby.language = updateLobbyDto.language;

    return this.lobbyRepository.save(lobby);
  }

  @Transactional()
  async remove(id: string): Promise<Lobby | null> {
    const lobby = await this.lobbyRepository.findOneBy({ id });

    if (lobby === null) return null;

    await this.lobbyRepository.remove(lobby);

    return lobby;
  }
}
