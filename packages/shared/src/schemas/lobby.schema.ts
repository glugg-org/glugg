import z from 'zod';

export enum LobbyState {
  PENDING = 'pending',
  IN_GAME = 'in_game',
  SHOWING_RESULTS = 'showing_results',
  FINISHED = 'finished',
}

export enum LobbyLanguage {
  EN = 'en',
  ES = 'es',
  IS = 'is',
}

export const createLobbyRequestSchema = z.object({
  language: z.enum(LobbyLanguage),
});

export type CreateLobbyRequest = z.infer<typeof createLobbyRequestSchema>;

export const updateLobbyRequestSchema = z.object({
  language: z.enum(LobbyLanguage),
});

export type UpdateLobbyRequest = z.infer<typeof updateLobbyRequestSchema>;

export const lobbyResponseSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  state: z.enum(LobbyState),
  language: z.enum(LobbyLanguage),
});

export type LobbyResponse = z.infer<typeof lobbyResponseSchema>;
