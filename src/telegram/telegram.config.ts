import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from './telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');
  const chatId = configService.get('CHAT_ID');

  if (!token) {
    throw new Error('Telegram token is not set');
  }
  return {
    token,
    chatId: chatId ?? '',
  };
};
