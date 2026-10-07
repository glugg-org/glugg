import {
  createLobbyRequestSchema,
  lobbyResponseSchema,
  updateLobbyRequestSchema,
} from '@glugg/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateLobbyRequestDto extends createZodDto(
  createLobbyRequestSchema,
) {}

export class UpdateLobbyRequestDto extends createZodDto(
  updateLobbyRequestSchema,
) {}

export class LobbyResponseDto extends createZodDto(lobbyResponseSchema) {}
