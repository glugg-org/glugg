import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { LobbyService } from './lobby.service';
import {
  CreateLobbyRequestDto,
  LobbyResponseDto,
  UpdateLobbyRequestDto,
} from './lobby.dtos';
import { IdParam } from 'src/lib/idParam';

@Controller('lobbies')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post()
  async create(
    @Body() createLobbyDto: CreateLobbyRequestDto,
  ): Promise<LobbyResponseDto> {
    return this.lobbyService.create(createLobbyDto);
  }

  @Get()
  async findAll(): Promise<LobbyResponseDto[]> {
    return this.lobbyService.findAll();
  }

  @Get('byCode/:code')
  async findByCode(@Param('code') code: string): Promise<LobbyResponseDto> {
    const lobby = await this.lobbyService.findByCode(code);

    if (lobby === null) throw new NotFoundException();

    return lobby;
  }

  @Get(':id')
  async findOne(@Param() { id }: IdParam): Promise<LobbyResponseDto> {
    const lobby = await this.lobbyService.findOne(id);

    if (lobby === null) throw new NotFoundException();

    return lobby;
  }

  @Put(':id')
  async update(
    @Param() { id }: IdParam,
    @Body() updateLobbyDto: UpdateLobbyRequestDto,
  ): Promise<LobbyResponseDto> {
    const lobby = await this.lobbyService.update(id, updateLobbyDto);

    if (lobby === null) throw new NotFoundException();

    return lobby;
  }

  @Delete(':id')
  async remove(@Param() { id }: IdParam): Promise<void> {
    const lobby = await this.lobbyService.remove(id);

    if (lobby === null) throw new NotFoundException();

    return;
  }
}
