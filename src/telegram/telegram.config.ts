import { ITelegramOptions } from "./telegram.interface";

export const getTelegramConfig = (): ITelegramOptions => {
  return {
    chatId: '',
    token: '',
  };
};